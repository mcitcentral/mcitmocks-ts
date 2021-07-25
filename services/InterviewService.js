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
const AvailabilityRepository_1 = __importDefault(require("../models/AvailabilityRepository"));
const InterviewQuestionRepository_1 = __importDefault(require("../models/InterviewQuestionRepository"));
const InterviewRepository_1 = __importDefault(require("../models/InterviewRepository"));
class InterviewService {
    constructor(prismaClient) {
        this.availabilityRepository = new AvailabilityRepository_1.default(prismaClient);
        this.interviewRepository = new InterviewRepository_1.default(prismaClient);
        this.interviewQuestionRepository = new InterviewQuestionRepository_1.default(prismaClient);
    }
    inviteInterview(inviterId, availabilityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const availability = yield this.availabilityRepository.updateAvailability(availabilityId, { isTaken: true });
            const { userId, startTime } = availability;
            const interviewQuestions = yield this.interviewQuestionRepository.getRandomInterviewQuestions();
            yield this.interviewRepository.createInterview({
                inviteeId: userId,
                inviterId,
                startTime,
            }, interviewQuestions);
        });
    }
    updateInterview(userId, interviewId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const interview = yield this.interviewRepository.getInterviewById(interviewId);
            if (status === "CONFIRMED") {
                // If confirmed, the invitee's availability is no longer available
                const availability = yield this.availabilityRepository.getAvailabilityByUserAndTime(userId, interview.startTime);
                yield this.availabilityRepository.updateAvailability(availability.id, { isTaken: true });
            }
            else if (status === "CANCELLED") {
                // If cancelled, the inviter's availability is now available
                const inviterAvailability = yield this.availabilityRepository.getAvailabilityByUserAndTime(interview.inviterId, interview.startTime);
                yield this.availabilityRepository.updateAvailability(inviterAvailability.id, { isTaken: false });
                // If cancelled, the invitee's availability is also now available
                // Catch statement because it might not exist?
                try {
                    const inviteeAvailability = yield this.availabilityRepository.getAvailabilityByUserAndTime(interview.inviteeId, interview.startTime);
                    yield this.availabilityRepository.updateAvailability(inviteeAvailability.id, { isTaken: false });
                }
                catch (e) { } // Do nothing
            }
            yield this.interviewRepository.updateInterview(userId, interviewId, status);
        });
    }
}
exports.default = InterviewService;
