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
const google_auth_library_1 = require("google-auth-library");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserRepository_1 = __importDefault(require("../models/UserRepository"));
class AuthService {
    constructor(prismaClient) {
        this.googleClientId = process.env.GOOGLE_CLIENT_ID;
        this.jwtTokenKey = process.env.JWT_TOKEN_KEY;
        this.googleAuthClient = new google_auth_library_1.OAuth2Client();
        this.userRepository = new UserRepository_1.default(prismaClient);
    }
    verifyToken(idToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!idToken)
                throw new Error("No token found.");
            const ticket = yield this.googleAuthClient.verifyIdToken({ idToken, audience: this.googleClientId });
            const payload = ticket.getPayload();
            if (!payload)
                throw new Error("Invalid token.");
            return this.userRepository.getOrCreateUserFromToken(payload);
        });
    }
    verifyJWT(jwtToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const contents = jsonwebtoken_1.default.decode(jwtToken);
            console.log(contents);
            if (contents.exp && contents.exp * 1000 < Date.now())
                throw new Error("JWT token expired");
            if (contents.id)
                return this.userRepository.getUserById(contents.id);
            return null;
        });
    }
    generateJWT(user) {
        return jsonwebtoken_1.default.sign({ email: user.email, id: user.id }, this.jwtTokenKey, { expiresIn: "7d" });
    }
}
exports.default = AuthService;
