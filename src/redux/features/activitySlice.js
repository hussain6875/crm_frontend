import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { allActivities } from "./API";

export const getAllActivities = createAsyncThunk(
  "activities/getAllActivities",
  async ({ module, id }) => {
    try {
      const response = await fetch(`${allActivities}/${module}/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      throw err;
    }
  }
);

export const createNewActivity = createAsyncThunk(
  "activities/createNewActivity",
  async ({ module, id, data, type }) => {
    try {
      const response = await fetch(
        `${allActivities}/${module}/create/${id}?activity=${type}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error("failed to create the module.");
      }
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      throw error;
    }
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
