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
class UserRepository {
    constructor(prismaClient) {
        this.prisma = prismaClient;
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.user.findUnique({ where: { id } });
        });
    }
    getOrCreateUserFromToken(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = payload.sub;
            const user = yield this.prisma.user.findUnique({ where: { id } });
            if (user)
                return user;
            else {
                const email = payload.email;
                const name = payload.name;
                const imageUrl = payload.picture;
                const newUser = yield this.prisma.user.create({ data: { id, email, name, imageUrl } });
                return newUser;
            }
        });
    }
    updateUserById(id, preferences) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.user.update({ where: { id }, data: preferences });
            if (!user)
                throw new Error("User not found");
            return user;
        });
    }
}
exports.default = UserRepository;
