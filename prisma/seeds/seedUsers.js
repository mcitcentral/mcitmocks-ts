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
const AuthService_1 = __importDefault(require("../../services/AuthService"));
function main(prisma) {
    return __awaiter(this, void 0, void 0, function* () {
        const authService = new AuthService_1.default(prisma);
        const userAlice = yield prisma.user.upsert({
            where: { id: "1" },
            create: { id: "1", name: "Alice", email: "alice@gmail.com", timeZone: "America/Chicago" },
            update: { name: "Alice", email: "alice@gmail.com", timeZone: "America/Chicago" },
        });
        const userBob = yield prisma.user.upsert({
            where: { id: "2" },
            create: { id: "2", name: "Bob", email: "bob@gmail.com", timeZone: "America/New_York" },
            update: { name: "Bob", email: "bob@gmail.com", timeZone: "America/New_York" },
        });
        const userSam = yield prisma.user.upsert({
            where: { id: "3" },
            create: { id: "3", name: "Sam", email: "sam@gmail.com", timeZone: "America/Los_Angeles" },
            update: { name: "Sam", email: "sam@gmail.com", timeZone: "America/Los_Angeles" },
        });
        const jwtAlice = authService.generateJWT(userAlice);
        const jwtBob = authService.generateJWT(userBob);
        const jwtSam = authService.generateJWT(userSam);
        console.log({ jwtAlice, jwtBob, jwtSam });
    });
}
exports.default = main;
