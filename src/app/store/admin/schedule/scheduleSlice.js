import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { scheduleGet, schedulePost } from './scheduleThunks';

const initialState = {
  schedule: [],
  loading: false,
  error: null,
};

const scheduleAdmin = createSlice({
  name: 'agents',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(scheduleGet.pending, state => {
        state.loading = true;
      })
      .addCase(scheduleGet.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.schedule = payload;
      })
      .addCase(scheduleGet.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(schedulePost.fulfilled, (state, { payload }) => {
        state.schedule = payload;
      });
  },
});

export const useScheduleAdmin = () => useSelector(state => state.schedule);
export default scheduleAdmin.reducer;
