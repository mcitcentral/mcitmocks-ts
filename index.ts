import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from ".prisma/client";
import express from "express";
import cookieParser from "cookie-parser";
import authController from "./controllers/authController";

const port = process.env.PORT || 8000;
const app = express();
app.use(express.json());
app.use(cookieParser());

const prismaClient = new PrismaClient();

app.use("/api/auth", authController(prismaClient));

app.listen(port, () => {
  console.log(`mcitmocks server started at localhost:${port}`);
});
