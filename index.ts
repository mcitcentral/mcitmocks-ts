import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from ".prisma/client";
import express, { Request, Response } from "express";
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

app.use("/", express.static("dist"));
app.use("/api/auth", authController(prismaClient));
app.use("/api/interviews", interviewController(prismaClient));
app.use("/api/availability", availabilityController(prismaClient));
app.use("/api/users", userController(prismaClient));

app.use((err: Error, _req: Request, res: Response) => {
  if (err.name === "UnauthorizedError") res.status(401).send("Unauthorized token");
});

const server = require("http").createServer(app);
const io = require("socket.io")(server);

io.on("connection", (socket: Socket) => {
  console.log("A client has connected to websockets");
  socket.join(socket.handshake.query.roomId);
  socket.on("update", ({ roomId, message }) => {
    socket.to(roomId).emit("update", message);
  });
  socket.on("requestVideo", ({ roomId }) => {
    console.log("requestVideo");
    socket.to(roomId).emit("requestVideo");
  });
  socket.on("offerVideo", ({ roomId, message }) => {
    console.log("offerVideo");
    socket.to(roomId).emit("offerVideo", message);
  });
  socket.on("answerVideo", ({ roomId, message }) => {
    console.log("answerVideo");
    socket.to(roomId).emit("answerVideo", message);
  });
  socket.on("icecandidate", ({ roomId, message }) => {
    socket.to(roomId).emit("icecandidate", message);
  });
  socket.on("disconnect", function () {
    console.log("A client has disconnected from websockets");
  });
});

server.listen(port, () => {
  console.log(`mcitmocks server started at localhost:${port}`);
});

export default server;
