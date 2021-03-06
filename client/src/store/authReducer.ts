import { User } from "@prisma/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserPreferences } from "../../../@types";
import apiClient from "../lib/apiClient";

export const fetchUserByAccessToken = createAsyncThunk("auth/fetchUserByAccessToken", async (accessToken: string) => {
  return await apiClient.authenticateToken(accessToken);
});

export const fetchUserByJWT = createAsyncThunk("auth/fetchUserByJWT", async () => {
  return await apiClient.getUser();
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  return await apiClient.logoutUser();
});

export const updateUser = createAsyncThunk("auth/updateUser", async (preferences: Partial<UserPreferences>) => {
  return await apiClient.updateUser(preferences);
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null as User | null, isLoading: true, isAuthenticated: false },
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
    resetUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = true;
    },
  },
  extraReducers: {
    [fetchUserByAccessToken.fulfilled.type]: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    [fetchUserByAccessToken.rejected.type]: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    [fetchUserByJWT.fulfilled.type]: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    [fetchUserByJWT.rejected.type]: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    [logoutUser.fulfilled.type]: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    [updateUser.fulfilled.type]: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

const { actions, reducer } = authSlice;
export const { setUser, resetUser } = actions;
export default reducer;
