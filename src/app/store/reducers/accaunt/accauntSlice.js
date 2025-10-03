import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { accauntGet } from './accauntThunks';

const initialState = {
  accaunt: [],
  loading: false,
  error: null,
};

const accaunt = createSlice({
  name: 'accaunt',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(accauntGet.pending, state => {
        state.loading = true;
      })
      .addCase(accauntGet.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.accaunt = payload;
      })
      .addCase(accauntGet.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const useAccaunt = () => useSelector(state => state.accaunt);
export default accaunt.reducer;
