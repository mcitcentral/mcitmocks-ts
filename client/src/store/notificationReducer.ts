import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  message: string;
  status: "success" | "error" | "information" | null;
} = {
  message: "",
  status: null,
};

const notificationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setNotification(state, action) {
      state.status = action.payload.status;
      state.message = action.payload.message;
    },
    resetNotification(state) {
      state.status = null;
      state.message = "";
    },
  },
});

const { actions, reducer } = notificationSlice;
export const { setNotification, resetNotification } = actions;
export default reducer;
