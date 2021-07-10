import request from "supertest";
import { PrismaClient } from "@prisma/client";

import AuthService from "../../services/AuthService";

describe("GET /api/auth/user", () => {
  const prismaClient = new PrismaClient();
  const authService = new AuthService(prismaClient);

  it("should respond with 401 not authorized if cookie not provided", async () => {
    const res = await request("localhost:8000").get("/api/auth/user");
    expect(res.statusCode).toEqual(401);
    expect(res.body).toEqual({ error: "Not Authenticated." });
  });

  it("should return user if a valid cookie is provided", async () => {
    const user = await prismaClient.user.findUnique({ where: { id: "1" } });
    const token = authService.generateJWT(user!);
    const res = await request("localhost:8000").get("/api/auth/user").set("cookie", `mcitmocks=${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      user: {
        id: "1",
        name: "Alice",
        email: "alice@gmail.com",
        timeZone: "America/Chicago",
        codingLanguage: [],
        imageUrl: null,
        questionDifficulty: "EASY",
        questionTypes: [],
      },
    });
  });
});
