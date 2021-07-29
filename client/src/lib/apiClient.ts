import { Availability, InterviewStatus } from "@prisma/client";
import axios from "axios";
import {
  AvailabilityWithUser,
  GetAvailabilitiesResponse,
  GetInterviewResponse,
  UserPreferences,
} from "../../../@types";
import { convertAvailabilitiesResponse, convertInterviewResponse } from "./utils";

axios.defaults.baseURL = "/api";

const apiClient = {
  // AUTH
  authenticateToken: async (token: string) => {
    const response = await axios.post("/auth/token", { token });
    return response.data;
  },
  getUser: async () => {
    const response = await axios.get("/auth/user");
    return response.data;
  },
  logoutUser: async () => {
    await axios.get("/auth/logout");
  },
  updateUser: async (preferences: Partial<UserPreferences>) => {
    const response = await axios.post("/users", preferences);
    return response.data;
  },

  // INTERVIEW
  getInterview: async (interviewId: string) => {
    const response = await axios.get(`/interviews/${interviewId}`);
    return response.data;
  },
  getInterviews: async () => {
    const response = await axios.get<GetInterviewResponse>(`/interviews`);
    return convertInterviewResponse(response);
  },
  rejectInterview: async (interviewId: string) => {
    try {
      const response = await axios.post(`/interviews/${interviewId}`, { status: InterviewStatus.CANCELLED });
      return convertInterviewResponse(response);
    } catch (e) {
      throw new Error(e.response.data.error);
    }
  },
  confirmInterview: async (interviewId: string) => {
    try {
      const response = await axios.post(`/interviews/${interviewId}`, { status: InterviewStatus.CONFIRMED });
      return convertInterviewResponse(response);
    } catch (e) {
      throw new Error(e.response.data.error);
    }
  },
  sendInvitation: async (availabilityId: string) => {
    try {
      const response = await axios.post(`/interviews`, { availabilityId });
      return convertInterviewResponse(response);
    } catch (e) {
      throw new Error(e.response.data.error);
    }
  },

  // AVAILABILITY
  getAvailabilities: async (): Promise<Availability[]> => {
    const response = await axios.get<GetAvailabilitiesResponse>(`/availability`);
    return convertAvailabilitiesResponse(response);
  },
  searchAvailabilities: async (startTime: string | string[]): Promise<AvailabilityWithUser[]> => {
    const response = await axios.post(`/availability/search`, { startTime });
    return convertAvailabilitiesResponse(response);
  },
  updateAvailabilities: async (availabilityMap: { [key: string]: boolean }): Promise<Availability[]> => {
    const response = await axios.put(`/availability`, { availabilities: availabilityMap });
    return convertAvailabilitiesResponse(response);
  },
};

export default apiClient;
