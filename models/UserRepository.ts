import { PrismaClient, User } from ".prisma/client";
import { TokenPayload } from "google-auth-library";

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
}
