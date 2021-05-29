import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../lib/apiClient";

export const fetchUserByAccessToken = createAsyncThunk("auth/fetchUserByAccessToken", async (accessToken: string) => {
  return await apiClient.authenticateToken(accessToken);
});

export const fetchUserByJWT = createAsyncThunk("auth/fetchUserByJWT", async () => {
  return await apiClient.getUser();
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, isLoading: false, isAuthenticated: false },
  reducers: {
    setUser(state, action) {
      if (action.payload) {
        state.user = action.payload;
        state.isAuthenticated = true;
      } else {
        state.user = null;
        state.isAuthenticated = false;
      }
    },
    resetUser(state, _action) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: {
    [fetchUserByAccessToken.fulfilled.type]: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    [fetchUserByAccessToken.rejected.type]: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    [fetchUserByJWT.fulfilled.type]: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    [fetchUserByJWT.fulfilled.type]: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

const { actions, reducer } = authSlice;
export const { setUser, resetUser } = actions;
export default reducer;
