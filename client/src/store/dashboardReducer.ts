import { Availability, Interview, InterviewStatus } from "@prisma/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../lib/apiClient";

export const fetchConfirmedInterviews = createAsyncThunk("dashboard/fetchConfirmedInterviews", 
  async () => {
    return await apiClient.getInterviews("CONFIRMED");
});

export const fetchInvitedInterviews = createAsyncThunk("dashboard/fetchInvitedInterviews", 
  async () => {
    return await apiClient.getInterviews("INVITED");
});

export const fetchMyAvailability = createAsyncThunk("dashboard/fetchMyAvailability", 
  async () => {
    return await apiClient.getAvailability();
});

/*
export const searchMatchedAvailability = createAsyncThunk("dashboard/searchMatchedAvailability", 
  async (myAvailability) => {
    return await apiClient.searchAvailability(myAvailability);
});
*/
const getUpcomingMock = (interviews: Interview[])=> {
  let upcomingInterview = interviews[0];
  for(var i = 0; i < interviews.length; i++) {
    if(interviews[i].startTime < upcomingInterview.startTime) {
        upcomingInterview = interviews[i];
    }
  }
  return upcomingInterview;
}
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    confirmedInterviews: [] as Interview[],
    sentInvitations: [] as Interview[],
    receivedInvitations: [] as Interview[],
    upcomingMock: null as  Interview | null,
    availability: [] as Availability[],
  },
  reducers: {
    setAvailability(state, action) {
      state.availability = action.payload;
    },
    setConfirmedInterviews(state, action) {
      state.confirmedInterviews = action.payload;
    },
    setSentInvitations(state, action) {
      state.sentInvitations = action.payload;
    }
  },
  extraReducers: {
    [fetchConfirmedInterviews.fulfilled.type]: (state, action) => {
      state.confirmedInterviews = action.payload.interviews;
      state.upcomingMock = getUpcomingMock(state.confirmedInterviews);
    },
    [fetchConfirmedInterviews.rejected.type]: (state) => {
        state.confirmedInterviews = [];
        state.upcomingMock = null;
    },
    [fetchInvitedInterviews.fulfilled.type]: (state, action) => {
        state.sentInvitations = action.payload.interviews.interviewsAsInviter;
        state.receivedInvitations = action.payload.interviews.interviewsAsInvitee;
    },
    [fetchInvitedInterviews.rejected.type]: (state) => {
        state.sentInvitations = [];
        state.receivedInvitations = [];    
    },
    [fetchMyAvailability.fulfilled.type]: (state, action) => {
        state.availability = action.payload.interviews;
      },
    [fetchMyAvailability.rejected.type]: (state) => {
        state.availability = [];
    },
  },
});

const { actions, reducer } = dashboardSlice;
export const { setAvailability, setConfirmedInterviews,  setSentInvitations} = actions;
export default reducer;
