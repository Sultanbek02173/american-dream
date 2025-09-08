import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { dashBoardGet } from './homeAdminThunks';

const initialState = {
  dashBoard: [],
  loading: false,
  error: null,
};

const adminHome = createSlice({
  name: 'agents',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(dashBoardGet.pending, state => {
        state.loading = true;
      })
      .addCase(dashBoardGet.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.dashBoard = payload;
      })
      .addCase(dashBoardGet.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const useAdminHome = () => useSelector(state => state.adminHome);
export default adminHome.reducer;
