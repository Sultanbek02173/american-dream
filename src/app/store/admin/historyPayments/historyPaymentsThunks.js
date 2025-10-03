import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../../services/axiosApi';

export const getHistoryPayments = createAsyncThunk(
  'get/paymentsHistory',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get('/administration/payments/');
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const PostHistoryPayments = createAsyncThunk(
  'post/paymentsHistory',
  async (newPayments, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.post(
        '/administration/invoices/',
        newPayments
      );
      return data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const PostPayments = createAsyncThunk(
  'post/payments',
  async (newPayments, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.post(
        '/administration/payments/',
        newPayments
      );
      return data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const getTeachersSalaries = createAsyncThunk(
  'get/teachersSalaries',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get('/administration/teacher-payments/');
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getExpenses = createAsyncThunk(
  'get/expenses',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get('/administration/expenses/');
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const createExpenses = createAsyncThunk(
  'post/expenses',
  async (newExpense, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.post(
        '/administration/expenses/',
        newExpense
      );
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getIncomes = createAsyncThunk(
  'get/incomes',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get('/administration/incomes/');
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getFinancialReports = createAsyncThunk(
  'get/financial-reports',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get('/administration/financial-reports/');
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
