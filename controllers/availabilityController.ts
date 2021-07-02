import { PrismaClient } from ".prisma/client";
import express, { Request, Response, Router } from "express";
import AvailabilityRepository from "../models/AvailabilityRepository";
import { formatDistance, subDays, formatISO } from "date-fns";
export default function availabilityController(prismaClient: PrismaClient) {
  const availibilityRouter = express.Router();
  const availabilityRepository = new AvailabilityRepository(prismaClient);

  availibilityRouter.get('/', async(req, res)=> {
    try {
      let startTime = req.query.startTime;
      let endTime = req.query.endTime;
      if (!req.user) return res.status(401).send({ error: "Not Authenticated." });
      if (startTime == null || endTime == null) {
        let newStartTime = subDays(new Date(), 7);
        let newEndTime = new Date();
        const availability = await availabilityRepository.getAvailability(
          req.user.id,
          formatISO(newStartTime),
          formatISO(newStartTime)
        );
      }
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
