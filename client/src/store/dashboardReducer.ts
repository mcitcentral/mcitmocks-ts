import { Availability } from "@prisma/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { InterviewWithUserInfo } from "../../../@types";
import apiClient from "../lib/apiClient";

export const fetchAll = createAsyncThunk("fetchAll", async () => {
  const [availabilityResponse, interviewResponse] = await Promise.all([
    apiClient.getAvailabilities(),
    apiClient.getInterviews(),
  ]);
  return { availabilityResponse, interviewResponse };
});

export const updateAvailabilities = createAsyncThunk("updateAvailabilities", async () => {});

interface DashboardState {
  isLoading: boolean;
  interviews: InterviewWithUserInfo[];
  interviewsAsInvitee: InterviewWithUserInfo[];
  interviewsAsInviter: InterviewWithUserInfo[];
  availabilities: Availability[];
}

const initialState: DashboardState = {
  isLoading: true,
  interviews: [],
  interviewsAsInvitee: [],
  interviewsAsInviter: [],
  availabilities: [],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAll.fulfilled.type]: (state, action) => {
      state.availabilities = action.payload.availabilityResponse;
      state.interviews = [
        ...action.payload.interviewResponse.interviewsAsInvitee,
        ...action.payload.interviewResponse.interviewsAsInviter,
      ];
      state.interviewsAsInvitee = action.payload.interviewResponse.interviewsAsInvitee;
      state.interviewsAsInviter = action.payload.interviewResponse.interviewsAsInviter;
      state.isLoading = false;
    },
    [fetchAll.rejected.type]: (state) => {
      state.availabilities = [];
      state.interviews = [];
      state.interviewsAsInviter = [];
      state.interviewsAsInvitee = [];
      state.isLoading = false;
    },
  },
});

const { actions, reducer } = dashboardSlice;
export const {} = actions;
export default reducer;
