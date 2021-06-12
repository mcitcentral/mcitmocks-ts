import { PrismaClient } from "@prisma/client";
import { readdirSync, readFileSync } from "fs";
import path from "path";
import InterviewQuestionRepository from "../../models/InterviewQuestionRepository";

const prisma = new PrismaClient();

export default async function main() {
  const questionRepo = new InterviewQuestionRepository(prisma);

  const files = readdirSync("./data/questions");
  for (const file of files) {
    const id = file.match(/^(.*).md$/)![1];
    const questionFile = readFileSync(path.resolve(`./data/questions/${file}`), "utf-8");
    const answerFile = readFileSync(path.resolve(`./data/solutions/${file}`), "utf-8");
    await questionRepo.createOrUpdateFromMarkdown(id, questionFile, answerFile);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
