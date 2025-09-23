// store/slices/homeworkSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { syllabusGet } from './syllabusThunks';

const initialState = {
  syllabus: [],
  listLoading: false,
  error: null,
};

const syllabusSlice = createSlice({
  name: 'syllabus',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(syllabusGet.pending, state => {
        state.listLoading = true;
        state.error = null;
      })
      .addCase(syllabusGet.fulfilled, (state, { payload }) => {
        state.listLoading = false;
        state.syllabus = payload ?? [];
      })
      .addCase(syllabusGet.rejected, (state, { payload }) => {
        state.listLoading = false;
        state.error = payload || 'Не удалось получить список домашних заданий';
      });
  },
});


export const useHomework = () => useSelector(state => state.homework);

export default syllabusSlice.reducer;
