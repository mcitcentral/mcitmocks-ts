import { Availability } from "@prisma/client";
import { createAsyncThunk, createSlice, isAnyOf, isFulfilled, isRejected } from "@reduxjs/toolkit";
import { AvailabilityWithUser, InterviewWithUserInfo } from "../../../@types";
import apiClient from "../lib/apiClient";

export const fetchInterviews = createAsyncThunk("fetchInterviews", async () => {
  const interviewResponse = await apiClient.getInterviews();
  return interviewResponse;
});

export const fetchAll = createAsyncThunk("fetchAll", async () => {
  const [availabilityResponse, interviewResponse] = await Promise.all([
    apiClient.getAvailabilities(),
    apiClient.getInterviews(),
  ]);
  return { availabilityResponse, interviewResponse };
});

export const updateAvailabilities = createAsyncThunk(
  "updateAvailabilities",
  async (availabilityMap: { [key: string]: boolean }) => {
    return await apiClient.updateAvailabilities(availabilityMap);
  }
);

export const searchAvailabilities = createAsyncThunk("searchAvailabilities", async (startTimes: string | string[]) => {
  return await apiClient.searchAvailabilities(startTimes);
});

export const confirmInterview = createAsyncThunk("confirmInterview", async (interviewId: string) => {
  return await apiClient.confirmInterview(interviewId);
});

export const rejectInterview = createAsyncThunk("rejectInterview", async (interviewId: string) => {
  return await apiClient.rejectInterview(interviewId);
});

export const sendInvitation = createAsyncThunk("sendInvitation", async (availabilityId: string) => {
  return await apiClient.sendInvitation(availabilityId);
});

interface DashboardState {
  isLoading: boolean;
  interviews: InterviewWithUserInfo[];
  interviewsAsInvitee: InterviewWithUserInfo[];
  interviewsAsInviter: InterviewWithUserInfo[];
  availabilities: Availability[];
  searchedAvailabilities: AvailabilityWithUser[];
}

const initialState: DashboardState = {
  isLoading: true,
  interviews: [],
  interviewsAsInvitee: [],
  interviewsAsInviter: [],
  availabilities: [],
  searchedAvailabilities: [],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        fetchInterviews.fulfilled,
        confirmInterview.fulfilled,
        rejectInterview.fulfilled,
        sendInvitation.fulfilled
      ),
      (state, action) => {
        state.interviews = [...action.payload.interviewsAsInvitee, ...action.payload.interviewsAsInviter];
        state.interviewsAsInvitee = action.payload.interviewsAsInvitee;
        state.interviewsAsInviter = action.payload.interviewsAsInviter;
        state.isLoading = false;
      }
    );
    builder.addMatcher(isAnyOf(fetchAll.rejected, fetchInterviews.rejected), (state) => {
      state.availabilities = [];
      state.interviews = [];
      state.interviewsAsInviter = [];
      state.interviewsAsInvitee = [];
      state.isLoading = false;
    });
    builder.addMatcher(isFulfilled(fetchAll), (state, action) => {
      state.availabilities = action.payload.availabilityResponse;
      state.interviews = [
        ...action.payload.interviewResponse.interviewsAsInvitee,
        ...action.payload.interviewResponse.interviewsAsInviter,
      ];
      state.interviewsAsInvitee = action.payload.interviewResponse.interviewsAsInvitee;
      state.interviewsAsInviter = action.payload.interviewResponse.interviewsAsInviter;
      state.isLoading = false;
    });
    builder.addMatcher(isFulfilled(searchAvailabilities), (state, action) => {
      state.searchedAvailabilities = action.payload;
    });
    builder.addMatcher(isRejected(searchAvailabilities), (state) => {
      state.searchedAvailabilities = [];
    });
    builder.addMatcher(isFulfilled(updateAvailabilities), (state, action) => {
      state.availabilities = action.payload;
    });
    builder.addMatcher(isRejected(updateAvailabilities), (state) => {
      state.availabilities = [];
    });
  },
});

const { reducer } = dashboardSlice;
export default reducer;
