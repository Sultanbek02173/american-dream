import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { groupDetailGet, groupGet } from './groupThunks';

const initialState = {
  group: [],
  groupDetail: [],
  groupDetailLoad: false,
  listLoading: false,
  error: null,
};

const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(groupGet.pending, state => {
        state.listLoading = true;
        state.error = null;
      })
      .addCase(groupGet.fulfilled, (state, { payload }) => {
        state.listLoading = false;
        state.group = payload ?? [];
      })
      .addCase(groupGet.rejected, (state, { payload }) => {
        state.listLoading = false;
        state.error = payload || 'Не удалось получить учебный план';
      })
      .addCase(groupDetailGet.fulfilled, (state, { payload }) => {
        state.groupDetailLoad = false;
        state.groupDetail = payload ?? [];
      });
  },
});

export const useGroup = () => useSelector(state => state.group);
export default groupSlice.reducer;
