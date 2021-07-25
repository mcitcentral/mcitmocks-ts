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
const client_1 = require(".prisma/client");
const client_2 = require("@prisma/client");
const gray_matter_1 = __importDefault(require("gray-matter"));
class InterviewQuestionRepoistory {
    constructor(prismaClient) {
        this.prisma = prismaClient;
    }
    createOrUpdateFromMarkdown(id, questionMd, answerMd) {
        return __awaiter(this, void 0, void 0, function* () {
            const questionParsed = gray_matter_1.default(questionMd);
            const answerParsed = gray_matter_1.default(answerMd);
            // TODO: Get maps from DB
            const difficultyMap = {
                Easy: client_2.QuestionDifficulty.EASY,
                Medium: client_2.QuestionDifficulty.MEDIUM,
                Hard: client_2.QuestionDifficulty.HARD,
            };
            const typeMap = {
                Array: client_1.QuestionType.ARRAY,
                LinkedList: client_1.QuestionType.LINKED_LIST,
            };
            const questionName = questionParsed.data.name;
            const questionDifficulty = difficultyMap[questionParsed.data.difficulty];
            const questionText = questionParsed.content;
            const questionType = questionParsed.data.types.map((type) => typeMap[type]);
            const answerText = answerParsed.content;
            yield this.prisma.interviewQuestion.upsert({
                where: { id },
                update: { questionName, questionText, questionDifficulty, questionType, answerText },
                create: { id, questionName, questionText, questionDifficulty, questionType, answerText },
            });
        });
    }
    getRandomInterviewQuestions() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.$queryRaw(`SELECT * FROM interview_question ORDER BY RANDOM() LIMIT 2`);
        });
    }
}
exports.default = InterviewQuestionRepoistory;
