import { Availability } from "@prisma/client";
import axios from "axios";
import { AvailabilityWithUser, GetAvailabilitiesResponse, GetInterviewResponse } from "../../../@types";

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

  // INTERVIEW
  getInterview: async (interviewId: string) => {
    const response = await axios.get(`/interviews/${interviewId}`);
    return response.data;
  },
  getInterviews: async () => {
    const response = await axios.get<GetInterviewResponse>(`/interviews`);
    const interviewsAsInvitee = response.data.interviewsAsInvitee.map((interview) => ({
      ...interview,
      startTime: new Date(interview.startTime),
    }));
    const interviewsAsInviter = response.data.interviewsAsInviter.map((interview) => ({
      ...interview,
      startTime: new Date(interview.startTime),
    }));
    return { interviewsAsInvitee, interviewsAsInviter };
  },

  // AVAILABILITY
  getAvailabilities: async (): Promise<Availability[]> => {
    const response = await axios.get<GetAvailabilitiesResponse>(`/availability`);
    const availabilities = response.data.availabilities.map((availability) => ({
      ...availability,
      startTime: new Date(availability.startTime),
    }));
    return availabilities;
  },
  searchAvailabilities: async (startTime: string | string[]): Promise<AvailabilityWithUser[]> => {
    const response = await axios.post(`/availability/search`, { startTime });
    const availabilities = response.data.availabilities.map((availability) => ({
      ...availability,
      startTime: new Date(availability.startTime),
    }));
    return availabilities;
  },
  updateAvailabilities: async (availabilityMap: { [key: string]: boolean }): Promise<Availability[]> => {
    const response = await axios.put(`/availability`, { availabilities: availabilityMap });
    const availabilities = response.data.availabilities.map((availability) => ({
      ...availability,
      startTime: new Date(availability.startTime),
    }));
    return availabilities;
  },
};

export default apiClient;
