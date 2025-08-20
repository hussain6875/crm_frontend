import { configureStore } from "@reduxjs/toolkit";
import dealReducer from "./dealSlice";
import ticketReducer from "./features/ticketSlice";
import activityReducer from "./features/activitySlice";
const store = configureStore({
  reducer: {
    deals: dealReducer,
    tickets: ticketReducer,
    activities: activityReducer,
  },
});
export default store;
