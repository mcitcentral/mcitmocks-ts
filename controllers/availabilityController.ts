import { PrismaClient } from ".prisma/client";
import express, { Request, Response, Router } from "express";
import AvailabilityRepository from "../models/AvailabilityRepository";
import { formatDistance, subDays } from "date-fns";
import formatISO from "date-fns/formatISO";
export default function AvailabilityController(prismaClient: PrismaClient) {
  const availibilityRouter = express.Router();
  const availabilityRepository = new AvailabilityRepository(prismaClient);

  availibilityRouter.get("/availibility/:startTime/:endTime", async (req: Request, res: Response) => {
    try {
      if (!req.user) return res.status(401).send({ error: "Not Authenticated." });
      if (req.params.startTime == null && req.params.endTime == null) {
        let startTime = subDays(new Date(), 7);
        let endTime = new Date();
        const availability = await availabilityRepository.getAvailability(
          req.user.id,
          formatISO(startTime),
          formatISO(endTime)
        );
      }
      if (Date.parse(req.params.startTime) == NaN || Date.parse(req.params.endTime) == NaN)
        return res.status(401).send({ error: "startTime or endTime in the wrong format." });
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
}
