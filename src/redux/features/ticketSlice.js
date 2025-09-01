import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { createTicket, editTicket, getAllTickets, getTicketById } from "./API";


export const fetchTickets = createAsyncThunk(
  "tickets/fetchTickets",
  async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(getAllTickets, {
      authorizaton: `Bearer ${token}`
    });
    if (!response.ok) {
      throw new Error("failed to fetch Tickets");
    }
    const data = await response.json();
    return data;
  }
);

export const fetchTicketById = createAsyncThunk(
  "tickets/fetchTicketsById",
  async (id) => {
    const response = await fetch(getTicketById(id));
    if (!response.ok) {
      throw new Error("failed to fetch Ticket");
    }
    const data = await response.json();
    return data;
  }
);

export const createTicketAPI = createAsyncThunk(
  "tickets/createNewTicket",
  async (newData) => {
    const token = localStorage.getItem("token");
    const response = await fetch(createTicket, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
           authorizaton: `Bearer ${token}`,
      },
      body: JSON.stringify(newData),
    });
    if (!response.ok) {
      throw new Error("Failed to create Ticket");
    }
    const data = await response.json();
    return data;
  }
);

export const updateTicket = createAsyncThunk(
  "tickets/updateTicket",
  async ({ updatedData, id }) => {
    const response = await fetch(editTicket + id, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error("failed to update ticket");
    }
    const data = await response.json();
    return data;
  }
);

const initialState = {
  tickets: [],
  loading: false,
  error: false,
  ticket: {},
  createError: null,
  createMessage: {},
};

const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTicketById.fulfilled, (state, action) => {
        state.ticket = action.payload;
      })
      .addCase(createTicketAPI.pending, (state) => {
        state.loading = true;
        state.createError = null;
      })
      .addCase(createTicketAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.createMessage = action.payload.message;
      })
      .addCase(createTicketAPI.rejected, (state, action) => {
        state.loading = false;
        state.createError = action.error.message;
      });
  },
});

export default ticketSlice.reducer;
