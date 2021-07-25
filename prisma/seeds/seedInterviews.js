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
const client_1 = require("@prisma/client");
function main(prisma) {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.interview.upsert({
            where: { id: "abc" },
            create: {
                id: "abc",
                invitee: { connect: { id: "1" } },
                inviter: { connect: { id: "2" } },
                startTime: new Date(2020, 1, 1),
                status: client_1.InterviewStatus.CONFIRMED,
                questions: { connect: [{ id: "0001" }, { id: "0002" }] },
            },
            update: {
                invitee: { connect: { id: "1" } },
                inviter: { connect: { id: "2" } },
                startTime: new Date(2020, 1, 1),
                status: client_1.InterviewStatus.CONFIRMED,
                questions: { connect: [{ id: "0001" }, { id: "0002" }] },
            },
        });
        yield prisma.interview.upsert({
            where: { id: "abc" },
            create: {
                id: "abc",
                invitee: { connect: { id: "1" } },
                inviter: { connect: { id: "2" } },
                startTime: new Date(2020, 1, 1),
                status: client_1.InterviewStatus.INVITED,
                questions: { connect: [{ id: "0001" }, { id: "0002" }] },
            },
            update: {
                invitee: { connect: { id: "1" } },
                inviter: { connect: { id: "2" } },
                startTime: new Date(2020, 1, 1),
                status: client_1.InterviewStatus.INVITED,
                questions: { connect: [{ id: "0001" }, { id: "0002" }] },
            },
        });
    });
}
exports.default = main;
