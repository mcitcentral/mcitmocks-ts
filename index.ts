import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from ".prisma/client";
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import jwt from "express-jwt";

import authController from "./controllers/authController";
import interviewController from "./controllers/interviewController";

const port = process.env.PORT || 8000;
const app = express();
app.use(express.json());
app.use(cookieParser());

const prismaClient = new PrismaClient();

app.use(
  jwt({
    secret: process.env.JWT_TOKEN_KEY!,
    algorithms: ["HS256"],
    credentialsRequired: false,
    getToken: (req) => req.cookies.mcitmocks,
  }).unless({ path: ["/api/auth/token"] })
);

app.use("/api/auth", authController(prismaClient));
app.use("/api/interviews", interviewController(prismaClient));

app.use((err: Error, _req: Request, res: Response) => {
  if (err.name === "UnauthorizedError") res.status(401).send("Unauthorized token");
});

app.listen(port, () => {
  console.log(`mcitmocks server started at localhost:${port}`);
});

export default app;
