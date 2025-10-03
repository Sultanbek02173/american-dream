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
        `/administration/teacher/${id}/profile/`
      );
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const updateTeacherProfile = createAsyncThunk(
  'patch/teacherProfile',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const form = new FormData();

      Object.entries(data || {}).forEach(([key, value]) => {
        if (value === undefined || value === null) return;
        if (value instanceof File || value instanceof Blob) {
          form.append(key, value);
        } else if (Array.isArray(value)) {
          value.forEach(v => form.append(`${key}[]`, v));
        } else if (typeof value === 'object') {
          form.append(key, JSON.stringify(value));
        } else {
          form.append(key, value);
        }
      });

      const { data: response } = await axiosApi.patch(
        `/administration/teacher/${id}/profile/`,
        form
      );

      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
