import { PrismaClient } from "@prisma/client";
import AuthService from "../../services/AuthService";

const prisma = new PrismaClient();

export default async function main() {
  const authService = new AuthService(prisma);

  await prisma.user.deleteMany({});

  const [userAlice, userBob, userSam] = await Promise.all([
    prisma.user.upsert({
      where: { id: "1" },
      create: { id: "1", name: "Alice", email: "alice@gmail.com", timeZone: "America/Chicago" },
      update: { name: "Alice", email: "alice@gmail.com", timeZone: "America/Chicago" },
    }),
    prisma.user.upsert({
      where: { id: "2" },
      create: { id: "2", name: "Bob", email: "bob@gmail.com", timeZone: "America/New_York" },
      update: { name: "Bob", email: "bob@gmail.com", timeZone: "America/New_York" },
    }),
    prisma.user.upsert({
      where: { id: "3" },
      create: { id: "3", name: "Sam", email: "sam@gmail.com", timeZone: "America/Los_Angeles" },
      update: { name: "Sam", email: "sam@gmail.com", timeZone: "America/Los_Angeles" },
    }),
  ]);

  const jwtAlice = authService.generateJWT(userAlice);
  const jwtBob = authService.generateJWT(userBob);
  const jwtSam = authService.generateJWT(userSam);

  console.log({ jwtAlice, jwtBob, jwtSam });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
