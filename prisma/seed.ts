import { PrismaClient } from "@prisma/client";
import seedUsers from "./seeds/seedUsers";
import seedInterviewQuestions from "./seeds/seedInterviewQuestions";
import seedAvailabilities from "./seeds/seedAvailabilities";
import seedInterviews from "./seeds/seedInterviews";

export default async function main() {
  try {
    const prisma = new PrismaClient();

    // Delete in reverse order
    const deleteUsers = prisma.user.deleteMany({});
    const deleteInterviewQuestions = prisma.interviewQuestion.deleteMany({});
    const deleteAvailabilities = prisma.availability.deleteMany({});
    const deleteInterviews = prisma.interview.deleteMany({});
    await prisma.$transaction([deleteInterviews, deleteAvailabilities, deleteInterviewQuestions, deleteUsers]);
    console.log("Deleting everything");

    // Seed in order based on dependencies
    await seedUsers(prisma);
    console.log("Seed Users");
    await seedInterviewQuestions(prisma);
    console.log("Seed Interview Questions");
    await seedAvailabilities(prisma);
    console.log("Seed Availabilities");
    await seedInterviews(prisma);
    console.log("Seed Interviews");

    await prisma.$disconnect();
  } catch (e) {
    console.log(e);
  }
}
