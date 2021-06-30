import { PrismaClient } from ".prisma/client";
import express, { Request, Response, Router } from "express";
import AvailabilityRepository from "../models/AvailabilityRepository";
import { formatDistance, subDays, formatISO } from "date-fns";
export default function availabilityController(prismaClient: PrismaClient) {
  const availibilityRouter = express.Router();
  const availabilityRepository = new AvailabilityRepository(prismaClient);

  availibilityRouter.get("/:startTime/:endTime", async (req: Request, res: Response) => {
    try {
      if (!req.user) return res.status(401).send({ error: "Not Authenticated." });
      if (req.params.startTime == null || req.params.endTime == null) {
        let startTime = subDays(new Date(), 7);
        let endTime = new Date();
        const availability = await availabilityRepository.getAvailability(
          req.user.id,
          formatISO(startTime),
          formatISO(endTime)
        );
      }
      if (Number.isNaN(Date.parse(req.params.startTime)) || Number.isNaN(Date.parse(req.params.endTime)))
        return res.status(400).send({ error: "startTime or endTime in the wrong format." });
      const availability = await availabilityRepository.getAvailability(
        req.user.id,
        req.params.startTime,
        req.params.endTime
      );
      res.status(200).json(availability);
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  });
  return availibilityRouter;
}
