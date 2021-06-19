import { PrismaClient } from "@prisma/client";
import AuthService from "../../services/AuthService";

export default async function main(prisma: PrismaClient) {
  const authService = new AuthService(prisma);

  const userAlice = await prisma.user.upsert({
    where: { id: "1" },
    create: { id: "1", name: "Alice", email: "alice@gmail.com", timeZone: "America/Chicago" },
    update: { name: "Alice", email: "alice@gmail.com", timeZone: "America/Chicago" },
  });
  const userBob = await prisma.user.upsert({
    where: { id: "2" },
    create: { id: "2", name: "Bob", email: "bob@gmail.com", timeZone: "America/New_York" },
    update: { name: "Bob", email: "bob@gmail.com", timeZone: "America/New_York" },
  });
  const userSam = await prisma.user.upsert({
    where: { id: "3" },
    create: { id: "3", name: "Sam", email: "sam@gmail.com", timeZone: "America/Los_Angeles" },
    update: { name: "Sam", email: "sam@gmail.com", timeZone: "America/Los_Angeles" },
  });

  const jwtAlice = authService.generateJWT(userAlice);
  const jwtBob = authService.generateJWT(userBob);
  const jwtSam = authService.generateJWT(userSam);

  console.log({ jwtAlice, jwtBob, jwtSam });
}
