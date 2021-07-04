import { PrismaClient, QuestionDifficulty, QuestionType, CodingLanguage } from ".prisma/client";
import express, { Request, Response } from "express";
import { UpdateUserPreferencesRequest, UserPreferences } from "../@types";
import UserRepository from "../models/UserRepository";

export default function userController(prismaClient: PrismaClient) {
    const userRouter = express.Router();
    const userRepository = new UserRepository(prismaClient);

    userRouter.post("/", async (req: Request<{}, {}, UpdateUserPreferencesRequest>, res: Response) => {
        const userId = req.user?.id;
        const timeZone = (req.query.timezone as string) || null;
        const questionTypes = (req.query.questionTypes as QuestionType[]) || null;
        const questionDifficulty = (req.query.questionDifficulty as QuestionDifficulty) || null;
        const codingLanguage = (req.query.codingLanguage as CodingLanguage[]) || null;

        let prefs: Partial<UserPreferences> = {};
        if (timeZone) prefs.timeZone = timeZone;
        if (questionTypes) prefs.questionTypes = questionTypes;
        if (questionDifficulty) prefs.questionDifficulty = questionDifficulty;
        if (codingLanguage) prefs.codingLanguage = codingLanguage;

        try {
            if (!timeZone && !questionTypes && !questionDifficulty && !codingLanguage)
                return res.status(400).send({ error: "Empty Request." });

            if (!userId) return res.status(401).send({ error: "Not Authenticated." });
            await userRepository.updateUserById(userId, prefs);
            res.send(200).json(prefs);
        } catch (e) {
            res.status(500).send({ error: e.message });
        }
    });

    return userRouter;
}
