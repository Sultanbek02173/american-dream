import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../../services/axiosApi';

export const scheduleStudentGet = createAsyncThunk(
  'scheduleStudent/get',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get(
        `/administration/schedule/next_for_student/`
      );
      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);
