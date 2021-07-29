import { PrismaClient, User } from ".prisma/client";
import express, { Request, Response } from "express";
import { UpdateUserPreferencesRequest } from "../@types";
import UserRepository from "../models/UserRepository";

export default function userController(prismaClient: PrismaClient) {
  const userRouter = express.Router();
  const userRepository = new UserRepository(prismaClient);

  userRouter.post("/", async (req: Request<{}, {}, UpdateUserPreferencesRequest>, res: Response<any, User>) => {
    const userId = req.user?.id;
    try {
      if (!userId) return res.status(401).send({ error: "Not Authenticated." });
      const user = await userRepository.updateUserById(userId, req.body);
      res.status(200).send({ user });
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  });

  return userRouter;
}
