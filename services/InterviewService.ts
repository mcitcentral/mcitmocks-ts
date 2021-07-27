import { InterviewStatus, PrismaClient } from "@prisma/client";
import AvailabilityRepository from "../models/AvailabilityRepository";
import InterviewQuestionRepoistory from "../models/InterviewQuestionRepository";

import InterviewRepository from "../models/InterviewRepository";

export default class InterviewService {
  interviewRepository: InterviewRepository;
  availabilityRepository: AvailabilityRepository;
  interviewQuestionRepository: InterviewQuestionRepoistory;

  constructor(prismaClient: PrismaClient) {
    this.availabilityRepository = new AvailabilityRepository(prismaClient);
    this.interviewRepository = new InterviewRepository(prismaClient);
    this.interviewQuestionRepository = new InterviewQuestionRepoistory(prismaClient);
  }

  async inviteInterview(inviterId: string, availabilityId: string): Promise<void> {
    const availability = await this.availabilityRepository.updateAvailability(availabilityId, { isTaken: true });
    const { userId, startTime } = availability;
    const interviewQuestions = await this.interviewQuestionRepository.getRandomInterviewQuestions();
    await this.interviewRepository.createInterview(
      {
        inviteeId: userId,
        inviterId,
        startTime,
      },
      interviewQuestions
    );
  }

  async updateInterview(userId: string, interviewId: string, status: InterviewStatus): Promise<void> {
    const interview = await this.interviewRepository.getInterviewById(interviewId);
    if (status === "CONFIRMED") {
      // If confirmed, the invitee's availability is no longer available
      const availability = await this.availabilityRepository.getAvailabilityByUserAndTime(userId, interview.startTime);
      await this.availabilityRepository.updateAvailability(availability.id, { isTaken: true });
    } else if (status === "CANCELLED") {
      // If cancelled, the inviter's availability is now available
      const inviterAvailability = await this.availabilityRepository.getAvailabilityByUserAndTime(
        interview.inviterId,
        interview.startTime
      );
      await this.availabilityRepository.updateAvailability(inviterAvailability.id, { isTaken: false });
      // If cancelled, the invitee's availability is also now available
      // Catch statement because it might not exist?
      try {
        const inviteeAvailability = await this.availabilityRepository.getAvailabilityByUserAndTime(
          interview.inviteeId,
          interview.startTime
        );
        await this.availabilityRepository.updateAvailability(inviteeAvailability.id, { isTaken: false });
      } catch (e) {} // Do nothing
    }
    await this.interviewRepository.updateInterview(userId, interviewId, status);
  }
}
