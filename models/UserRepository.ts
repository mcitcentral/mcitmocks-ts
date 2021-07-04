import { PrismaClient, User } from ".prisma/client";
import { CodingLanguage, QuestionDifficulty, QuestionType } from "@prisma/client";
import { TokenPayload } from "google-auth-library";
import { UserPreferences } from "../@types";

export default class UserRepository {
  prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  async getUserById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async getOrCreateUserFromToken(payload: TokenPayload): Promise<User> {
    const id = payload.sub!;
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (user) return user;
    else {
      const email = payload.email!;
      const name = payload.name!;
      const imageUrl = payload.picture;
      const newUser = await this.prisma.user.create({ data: { id, email, name, imageUrl } });
      return newUser;
    }
  }

  async updateUserById(id: string, preferences: Partial<UserPreferences>): Promise<User> {
    return await this.prisma.user.update({ where: { id }, data: preferences });
  }
}
