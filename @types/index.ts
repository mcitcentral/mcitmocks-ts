import { Interview, InterviewStatus, User } from "@prisma/client";

export interface JWTToken {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

export interface PostTokenRequest {
  token: string;
}

export interface JwtRequest {
  jwt: string;
}

export interface Interviews {
  interviewsAsInviter: Interview[];
  interviewsAsInvitee: Interview[];
}

export interface GetInterviewReseponse {
  interviewsAsInviter: Interview[];
  interviewsAsInvitee: Interview[];
}

export interface CreateInterviewRequest {
  // TODO: Update to use availabilityId only to not reveal userId to others
  inviteeId: string;
  startTime: string;
}

export interface UpdateInterviewRequest {
  status: InterviewStatus;
}

export type UserPreferences = Omit<User, "id" | "name" | "email" | "imageUrl">;

export type UpdateUserPreferencesRequest = UserPreferences;

declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      iat: number;
      exp: number;
    }
  }
}
