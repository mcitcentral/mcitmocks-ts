import { PrismaClient } from ".prisma/client";
import express, { Request, Response } from "express";
import jwt from "express-jwt";

import { PostTokenRequest } from "../@types";
import UserRepository from "../models/UserRepository";
import AuthService from "../services/AuthService";

export default function authController(prismaClient: PrismaClient) {
  const authRouter = express.Router();
  const authService = new AuthService(prismaClient);
  const userRepository = new UserRepository(prismaClient);

  authRouter.use(
    jwt({
      secret: process.env.JWT_TOKEN_KEY!,
      algorithms: ["HS256"],
      getToken: (req) => req.cookies.mcitmocks,
    }).unless({
      path: ["/token"],
    }),
    (req, res, next) => {
      if (!req.user) return res.sendStatus(401);
      next();
    }
  );

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
      if (!req.user) throw new Error("Not authenticated.");
      const user = await userRepository.getUserById(req.user.id);
      res.json({ user });
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  });

  return authRouter;
}
