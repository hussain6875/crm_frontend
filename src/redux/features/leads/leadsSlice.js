// redux/leads/leadsSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchLeads, createLead, updateLead } from "./leadsThunks";

const leadsSlice = createSlice({
    name: "leads",
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLeads.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLeads.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchLeads.rejected, (state, action) => {
                state.error = action.payload?.message || action.payload || "Something went wrong";
            })
            .addCase(createLead.pending, (state) => {
                state.loading = true;
            })
            .addCase(createLead.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(createLead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateLead.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateLead.fulfilled, (state, action) => {
                state.loading = false;
                const updated = action.payload;
                const index = state.list.findIndex((lead) => lead.id === updated.id);
                if (index !== -1) {
                    state.list[index] = updated;
                }
            })
            .addCase(updateLead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default leadsSlice.reducer;
