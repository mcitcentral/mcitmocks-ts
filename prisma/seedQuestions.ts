import { PrismaClient } from "@prisma/client";
import seedInterviewQuestions from "./seeds/seedInterviewQuestions";

export default async function main() {
  const prisma = new PrismaClient();
  await seedInterviewQuestions(prisma);
  await prisma.$disconnect();
}

main();
