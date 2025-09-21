import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { getPayments } from './paymentsThunks';

const initialState = {
  loading: false,
  payments: [],
  error: null,
};

const paymentsSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPayments.pending, state => {
        state.loading = true;
      })
      .addCase(getPayments.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.payments = payload;
      })
      .addCase(getPayments.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const usePayments = () => useSelector(state => state.payments);
export default paymentsSlice.reducer;
