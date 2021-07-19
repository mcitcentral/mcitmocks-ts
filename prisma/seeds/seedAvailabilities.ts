import { PrismaClient } from "@prisma/client";

export default async function main(prisma: PrismaClient) {
  await prisma.availability.upsert({
    where: { id: "11" },
    create: {
      id: "11",
      user: { connect: { id: "2" } },
      startTime: new Date(2021, 6, 20, 10, 30, 30, 80),
      isTaken: false,
    },
    update: {
      user: { connect: { id: "2" } },
      startTime: new Date(2021, 6, 20, 10, 30, 30, 80),
      isTaken: false,
    },
  });
  await prisma.availability.upsert({
    where: { id: "12" },
    create: {
      id: "12",
      user: { connect: { id: "1" } },
      startTime: new Date(2021, 6, 20, 10, 30, 30, 80),
      isTaken: false,
    },
    update: {
      user: { connect: { id: "1" } },
      startTime: new Date(2021, 6, 20, 10, 30, 30, 80),
      isTaken: false,
    },
  });
  await prisma.availability.upsert({
    where: { id: "13" },
    create: {
      id: "13",
      user: { connect: { id: "3" } },
      startTime: new Date(2021, 6, 20, 10, 30, 30, 80),
      isTaken: false,
    },
    update: {
      user: { connect: { id: "3" } },
      startTime: new Date(2021, 6, 20, 10, 30, 30, 80),
      isTaken: false,
    },
  });
}
