import { PrismaClient, QuestionType } from ".prisma/client";
import { QuestionDifficulty } from "@prisma/client";
import matter from "gray-matter";

export default class InterviewQuestionRepoistory {
  prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  async createOrUpdateFromMarkdown(id: string, questionMd: string, answerMd: string) {
    const questionParsed = matter(questionMd);
    const answerParsed = matter(answerMd);

    // TODO: Get maps from DB
    const difficultyMap: { [key: string]: QuestionDifficulty } = {
      Easy: QuestionDifficulty.EASY,
      Medium: QuestionDifficulty.MEDIUM,
      Hard: QuestionDifficulty.HARD,
    };

    const typeMap: { [key: string]: QuestionType } = {
      Array: QuestionType.ARRAY,
      LinkedList: QuestionType.LINKED_LIST,
    };

    const questionName = questionParsed.data.name as string;
    const questionDifficulty = difficultyMap[questionParsed.data.difficulty];
    const questionText = questionParsed.content as string;
    const questionType = questionParsed.data.types.map((type: string) => typeMap[type]);
    const answerText = answerParsed.content;

    await this.prisma.interviewQuestion.upsert({
      where: { id },
      update: { questionName, questionText, questionDifficulty, questionType, answerText },
      create: { id, questionName, questionText, questionDifficulty, questionType, answerText },
    });
  }
}
