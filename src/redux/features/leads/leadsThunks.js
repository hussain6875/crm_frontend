import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  getAllLeadsApi,
  createLeadApi,
  editLeadApi,
  getLeadByIdApi,
  getAuthHeaders,
} from "../../../constants/leadApi";

// Fetch all leads
export const fetchLeads = createAsyncThunk(
  "leads/fetchLeads",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(getAllLeadsApi, {
        headers: getAuthHeaders(),
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch leads");
    }
  }
);

// Fetch single lead by ID
export const fetchLeadById = createAsyncThunk(
  "leads/fetchLeadById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${getLeadByIdApi}${id}`, {
        headers: getAuthHeaders(),
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch lead");
    }
  }
);

// Create new lead
export const createLead = createAsyncThunk(
  "leads/createLead",
  async (leadData, { rejectWithValue }) => {
    try {
      const res = await axios.post(createLeadApi, leadData, {
        headers: getAuthHeaders(),
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to create lead");
    }
  }
);

// Update lead
export const updateLead = createAsyncThunk(
  "leads/updateLead",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${editLeadApi}${id}`, data, {
        headers: getAuthHeaders(),
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to update lead");
    }
  }
);
