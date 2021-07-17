import axios from "axios";
import { GetAvailabilitiesResponse, GetInterviewResponse } from "../../../@types";

axios.defaults.baseURL = "/api";

const apiClient = {
  authenticateToken: async (token: string) => {
    const response = await axios.post("/auth/token", { token });
    return response.data;
  },
  getUser: async () => {
    const response = await axios.get("/auth/user");
    return response.data;
  },
  getInterview: async (interviewId: string) => {
    const response = await axios.get(`/interviews/${interviewId}`);
    return response.data;
  },
  getAvailabilities: async () => {
    const response = await axios.get<GetAvailabilitiesResponse>(`/availability`);
    console.log(response);
    const availabilities = response.data.availabilities.map((availability) => ({
      ...availability,
      startTime: new Date(availability.startTime),
    }));
    return availabilities;
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
};

export default apiClient;
