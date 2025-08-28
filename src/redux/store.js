
import { configureStore } from "@reduxjs/toolkit";
import dealReducer from "./dealSlice";
import ticketReducer from "./features/ticketSlice";
import activityReducer from "./features/activitySlice";
import leadsReducer from '../redux/features/leads/leadsSlice';
import userReducer from "./userSlice";
import fileReducer from "./features/fileSlice";

const store = configureStore({
  reducer: {
    deals: dealReducer,
    tickets: ticketReducer,
    activities: activityReducer,
    users: userReducer,
    attachments: fileReducer,
    leads: leadsReducer,
  },
});

export default store;
