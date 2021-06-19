import { PrismaClient } from "@prisma/client";
import seedUsers from "./seeds/seedUsers";
import seedInterviewQuestions from "./seeds/seedInterviewQuestions";
import seedAvailabilities from "./seeds/seedAvailabilities";
import seedInterviews from "./seeds/seedInterviews";

export default async function main() {
  const prisma = new PrismaClient();

  // Delete in reverse order
  const deleteUsers = prisma.user.deleteMany({});
  const deleteInterviewQuestions = prisma.interviewQuestion.deleteMany({});
  const deleteAvailabilities = prisma.availability.deleteMany({});
  const deleteInterviews = prisma.interview.deleteMany({});
  await prisma.$transaction([deleteInterviews, deleteAvailabilities, deleteInterviewQuestions, deleteUsers]);

  // Seed in order based on dependencies
  await seedUsers(prisma);
  await seedInterviewQuestions(prisma);
  await seedAvailabilities(prisma);
  await seedInterviews(prisma);

  await prisma.$disconnect();
}
