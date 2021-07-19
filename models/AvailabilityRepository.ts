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
        isTaken: false,
      },
    });
    return availability || [];
  }

  async searchAvailability(userId: string, startTime: string | string[]) {
    const startTimes = Array.isArray(startTime)
      ? startTime.map((timeString) => new Date(timeString))
      : [new Date(startTime)];
    const availability = await this.prisma.availability.findMany({
      where: {
        NOT: { userId },
        startTime: { in: startTimes },
        isTaken: false,
      },
      include: { user: true },
    });
    return availability;
  }

  async updateAvailabilities(userId: string, availabilityMap: { [key: string]: boolean }) {
    const updates: any[] = [];
    for (const [startTime, isAvailable] of Object.entries(availabilityMap)) {
      if (isAvailable) {
        updates.push(
          this.prisma.availability.upsert({
            where: { userId_startTime: { userId, startTime } },
            update: { isTaken: false },
            create: { isTaken: false, startTime, userId },
          })
        );
      } else {
        updates.push(this.prisma.availability.delete({ where: { userId_startTime: { userId, startTime } } }));
      }
    }
    await this.prisma.$transaction(updates);
    return await this.prisma.availability.findMany({ where: { userId, isTaken: false } });
  }
}
