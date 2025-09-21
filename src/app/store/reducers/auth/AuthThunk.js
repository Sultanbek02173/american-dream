import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosAuth } from '../../../services/axiosApi';
import Cookies from 'js-cookie';

export const userLogin = createAsyncThunk(
  '/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axiosAuth.post('/users/auth/login/', credentials);
      return data;
    } catch (e) {
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const getYourSelf = createAsyncThunk(
  '/me',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosAuth.get('/users/profile/');
      return data;
    } catch (e) {
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const logoutUser = createAsyncThunk('/logoutUser', async () => {
  if (typeof window !== 'undefined') {
    Cookies.remove('login');
    Cookies.remove('access');
    Cookies.remove('role');
  }
  return true;
});
