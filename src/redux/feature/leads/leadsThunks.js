// redux/leads/leadsThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchLeads = createAsyncThunk('leads/fetchLeads', async (_, thunkAPI) => {
    try {
        const res = await axios.get("http://localhost:8080/api/leads");
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || "Fetch error");
    }
});

export const createLead = createAsyncThunk(
  'leads/createLead',
  async (leadData, { rejectWithValue }) => {
    try {
      const res = await axios.post('http://localhost:8080/api/leads', leadData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateLead = createAsyncThunk(
  "leads/updateLead",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`http://localhost:8080/api/leads/${id}`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
