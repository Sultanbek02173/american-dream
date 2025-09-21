import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../../services/axiosApi';

export const getDirections = createAsyncThunk(
  'get/directions',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get('/administration/direction/');
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const createDirection = createAsyncThunk(
  'create/direction',
  async data => {
    try {
      const { data: response } = await axiosApi.get(
        '/administration/direction/',
        data
      );
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getGroups = createAsyncThunk(
  'get/groups',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get('/administration/groups/');
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
