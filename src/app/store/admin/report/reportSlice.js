import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { getGroupList } from './reportThunk';

const initialState = {
  loading: false,
  groupList: [],
  directions: [],
  error: null,
};

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getGroupList.pending, state => {
        state.loading = true;
      })
      .addCase(getGroupList.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.groupList = payload?.groups;
        state.directions = payload?.directions;
      })
      .addCase(getGroupList.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const useReport = () => useSelector(state => state.report);

export default reportSlice.reducer;
