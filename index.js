"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client_1 = require(".prisma/client");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_jwt_1 = __importDefault(require("express-jwt"));
const authController_1 = __importDefault(require("./controllers/authController"));
const interviewController_1 = __importDefault(require("./controllers/interviewController"));
const availabilityController_1 = __importDefault(require("./controllers/availabilityController"));
const userController_1 = __importDefault(require("./controllers/userController"));
const port = process.env.PORT || 8000;
const app = express_1.default();
app.use(express_1.default.json());
app.use(cookie_parser_1.default());
const prismaClient = new client_1.PrismaClient();
app.use(express_jwt_1.default({
    secret: process.env.JWT_TOKEN_KEY,
    algorithms: ["HS256"],
    credentialsRequired: false,
    getToken: (req) => req.cookies.mcitmocks,
}).unless({ path: ["/api/auth/token"] }));
app.use("/api/auth", authController_1.default(prismaClient));
app.use("/api/interviews", interviewController_1.default(prismaClient));
app.use("/api/availability", availabilityController_1.default(prismaClient));
app.use("/api/users", userController_1.default(prismaClient));
app.use(express_1.default.static(path_1.default.resolve(__dirname, "dist")));
app.get("/*", (_req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, "dist", "index.html"));
});
const server = require("http").createServer(app);
const io = require("socket.io")(server);
io.on("connection", (socket) => {
    console.log("A client has connected to websockets");
    socket.join(socket.handshake.query.roomId);
    socket.on("update", ({ roomId, message }) => io.to(roomId).emit("update", message));
    socket.on("disconnect", () => console.log("A client has disconnected from websockets"));
});
server.listen(port, () => {
    console.log(`mcitmocks server started at localhost:${port}`);
});
exports.default = server;
