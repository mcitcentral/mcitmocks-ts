import { PrismaClient } from ".prisma/client";

export default class AvailabilityRepository {
  prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }
  async getAvailability(userId: string, startTime: string, endTime: string) {
    const availability = await this.prisma.availability.findMany({
      where: {
        userId: userId,
        startTime: {
          gte: new Date(startTime),
          lt: new Date(endTime),
        },

        isTaken: true,
      },
    });
    return availability;
  }
}
