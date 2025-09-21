import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { createDirection, getDirections, getGroups } from './entitiesThunk';

const initialState = {
  loading: false,
  directions: [],
  groups: [],
  error: null,
};

const entitiesSlice = createSlice({
  name: 'entities',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getDirections.pending, state => {
        state.loading = true;
      })
      .addCase(getDirections.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.directions = payload;
      })
      .addCase(getDirections.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(createDirection.pending, state => {
        state.loading = true;
      })
      .addCase(createDirection.fulfilled, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(createDirection.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(getGroups.pending, state => {
        state.loading = true;
      })
      .addCase(getGroups.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.groups = payload;
      })
      .addCase(getGroups.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const useEntities = () => useSelector(state => state.entities);
export default entitiesSlice.reducer;
