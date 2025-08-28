import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { attachImage } from "./API";

export const attachImages = createAsyncThunk(
  "attachments/attachImages",
  async ({ module, id, files }) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("attachments", files[i]);
      }
      const response = await fetch(`${attachImage}/${module}/${id}`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const getImages = createAsyncThunk(
  "attachments/getImages",
  async ({ module, id }) => {
    try {
      const response = await fetch(`${attachImage}/${module}/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteImage = createAsyncThunk(
  "attachments/deleteImage",
  async ({ id }) => {
    try {
      const response = await fetch(`${attachImage}/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  data: [],
  loading: false,
  error: null,
  deleteMessage: null,
};

const fileSlice = createSlice({
  name: "attachments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(attachImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(attachImages.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [...state.data, ...action.payload];
      })
      .addCase(attachImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getImages.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.error = null;
        state.deleteMessage = action.payload.message;
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default fileSlice.reducer;
