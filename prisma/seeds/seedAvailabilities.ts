import { PrismaClient } from "@prisma/client";
import AvailabilityRepository from "../../models/AvailabilityRepository";


export default async function main(prisma: PrismaClient) {
  const availability1 = await prisma.availability.upsert({
    where: { id: "11" },
    create: {
      id: "11",
      user: { connect: { id: "2" } },
      startTime: new Date(2021, 6, 20, 10, 30, 30, 80),
      isTaken: false
    },
    update: {
      user: { connect: { id: "2" } },
      startTime: new Date(2021, 6, 20, 10, 30, 30, 80),
      isTaken: false,
    },
  });
  console.log(availability1);
}
