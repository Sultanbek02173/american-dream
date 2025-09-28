import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../../services/axiosApi';

export const groupGet = createAsyncThunk(
  'group/get',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get(`/teacher/group-table/`);
      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const groupDetailGet = createAsyncThunk(
  'groupDetail/get',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get(`/teacher/groups/${id}/dashboard/`);
      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);