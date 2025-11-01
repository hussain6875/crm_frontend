import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { attachImage, getAuthHeaders } from "./API";

export const attachImages = createAsyncThunk(
  "attachments/attachImages",
  async ({ module, id, files }, { rejectWithValue }) => {
    try {
      console.log("from file slice",module,id,files);
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("attachments", files[i]);
      }
      const response = await fetch(`${attachImage}/${module}/${id}`, {
        method: "POST",
        body: formData,
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      if (!response.ok || data.success === false) {
        return rejectWithValue(data.message || "upload failed");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getImages = createAsyncThunk(
  "attachments/getImages",
  async ({ module, id }) => {
    try {
      const response = await fetch(`${attachImage}/${module}/${id}`, {
        headers: getAuthHeaders(),
      });
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
        headers: getAuthHeaders(),
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
  newData: [],
  loading: false,
  uploadError: null,
  error: null,
  deleteMessage: null,
};

const fileSlice = createSlice({
  name: "attachments",
  initialState,
  reducers: {
    clearError: (state) => {
      state.uploadError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(attachImages.pending, (state) => {
        state.loading = true;
        state.uploadError = null;
      })
      .addCase(attachImages.fulfilled, (state, action) => {
        state.loading = false;
        state.newData = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(attachImages.rejected, (state, action) => {
        state.loading = false;
        state.uploadError = action.payload || action.error.message;
      })
      .addCase(getImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getImages.fulfilled, (state, action) => {
        state.loading = false;
        state.data = Array.isArray(action.payload) ? action.payload : [];
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
