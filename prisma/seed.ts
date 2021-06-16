import seedUsers from "./seeds/seedUsers";
import seedInterviewQuestions from "./seeds/seedInterviewQuestions";
import seedAvailabilities from "./seeds/seedAvailabilities";

export default async function main() {
  await seedUsers();
  await seedInterviewQuestions();
  await seedAvailabilities();
}
