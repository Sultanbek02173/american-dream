import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { applicationGet } from './applicationThunks';

const initialState = {
  application: [],
  loading: false,
  error: null,
};

const applicationAdmin = createSlice({
  name: 'agents',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(applicationGet.pending, state => {
        state.loading = true;
      })
      .addCase(applicationGet.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.application = payload;
      })
      .addCase(applicationGet.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const useApplicationAdmin = () =>
  useSelector(state => state.applicationAdmin);
export default applicationAdmin.reducer;
