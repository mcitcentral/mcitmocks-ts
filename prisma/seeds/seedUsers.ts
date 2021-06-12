import { PrismaClient } from "@prisma/client";
import AuthService from "../../services/AuthService";

const prisma = new PrismaClient();

export default async function main() {
  const authService = new AuthService(prisma);

  await prisma.user.deleteMany({});

  const [userAlice, userBob, userSam] = await Promise.all([
    prisma.user.create({ data: { id: "1", email: "alice@gmail.com", timeZone: "America/Chicago" } }),
    prisma.user.create({ data: { id: "2", email: "bob@gmail.com", timeZone: "America/New_York" } }),
    prisma.user.create({ data: { id: "3", email: "sam@gmail.com", timeZone: "America/Los_Angeles" } }),
  ]);

  const jwtAlice = authService.generateJWT(userAlice);
  const jwtBob = authService.generateJWT(userBob);
  const jwtSam = authService.generateJWT(userSam);

  console.log({ jwtAlice, jwtBob, jwtSam });

  await prisma.$disconnect();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
