// redux/leads/leadsThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAllLeadsApi,createLeadApi,editLeadApi} from "../../../constants/leadApi"

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const fetchLeads = createAsyncThunk('leads/fetchLeads', async (_, thunkAPI) => {
    try {
        const res = await axios.get(getAllLeadsApi,{
          headers: getAuthHeaders()
        });
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || "Fetch error");
    }
});

export const createLead = createAsyncThunk(
  'leads/createLead',
  async (leadData, { rejectWithValue }) => {
    try {
      const res = await axios.post(createLeadApi, leadData, {
        headers:getAuthHeaders()
      });
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
      const res = await axios.put(editLeadApi + id , data,{
        headers:getAuthHeaders()
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
