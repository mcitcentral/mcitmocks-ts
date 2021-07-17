import { PrismaClient } from ".prisma/client";
import express, { Request, Response } from "express";
import { subDays } from "date-fns";

import AvailabilityRepository from "../models/AvailabilityRepository";

export default function availabilityController(prismaClient: PrismaClient) {
  const availibilityRouter = express.Router();
  const availabilityRepository = new AvailabilityRepository(prismaClient);

  availibilityRouter.get("/", async (req: Request, res: Response) => {
    try {
      const startTime = req.query.startTime || subDays(new Date(), 7);
      const endTime = req.query.endTime || new Date();
      if (!req.user) return res.status(401).send({ error: "Not Authenticated." });
      if (Number.isNaN(Date.parse(String(startTime))) || Number.isNaN(Date.parse(String(endTime))))
        return res.status(400).send({ error: "startTime or endTime in the wrong format." });
      const availabilities = await availabilityRepository.getAvailability(
        req.user.id,
        String(startTime),
        String(endTime)
      );
      res.status(200).json({ availabilities });
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  });

  availibilityRouter.get("/search", async (req: Request, res: Response) => {
    try {
      const startTime = String(req.query.startTime);
      if (!req.user) return res.status(401).send({ error: "Not Authenticated." });
      if (Number.isNaN(Date.parse(startTime))) return res.status(400).send({ error: "startTime in the wrong format." });
      const availabilities = await availabilityRepository.searchAvailability(req.user.id, startTime);
      res.status(200).json({ availabilities });
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  });

  return availibilityRouter;
}
