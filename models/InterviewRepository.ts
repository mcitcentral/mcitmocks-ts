import { Interview, InterviewStatus, PrismaClient } from "@prisma/client";
import { Interviews } from "../@types";

export default class InterviewRepository {
  prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  async getInterviewById(interviewId: string): Promise<Interview> {
    const interview = await this.prisma.interview.findUnique({ where: { id: interviewId } });
    if (!interview) throw new Error("Error: interviewId not found");
    return interview;
  }

  async getInterviewsByUserId(userId: string): Promise<Interviews> {
    // TODO: Modify to include user details as well
    const [interviewsAsInviter, interviewsAsInvitee] = await Promise.all([
      this.prisma.interview.findMany({ where: { inviterId: userId } }),
      this.prisma.interview.findMany({ where: { inviteeId: userId } }),
    ]);
    return { interviewsAsInviter, interviewsAsInvitee };
  }

  async getInterviewsByUserIdAndStatus(userId: string, status: InterviewStatus) {
    // TODO: Modify to include user details as well
    const [interviewsAsInviter, interviewsAsInvitee] = await Promise.all([
      this.prisma.interview.findMany({ where: { inviterId: userId, status } }),
      this.prisma.interview.findMany({ where: { inviteeId: userId, status } }),
    ]);
    return { interviewsAsInviter, interviewsAsInvitee };
  }

  async createInterview(interview: Pick<Interview, "inviteeId" | "inviterId" | "startTime">): Promise<Interview> {
    return this.prisma.interview.create({ data: { ...interview, status: InterviewStatus.INVITED } });
  }

  async updateInterview(userId: string, interviewId: string, status: InterviewStatus): Promise<void> {
    const interview = await this.getInterviewById(interviewId);
    if (interview.inviteeId !== userId && interview.inviterId !== userId)
      throw new Error("Error: You cannot update the interview status.");
    // Only allow updating to CONFIRMED or CANCELLED
    if (status === InterviewStatus.CONFIRMED) {
      if (interview.inviteeId !== userId) throw new Error("Error: You cannot update the interview status.");
      await this.prisma.interview.update({ where: { id: interviewId }, data: { status } });
    } else if (status === InterviewStatus.CANCELLED) {
      await this.prisma.interview.update({ where: { id: interviewId }, data: { status } });
    } else {
      throw new Error("Error: You cannot update the interview status.");
    }
  }
}
