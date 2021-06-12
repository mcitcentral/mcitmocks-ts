import { PrismaClient } from "@prisma/client";
import AuthService from "../../services/AuthService";

export default async function main() {
  const prismaClient = new PrismaClient();
  const authService = new AuthService(prismaClient);

  await prismaClient.user.deleteMany({});

  const [userAlice, userBob, userSam] = await Promise.all([
    prismaClient.user.create({ data: { id: "1", email: "alice@gmail.com", timeZone: "America/Chicago" } }),
    prismaClient.user.create({ data: { id: "2", email: "bob@gmail.com", timeZone: "America/New_York" } }),
    prismaClient.user.create({ data: { id: "3", email: "sam@gmail.com", timeZone: "America/Los_Angeles" } }),
  ]);

  const jwtAlice = authService.generateJWT(userAlice);
  const jwtBob = authService.generateJWT(userBob);
  const jwtSam = authService.generateJWT(userSam);

  console.log({ jwtAlice, jwtBob, jwtSam });

  await prismaClient.$disconnect();
}

main();
