import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { getHistoryPayments, PostHistoryPayments } from './historyPaymentsThunks';

const initialState = {
  loading: false,
  payments: [],
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
      });
  },
});

export const useHistoryPayments = () => useSelector(state => state.historyPayments);
export default historyPaymentsSlice.reducer;
