import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DealService from "../services/DealService";

export const fetchDeals = createAsyncThunk("deals/fetchDeals", async () => {
  return await DealService.getDeals();
});

export const fetchDealsByID = createAsyncThunk(
  "deals/fetchDealsByID",
  async (id) => {
    return await DealService.getDealById(id);
  }
);

export const createDeal = createAsyncThunk('fetch/createDeal',async (dealData)=>{
    return await DealService.createDeal(dealData);
});

export const updateDeal = createAsyncThunk('deals/updateDeal',async ({id, updatedData})=>{
    return await DealService.updateDeal(id, updatedData);
});

const dealSlice = new createSlice({
  name: "deals",
  initialState: {
    deals: [],
    selectedDeal: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //pending,fulfilled,rejected for the fetchDeals method
      .addCase(fetchDeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeals.fulfilled, (state, action) => {
        state.loading = false;
        state.deals = action.payload.data;
      })
      .addCase(fetchDeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //pending,fulfilled,rejected fo rthe fetchDeals by ID method
      .addCase(fetchDealsByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDealsByID.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedDeal = action.payload;
      })
      .addCase(fetchDealsByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //pending,fulfilled,rejected for creating new Deal method
      .addCase(createDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDeal.fulfilled, (state, action) => {
        state.loading = false;
        // ensure state.deals is always an array before pushing
        if (!Array.isArray(state.deals)) {
          state.deals = [];
        }
        state.deals.push(action.payload);
      })
      .addCase(createDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDeal.fulfilled, (state, action) => {
        state.loading = false;
        const updatedDeal = action.payload;
        //ensure state.deals is always an array
        if (!Array.isArray(state.deals)) {
          state.deals = [];
        }
        // update in deals array
        const index = state.deals.findIndex((deal) => deal.id === updatedDeal.id);
        if (index !== -1) {
          state.deals[index] = updatedDeal;
        }
        // update selectedDeal if currently being viewed
        if (state.selectedDeal && state.selectedDeal.id === updatedDeal.id) {
          state.selectedDeal = updatedDeal;
        }
      })
      .addCase(updateDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});
export default dealSlice.reducer;
