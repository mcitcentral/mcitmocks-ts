import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from ".prisma/client";
import express, { Request, Response } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import jwt from "express-jwt";
import { Socket } from "socket.io";

import authController from "./controllers/authController";
import interviewController from "./controllers/interviewController";
import availabilityController from "./controllers/availabilityController";
import userController from "./controllers/userController";

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
app.use("/api/availability", availabilityController(prismaClient));
app.use("/api/users", userController(prismaClient));

app.use(express.static(path.resolve(__dirname, "dist")));
app.get("/*", (_req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

const server = require("http").createServer(app);
const io = require("socket.io")(server);

io.on("connection", (socket: Socket) => {
  console.log("A client has connected to websockets");
  socket.join(socket.handshake.query.roomId);
  socket.on("update", ({ roomId, message }) => io.to(roomId).emit("update", message));
  socket.on("disconnect", () => console.log("A client has disconnected from websockets"));
});

server.listen(port, () => {
  console.log(`mcitmocks server started at localhost:${port}`);
});

export default server;
