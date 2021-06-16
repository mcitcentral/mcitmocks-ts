/*
  Warnings:

  - You are about to drop the column `is_confirmed` on the `interviews` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "interview_status" AS ENUM ('NOT_INITIALIZED', 'INVITED', 'CONFIRMED', 'COMPLETED', 'CANCELLED');

-- AlterTable
ALTER TABLE "interviews" DROP COLUMN "is_confirmed",
ADD COLUMN     "status" "interview_status" NOT NULL DEFAULT E'NOT_INITIALIZED';

-- CreateTable
CREATE TABLE "_InterviewToInterviewQuestion" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_InterviewToInterviewQuestion_AB_unique" ON "_InterviewToInterviewQuestion"("A", "B");

-- CreateIndex
CREATE INDEX "_InterviewToInterviewQuestion_B_index" ON "_InterviewToInterviewQuestion"("B");

-- AddForeignKey
ALTER TABLE "_InterviewToInterviewQuestion" ADD FOREIGN KEY ("A") REFERENCES "interviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InterviewToInterviewQuestion" ADD FOREIGN KEY ("B") REFERENCES "interview_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
