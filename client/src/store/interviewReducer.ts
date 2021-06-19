import { Interview, InterviewQuestion } from "@prisma/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../lib/apiClient";

export const fetchInterview = createAsyncThunk("intereview/fetchInterview", async (interviewId: string) => {
  return await apiClient.getInterview(interviewId);
});

interface InterviewWithQuestions extends Interview {
  questions: InterviewQuestion[];
}

const interviewSlice = createSlice({
  name: "interview",
  initialState: {
    interviewId: null,
    interview: null as InterviewWithQuestions | null,
    code: "",
    isLoading: true,
    redirect: false,
  },
  reducers: {
    setInterviewId(state, action) {
      state.interviewId = action.payload;
    },
    setCode(state, action) {
      state.code = action.payload;
    },
    resetCode(state) {
      state.code = "";
    },
  },
  extraReducers: {
    [fetchInterview.fulfilled.type]: (state, action) => {
      state.interview = action.payload.interview;
      state.isLoading = false;
    },
    [fetchInterview.rejected.type]: (state) => {
      state.interview = null;
      state.isLoading = false;
      state.redirect = true;
    },
  },
});

const { actions, reducer } = interviewSlice;
export const { setInterviewId, setCode, resetCode } = actions;
export default reducer;
