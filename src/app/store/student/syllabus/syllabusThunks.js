import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../../services/axiosApi';

export const syllabusGet = createAsyncThunk(
  'syllabus/get',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get(`/administration/months/`);
      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);
