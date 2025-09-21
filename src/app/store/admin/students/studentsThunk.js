import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../../services/axiosApi';

export const getStudentList = createAsyncThunk(
  'get/students',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get('/administration/student-table/');
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const createStudent = createAsyncThunk(
  'create/student',
  async credentials => {
    try {
      const { data } = await axiosApi.post(
        `/administration/students-add/`,
        credentials
      );
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getStudentProfile = createAsyncThunk(
  'get/studentProfile',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get(
        `/administration/students/${id}/profile/`
      );
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const updateStudentProfile = createAsyncThunk(
  'update/studentProfile',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const { data: response } = await axiosApi.patch(
        `/administration/students/${id}/profile/`,
        data
      );
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getStudentHistory = createAsyncThunk(
  'get/studentHistory',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get(
        `/administration/students/${id}/attendance/`
      );
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getStudentPayments = createAsyncThunk(
  'get/studentPayments',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get(
        `/administration/students/${id}/payments/`
      );
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
