import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../../services/axiosApi';

export const getGroupList = createAsyncThunk(
  'get/groupList',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get('/administration/group-table/');
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
