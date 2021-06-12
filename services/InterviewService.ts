import { InterviewStatus, PrismaClient } from "@prisma/client";
import { parseISO } from "date-fns";

import InterviewRepository from "../models/InterviewRepository";

export default class InterviewService {
  interviewRepository: InterviewRepository;

  constructor(prismaClient: PrismaClient) {
    this.interviewRepository = new InterviewRepository(prismaClient);
  }

  async inviteInterview(inviterId: string, inviteeId: string, startTime: string): Promise<void> {
    // TODO: Update to use availabilityId so we don't reveal userId to other users
    // TODO: Need to update availability for inviter
    const startTimeDate = parseISO(startTime);
    await this.interviewRepository.createInterview({ inviteeId, inviterId, startTime: startTimeDate });
  }

  async updateInterview(userId: string, interviewId: string, status: InterviewStatus): Promise<void> {
    // TODO: Need to update availability for invitee
    await this.interviewRepository.updateInterview(userId, interviewId, status);
  }
}
