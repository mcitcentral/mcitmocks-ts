import axios from "axios";

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
  getInterviews: async (status:string) => {
    const response = await axios.get("/interviews", { params: { status: status} });
    return response.data;
  },
  getAvailability: async () => {
    const response = await axios.get("/availability");
    return response.data;
  },
};

export default apiClient;
