import { PrismaClient } from "@prisma/client";
import seedUsers from "./seeds/seedUsers";
import seedInterviewQuestions from "./seeds/seedInterviewQuestions";
import seedAvailabilities from "./seeds/seedAvailabilities";

export default async function main() {
  const prisma = new PrismaClient();

  // Delete in reverse order
  const deleteUsers = prisma.user.deleteMany({});
  const deleteInterviewQuestions = prisma.interviewQuestion.deleteMany({});
  const deleteAvailabilities = prisma.availability.deleteMany({});
  await prisma.$transaction([deleteAvailabilities, deleteInterviewQuestions, deleteUsers]);

  // Seed in order based on dependencies
  await seedUsers(prisma);
  await seedInterviewQuestions(prisma);
  await seedAvailabilities(prisma);

  await prisma.$disconnect();
}
