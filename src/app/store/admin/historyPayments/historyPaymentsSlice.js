import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import {
  createExpenses,
  getExpenses,
  getFinancialReports,
  getHistoryPayments,
  getIncomes,
  getTeachersSalaries,
  PostHistoryPayments,
} from './historyPaymentsThunks';

const initialState = {
  loading: false,
  payments: [],
  financialReports: [],
  teachersSalaries: [],
  expenses: [],
  incomes: [],
  error: null,
};

const historyPaymentsSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getHistoryPayments.pending, state => {
        state.loading = true;
      })
      .addCase(getHistoryPayments.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.payments = payload;
      })
      .addCase(getHistoryPayments.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(PostHistoryPayments.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.payments = payload;
      })
      .addCase(getTeachersSalaries.pending, state => {
        state.loading = true;
      })
      .addCase(getTeachersSalaries.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.teachersSalaries = payload;
      })
      .addCase(getTeachersSalaries.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(getExpenses.pending, state => {
        state.loading = true;
      })
      .addCase(getExpenses.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.expenses = payload;
      })
      .addCase(getExpenses.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(createExpenses.pending, state => {
        state.loading = true;
      })
      .addCase(createExpenses.fulfilled, (state, { payload }) => {
        state.loading = false;
        // state.expenses = payload;
      })
      .addCase(createExpenses.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(getIncomes.pending, state => {
        state.loading = true;
      })
      .addCase(getIncomes.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.incomes = payload;
      })
      .addCase(getIncomes.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(getFinancialReports.pending, state => {
        state.loading = true;
      })
      .addCase(getFinancialReports.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.financialReports = payload;
      })
      .addCase(getFinancialReports.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const useHistoryPayments = () =>
  useSelector(state => state.historyPayments);
export default historyPaymentsSlice.reducer;
