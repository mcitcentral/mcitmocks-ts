import { PrismaClient, User } from ".prisma/client";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

import { JWTToken } from "../@types";
import UserRepository from "../models/UserRepository";

export default class AuthService {
  googleAuthClient: OAuth2Client;
  googleClientId: string;
  jwtTokenKey: string;
  userRepository: UserRepository;

  constructor(prismaClient: PrismaClient) {
    this.googleClientId = process.env.GOOGLE_CLIENT_ID!;
    this.jwtTokenKey = process.env.JWT_TOKEN_KEY!;
    this.googleAuthClient = new OAuth2Client();
    this.userRepository = new UserRepository(prismaClient);
  }

  async verifyToken(idToken: string): Promise<User> {
    const ticket = await this.googleAuthClient.verifyIdToken({ idToken, audience: this.googleClientId });
    const payload = ticket.getPayload();
    if (!payload) throw new Error("Invalid token.");
    return this.userRepository.getOrCreateUserFromToken(payload);
  }

  async verifyJWT(jwtToken: string): Promise<User | null> {
    const contents = jwt.decode(jwtToken) as JWTToken;
    console.log(contents);
    if (contents.exp && contents.exp * 1000 < Date.now()) throw new Error("JWT token expired");
    if (contents.id) return this.userRepository.getUserById(contents.id);
    return null;
  }

  generateJWT(user: User) {
    return jwt.sign({ email: user.email, id: user.id }, this.jwtTokenKey, { expiresIn: "7d" });
  }
}
