import { InterviewStatus, PrismaClient } from "@prisma/client";

export default async function main(prisma: PrismaClient) {
  await prisma.interview.upsert({
    where: { id: "abc" },
    create: {
      id: "abc",
      invitee: { connect: { id: "1" } },
      inviter: { connect: { id: "2" } },
      startTime: new Date(2020, 1, 1),
      status: InterviewStatus.CONFIRMED,
      questions: { connect: [{ id: "0001" }, { id: "0002" }] },
    },
    update: {
      invitee: { connect: { id: "1" } },
      inviter: { connect: { id: "2" } },
      startTime: new Date(2020, 1, 1),
      status: InterviewStatus.CONFIRMED,
      questions: { connect: [{ id: "0001" }, { id: "0002" }] },
    },
  });
}
