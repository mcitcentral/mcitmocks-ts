import { PrismaClient } from ".prisma/client";
import express, { Request, Response } from "express";
import AvailabilityRepository from "../models/AvailabilityRepository";
import { subDays } from "date-fns";
export default function availabilityController(prismaClient: PrismaClient) {
  const availibilityRouter = express.Router();
  const availabilityRepository = new AvailabilityRepository(prismaClient);
  availibilityRouter.get("/", async (req: Request, res: Response) => {
    try {
      let startTime = req.query.startTime || subDays(new Date(), 7);
      let endTime = req.query.endTime || new Date();
      if (!req.user) return res.status(401).send({ error: "Not Authenticated." });
      const newEndTime = new Date();
      if (Number.isNaN(Date.parse(String(startTime))) || Number.isNaN(Date.parse(String(endTime))))
        return res.status(400).send({ error: "startTime or endTime in the wrong format." });
      const availability = await availabilityRepository.getAvailability(
        req.user.id,
        String(startTime),
        String(endTime)
      );
      res.status(200).json(availability);
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  });
  availibilityRouter.get("/search", async (req: Request, res: Response) => {
    try {
      let startTime = req.query.startTime;
      if (!req.user) return res.status(401).send({ error: "Not Authenticated." });
      if (Number.isNaN(Date.parse(String(startTime))))
        return res.status(400).send({ error: "startTime or endTime in the wrong format." });
      const availability = await availabilityRepository.searchAvailability(
        req.user.id,
        String(startTime)
      );
      res.status(200).json(availability);
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  });
  return availibilityRouter;
}
