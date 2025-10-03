import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../../services/axiosApi';

export const studentListGet = createAsyncThunk(
  'studentList/get',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get(`/teacher/student-table/`);
      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const studentDetailGet = createAsyncThunk(
  'studentDetail/get',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get(`/administration/students/${id}/profile/`);
      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);