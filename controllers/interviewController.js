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
const InterviewRepository_1 = __importDefault(require("../models/InterviewRepository"));
const AgoraService_1 = __importDefault(require("../services/AgoraService"));
const InterviewService_1 = __importDefault(require("../services/InterviewService"));
function interviewController(prismaClient) {
    const interviewRouter = express_1.default.Router();
    const interviewRepository = new InterviewRepository_1.default(prismaClient);
    const interviewService = new InterviewService_1.default(prismaClient);
    const agoraService = new AgoraService_1.default();
    interviewRouter.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const status = req.query.status || null;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        try {
            let interviews;
            if (!userId)
                return res.status(401).send({ error: "Not Authenticated." });
            if (status)
                interviews = yield interviewRepository.getInterviewsByUserIdAndStatus(userId, status);
            else
                interviews = yield interviewRepository.getInterviewsByUserId(userId);
            res.status(200).json(interviews);
        }
        catch (e) {
            res.status(500).send({ error: e.message });
        }
    }));
    interviewRouter.get("/:interviewId", (req, res) => __awaiter(this, void 0, void 0, function* () {
        var _b;
        const interviewId = req.params.interviewId || null;
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
        try {
            if (!userId)
                return res.status(401).send({ error: "Not Authenticated." });
            if (!interviewId)
                throw new Error("Error: invalid interviewId provided");
            const interview = yield interviewRepository.getInterviewById(interviewId);
            if (userId !== interview.inviteeId && userId !== interview.inviterId)
                return res.status(401).send({ error: "You don't have permission to access this interview" });
            const agoraId = agoraService.generateAgoraToken(interview);
            res.status(200).send({ interview, agoraId });
        }
        catch (e) {
            res.status(500).send({ error: e.message });
        }
    }));
    interviewRouter.post("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
        var _c;
        const { availabilityId } = req.body;
        const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
        try {
            if (!userId)
                return res.status(401).send({ error: "Not Authenticated." });
            yield interviewService.inviteInterview(userId, availabilityId);
            const interviews = yield interviewRepository.getInterviewsByUserId(userId);
            res.status(200).json(interviews);
        }
        catch (e) {
            res.status(500).send({ error: e.message });
        }
    }));
    interviewRouter.post("/:interviewId", (req, res) => __awaiter(this, void 0, void 0, function* () {
        var _d;
        const interviewId = req.params.interviewId;
        const { status } = req.body;
        const userId = (_d = req.user) === null || _d === void 0 ? void 0 : _d.id;
        try {
            if (!userId)
                return res.status(401).send({ error: "Not Authenticated." });
            yield interviewService.updateInterview(userId, interviewId, status);
            const interviews = yield interviewRepository.getInterviewsByUserId(userId);
            res.status(200).json(interviews);
        }
        catch (e) {
            res.status(500).send({ error: e.message });
        }
    }));
    return interviewRouter;
}
exports.default = interviewController;
