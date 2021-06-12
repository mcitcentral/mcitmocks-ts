import seedUsers from "./seedUsers";
import seedInterviewQuestions from "./seedInterviewQuestions";

async function main() {
  await seedUsers();
  await seedInterviewQuestions();
}

main();
