import { configureStore } from "@reduxjs/toolkit";
import dealReducer from "./dealSlice";
import ticketReducer from "./features/ticketSlice";
const store = configureStore({
  reducer: {
    deals: dealReducer,
    tickets: ticketReducer,
  },
});
export default store;
