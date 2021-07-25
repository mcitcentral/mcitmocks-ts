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
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const InterviewQuestionRepository_1 = __importDefault(require("../../models/InterviewQuestionRepository"));
function main(prisma) {
    return __awaiter(this, void 0, void 0, function* () {
        const questionRepo = new InterviewQuestionRepository_1.default(prisma);
        const files = fs_1.readdirSync("./data/questions");
        for (const file of files) {
            const id = file.match(/^(.*).md$/)[1];
            const questionFile = fs_1.readFileSync(path_1.default.resolve(`./data/questions/${file}`), "utf-8");
            const answerFile = fs_1.readFileSync(path_1.default.resolve(`./data/solutions/${file}`), "utf-8");
            yield questionRepo.createOrUpdateFromMarkdown(id, questionFile, answerFile);
        }
    });
}
exports.default = main;
