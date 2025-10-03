import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { getPaymentTeacher } from './paymentsTeacherThunks';

const initialState = {
  loading: false,
  paymentTeacher: [],
  error: null,
};

const paymentTeacherSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPaymentTeacher.pending, state => {
        state.loading = true;
      })
      .addCase(getPaymentTeacher.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.paymentTeacher = payload;
      })
      .addCase(getPaymentTeacher.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const usePaymentTeacher = () => useSelector(state => state.paymentTeacher);
export default paymentTeacherSlice.reducer;
