"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserRepository_1 = __importDefault(require("../models/UserRepository"));
const AuthService_1 = __importDefault(require("../services/AuthService"));
function authController(prismaClient) {
    const authRouter = express_1.default.Router();
    const authService = new AuthService_1.default(prismaClient);
    const userRepository = new UserRepository_1.default(prismaClient);
    authRouter.post("/token", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.body.token;
            const user = yield authService.verifyToken(token);
            const jwt = authService.generateJWT(user);
            res.cookie("mcitmocks", jwt, { httpOnly: true });
            res.send({ user });
        }
        catch (e) {
            res.status(500).send({ error: e.message });
        }
    }));
    authRouter.get("/user", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.user)
                return res.status(401).send({ error: "Not Authenticated." });
            const user = yield userRepository.getUserById(req.user.id);
            res.json({ user });
        }
        catch (e) {
            res.status(500).send({ error: e.message });
        }
    }));
    authRouter.get("/logout", (_req, res) => __awaiter(this, void 0, void 0, function* () {
        res.cookie("mcitmocks", "", { expires: new Date(0), httpOnly: true });
        res.send();
    }));
    return authRouter;
}
exports.default = authController;
