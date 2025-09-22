import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../../services/axiosApi';

export const getTeacherList = createAsyncThunk(
  'get/teachers',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get('/administration/teacher-table/');
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const createTeacher = createAsyncThunk(
  'create/teachers',
  async credentials => {
    try {
      const { data } = await axiosApi.post(
        `/administration/teachers-add/`,
        credentials
      );
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getTeacherProfile = createAsyncThunk(
  'get/teacherProfile',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get(
        `/administration/teachers/${id}/profile/`
      );
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
