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
      /*if (startTime == null || endTime == null) {
        const newStartTime = subDays(new Date(), 7);
        const availability = await availabilityRepository.getAvailability(
          req.user.id,
          formatISO(newStartTime),
          formatISO(newEndTime)
        );
      }*/
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
  return availibilityRouter;
}
