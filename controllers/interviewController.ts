import { PrismaClient } from ".prisma/client";
import { InterviewStatus } from "@prisma/client";
import express, { Request, Response } from "express";
import { CreateInterviewRequest, UpdateInterviewRequest } from "../@types";
import InterviewRepository from "../models/InterviewRepository";
import InterviewService from "../services/InterviewService";

export default function interviewController(prismaClient: PrismaClient) {
  const interviewRouter = express.Router();
  const interviewRepository = new InterviewRepository(prismaClient);
  const interviewService = new InterviewService(prismaClient);

  interviewRouter.get("/", async (req: Request, res: Response) => {
    const status = (req.query.status as InterviewStatus) || null;
    const userId = req.user?.id;
    try {
      let interviews;
      if (!userId) return res.status(401).send({ error: "Not Authenticated." });
      if (status) interviews = await interviewRepository.getInterviewsByUserIdAndStatus(userId, status);
      else interviews = await interviewRepository.getInterviewsByUserId(userId);
      res.status(200).json(interviews);
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  });

  interviewRouter.get("/:interviewId", async (req: Request, res: Response) => {
    const interviewId = req.params.interviewId || null;
    const userId = req.user?.id;
    try {
      if (!userId) return res.status(401).send({ error: "Not Authenticated." });
      if (!interviewId) throw new Error("Error: invalid interviewId provided");
      const interview = await interviewRepository.getInterviewById(interviewId);
      console.log({ interview, userId });
      if (userId !== interview.inviteeId && userId !== interview.inviterId)
        return res.status(401).send({ error: "You don't have permission to access this interview" });
      res.status(200).send({ interview });
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  });

  interviewRouter.post("/", async (req: Request<{}, {}, CreateInterviewRequest>, res: Response) => {
    const { availabilityId } = req.body;
    const userId = req.user?.id;
    try {
      if (!userId) return res.status(401).send({ error: "Not Authenticated." });
      await interviewService.inviteInterview(userId, availabilityId);
      const interviews = await interviewRepository.getInterviewsByUserId(userId);
      res.status(200).json(interviews);
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  });

  interviewRouter.post(
    "/:interviewId",
    async (req: Request<{ interviewId: string }, {}, UpdateInterviewRequest>, res: Response) => {
      const interviewId = req.params.interviewId;
      const { status } = req.body;
      const userId = req.user?.id;
      try {
        if (!userId) return res.status(401).send({ error: "Not Authenticated." });
        await interviewService.updateInterview(userId, interviewId, status);
        const interviews = await interviewRepository.getInterviewsByUserId(userId);
        res.status(200).json(interviews);
      } catch (e) {
        res.status(500).send({ error: e.message });
      }
    }
  );

  return interviewRouter;
}
