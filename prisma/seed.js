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
const client_1 = require("@prisma/client");
const seedUsers_1 = __importDefault(require("./seeds/seedUsers"));
const seedInterviewQuestions_1 = __importDefault(require("./seeds/seedInterviewQuestions"));
const seedAvailabilities_1 = __importDefault(require("./seeds/seedAvailabilities"));
const seedInterviews_1 = __importDefault(require("./seeds/seedInterviews"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        // Delete in reverse order
        const deleteUsers = prisma.user.deleteMany({});
        const deleteInterviewQuestions = prisma.interviewQuestion.deleteMany({});
        const deleteAvailabilities = prisma.availability.deleteMany({});
        const deleteInterviews = prisma.interview.deleteMany({});
        yield prisma.$transaction([deleteInterviews, deleteAvailabilities, deleteInterviewQuestions, deleteUsers]);
        // Seed in order based on dependencies
        yield seedUsers_1.default(prisma);
        yield seedInterviewQuestions_1.default(prisma);
        yield seedAvailabilities_1.default(prisma);
        yield seedInterviews_1.default(prisma);
        yield prisma.$disconnect();
    });
}
exports.default = main;
