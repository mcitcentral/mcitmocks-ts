import { Availability, Interview, InterviewStatus, User } from "@prisma/client";

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

export type InterviewWithUserInfo = Interview & { invitee: User; inviter: User };

export interface Interviews {
  interviewsAsInviter: InterviewWithUserInfo[];
  interviewsAsInvitee: InterviewWithUserInfo[];
}

export interface GetInterviewResponse {
  interviewsAsInviter: InterviewWithUserInfo[];
  interviewsAsInvitee: InterviewWithUserInfo[];
}

export interface CreateInterviewRequest {
  // TODO: Update to use availabilityId only to not reveal userId to others
  inviteeId: string;
  startTime: string;
}

export interface UpdateInterviewRequest {
  status: InterviewStatus;
}

export interface GetAvailabilitiesResponse {
  availabilities: Availability[];
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
