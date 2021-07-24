import { PrismaClient } from ".prisma/client";
import express, { Request, Response } from "express";

import AvailabilityRepository from "../models/AvailabilityRepository";
import { SearchAvailabilitiesRequest } from "../@types";

export default function availabilityController(prismaClient: PrismaClient) {
  const availibilityRouter = express.Router();
  const availabilityRepository = new AvailabilityRepository(prismaClient);

  availibilityRouter.get("/", async (req: Request, res: Response) => {
    try {
      if (!req.user) return res.status(401).send({ error: "Not Authenticated." });
      const availabilities = await availabilityRepository.getAvailability(req.user.id);
      res.status(200).json({ availabilities });
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  });

  availibilityRouter.post("/search", async (req: Request<{}, {}, SearchAvailabilitiesRequest>, res: Response) => {
    try {
      const startTime = req.body.startTime;
      if (!req.user) return res.status(401).send({ error: "Not Authenticated." });

      if (Array.isArray(startTime)) {
        if (startTime.some((s) => Number.isNaN(Date.parse(s))))
          return res.status(400).send({ error: "startTime in the wrong format." });
      } else {
        if (Number.isNaN(Date.parse(startTime)))
          return res.status(400).send({ error: "startTime in the wrong format." });
      }

      const availabilities = await availabilityRepository.searchAvailability(req.user.id, startTime);
      res.status(200).json({ availabilities });
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  });

  availibilityRouter.put("/", async (req: Request, res: Response) => {
    // TODO: Handle invalid keys
    try {
      if (!req.user) return res.status(401).send({ error: "Not Authenticated." });
      const availabilityMap = req.body.availabilities;
      const availabilities = await availabilityRepository.updateAvailabilities(req.user.id, availabilityMap);
      res.status(200).json({ availabilities });
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  });

  return availibilityRouter;
}
