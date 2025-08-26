import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ActivityService from "../../services/ActivityService";

export const getAllActivities = createAsyncThunk(
  "activities/getAllActivities",
  async ({ module, id }) => {
    return await ActivityService.getActivitiesByModuleId(module, id);
  }
);

export const createNewActivity = createAsyncThunk(
  "activities/createNewActivity",
  async ({ module, id, data, type }) => {

    return await ActivityService.createActivity(module, id, data, type);
  }
);

const initialState = {
  activities: {},
  loading: false,
  error: null,
};

const activitySlice = createSlice({
  name: "activities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllActivities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllActivities.fulfilled, (state, action) => {
        state.loading = false;
        state.activities = action.payload.activities || state.activities;
      })
      .addCase(getAllActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createNewActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewActivity.fulfilled, (state, action) => {
        state.loading = false;
        if (state.activities) {
          state.activities = {
            ...state.activities,
            [action.meta.arg.type]: [
              ...(state.activities[action.meta.arg.type] || []),
              action.payload,
            ],
          };
        }
      })
      .addCase(createNewActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default activitySlice.reducer;
