"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class AvailabilityRepository {
    constructor(prismaClient) {
        this.prisma = prismaClient;
    }
    getAvailabilityById(availabilityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const availability = yield this.prisma.availability.findUnique({ where: { id: availabilityId } });
            if (!availability)
                throw new Error("Availability with this id not found");
            return availability;
        });
    }
    getAvailabilityByUserAndTime(userId, startTime) {
        return __awaiter(this, void 0, void 0, function* () {
            const availability = yield this.prisma.availability.findUnique({
                where: { userId_startTime: { userId, startTime } },
            });
            if (!availability)
                throw new Error("Availability with this id not found");
            return availability;
        });
    }
    getAvailability(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const availability = yield this.prisma.availability.findMany({ where: { userId, isTaken: false } });
            return availability || [];
        });
    }
    searchAvailability(userId, startTime) {
        return __awaiter(this, void 0, void 0, function* () {
            const startTimes = Array.isArray(startTime)
                ? startTime.map((timeString) => new Date(timeString))
                : [new Date(startTime)];
            const availability = yield this.prisma.availability.findMany({
                where: {
                    NOT: { userId },
                    startTime: { in: startTimes },
                    isTaken: false,
                },
                include: { user: true },
            });
            return availability;
        });
    }
    updateAvailability(availabilityId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const availability = yield this.prisma.availability.update({ where: { id: availabilityId }, data });
            if (!availability)
                throw new Error("Availability with this id not found");
            return availability;
        });
    }
    updateAvailabilities(userId, availabilityMap) {
        return __awaiter(this, void 0, void 0, function* () {
            const updates = [];
            for (const [startTime, isAvailable] of Object.entries(availabilityMap)) {
                if (isAvailable) {
                    updates.push(this.prisma.availability.upsert({
                        where: { userId_startTime: { userId, startTime } },
                        update: { isTaken: false },
                        create: { isTaken: false, startTime, userId },
                    }));
                }
                else {
                    updates.push(this.prisma.availability.delete({ where: { userId_startTime: { userId, startTime } } }));
                }
            }
            yield this.prisma.$transaction(updates);
            return yield this.prisma.availability.findMany({ where: { userId, isTaken: false } });
        });
    }
}
exports.default = AvailabilityRepository;
