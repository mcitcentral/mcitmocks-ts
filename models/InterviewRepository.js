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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class InterviewRepository {
    constructor(prismaClient) {
        this.prisma = prismaClient;
    }
    getInterviewById(interviewId) {
        return __awaiter(this, void 0, void 0, function* () {
            const interview = yield this.prisma.interview.findUnique({
                where: { id: interviewId },
                include: { questions: true },
            });
            if (!interview)
                throw new Error("Error: interviewId not found");
            return interview;
        });
    }
    getInterviewsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Modify to include user details as well
            const [interviewsAsInviter, interviewsAsInvitee] = yield Promise.all([
                this.prisma.interview.findMany({ where: { inviterId: userId }, include: { invitee: true, inviter: true } }),
                this.prisma.interview.findMany({ where: { inviteeId: userId }, include: { invitee: true, inviter: true } }),
            ]);
            return { interviewsAsInviter: interviewsAsInviter || [], interviewsAsInvitee: interviewsAsInvitee || [] };
        });
    }
    getInterviewsByUserIdAndStatus(userId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Modify to include user details as well
            const [interviewsAsInviter, interviewsAsInvitee] = yield Promise.all([
                this.prisma.interview.findMany({ where: { inviterId: userId, status } }),
                this.prisma.interview.findMany({ where: { inviteeId: userId, status } }),
            ]);
            return { interviewsAsInviter, interviewsAsInvitee };
        });
    }
    createInterview(interview, interviewQuestions) {
        return __awaiter(this, void 0, void 0, function* () {
            const interviewQuestionIds = interviewQuestions.map(({ id }) => ({ id }));
            return this.prisma.interview.create({
                data: {
                    startTime: interview.startTime,
                    status: client_1.InterviewStatus.INVITED,
                    inviter: { connect: { id: interview.inviterId } },
                    invitee: { connect: { id: interview.inviteeId } },
                    questions: { connect: interviewQuestionIds },
                },
            });
        });
    }
    updateInterview(userId, interviewId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const interview = yield this.getInterviewById(interviewId);
            if (interview.inviteeId !== userId && interview.inviterId !== userId)
                throw new Error("Error: You cannot update the interview status.");
            // Only allow updating to CONFIRMED or CANCELLED
            if (status === client_1.InterviewStatus.CONFIRMED) {
                if (interview.inviteeId !== userId)
                    throw new Error("Error: You cannot update the interview status.");
                yield this.prisma.interview.update({ where: { id: interviewId }, data: { status } });
            }
            else if (status === client_1.InterviewStatus.CANCELLED) {
                yield this.prisma.interview.update({ where: { id: interviewId }, data: { status } });
            }
            else {
                throw new Error("Error: You cannot update the interview status.");
            }
        });
    }
}
exports.default = InterviewRepository;
