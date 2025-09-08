import { createAsyncThunk } from '@reduxjs/toolkit';
// import axiosAuth from '../../../services/axiosApi';

export const userLogin = createAsyncThunk(
  '/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axiosAuth.post('users/register/', credentials);
      return data;
    } catch (e) {
      // console.log(e);
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const logoutUser = createAsyncThunk('/logoutUser', async () => {
  return true;
});
