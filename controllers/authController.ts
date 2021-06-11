import { PrismaClient } from ".prisma/client";
import express, { Request, Response } from "express";

import { PostTokenRequest } from "../@types";
import UserRepository from "../models/UserRepository";
import AuthService from "../services/AuthService";

export default function authController(prismaClient: PrismaClient) {
  const authRouter = express.Router();
  const authService = new AuthService(prismaClient);
  const userRepository = new UserRepository(prismaClient);

  authRouter.post("/token", async (req: Request<{}, {}, PostTokenRequest>, res: Response) => {
    try {
      const token = req.body.token;
      const user = await authService.verifyToken(token);
      const jwt = authService.generateJWT(user);
      res.cookie("mcitmocks", jwt, { httpOnly: true });
      res.send({ user });
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  });

  authRouter.get("/user", async (req: Request, res: Response) => {
    try {
      if (!req.user) return res.status(401).send({ error: "Not Authenticated." });
      const user = await userRepository.getUserById(req.user.id);
      res.json({ user });
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  });

  return authRouter;
}
