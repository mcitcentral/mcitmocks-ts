import { AxiosResponse } from "axios";
import { GetAvailabilitiesResponse, GetInterviewResponse } from "../../../@types";

export const convertInterviewResponse = (response: AxiosResponse<GetInterviewResponse>) => {
  const interviewsAsInvitee = response.data.interviewsAsInvitee.map((interview) => ({
    ...interview,
    startTime: new Date(interview.startTime),
  }));
  const interviewsAsInviter = response.data.interviewsAsInviter.map((interview) => ({
    ...interview,
    startTime: new Date(interview.startTime),
  }));
  return { interviewsAsInvitee, interviewsAsInviter };
};

export const convertAvailabilitiesResponse = (response: AxiosResponse<GetAvailabilitiesResponse>) => {
  const availabilities = response.data.availabilities.map((availability) => ({
    ...availability,
    startTime: new Date(availability.startTime),
  }));
  return availabilities;
};
