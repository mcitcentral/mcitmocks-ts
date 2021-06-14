/*
  Warnings:

  - Added the required column `name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question_difficulty` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `time_zone` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "coding_language" AS ENUM ('PYTHON', 'JAVA', 'JAVASCRIPT');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "coding_languages" "coding_language"[],
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "question_difficulty" "question_difficulty" NOT NULL,
ADD COLUMN     "question_types" "question_type"[],
ALTER COLUMN "time_zone" SET NOT NULL,
ALTER COLUMN "time_zone" SET DEFAULT E'America/New_York',
ALTER COLUMN "question_difficulty" SET DEFAULT E'EASY';

