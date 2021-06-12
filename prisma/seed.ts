import seedUsers from "./seeds/seedUsers";
import seedInterviewQuestions from "./seeds/seedInterviewQuestions";

export default async function main() {
  await seedUsers();
  await seedInterviewQuestions();
}
