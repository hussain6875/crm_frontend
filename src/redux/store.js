
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import dealReducer from "./dealSlice";
import ticketReducer from "./features/ticketSlice";
import activityReducer from "./features/activitySlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    deals: dealReducer,
    tickets: ticketReducer,
    activities: activityReducer,
    users: userReducer
  },
});

export default store;
