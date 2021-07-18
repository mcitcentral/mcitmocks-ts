import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import authReducer from "./authReducer";
import interviewReducer from "./interviewReducer";
import dashboardReducer from "./dashboardReducer";

const store = configureStore({
  middleware: getDefaultMiddleware({ serializableCheck: false }),
  reducer: {
    auth: authReducer,
    interview: interviewReducer,
    dashboard: dashboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
