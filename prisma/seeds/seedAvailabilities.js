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
function main(prisma) {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.availability.upsert({
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
        yield prisma.availability.upsert({
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
        yield prisma.availability.upsert({
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
    });
}
exports.default = main;
