// store/slices/homeworkSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { homeworkDetailGet, homeworkGet, homeWorkPost } from './homeworkThunks';

const initialState = {
  homework: [], 
  homeworkDetail: null, 
  listLoading: false, 
  detailLoading: false, 
  submitLoading: false, 
  error: null, 
};

const homework = createSlice({
  name: 'homework',
  initialState,
  reducers: {
    clearHomeworkError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(homeworkGet.pending, state => {
        state.listLoading = true;
        state.error = null;
      })
      .addCase(homeworkGet.fulfilled, (state, { payload }) => {
        state.listLoading = false;
        state.homework = payload ?? [];
      })
      .addCase(homeworkGet.rejected, (state, { payload }) => {
        state.listLoading = false;
        state.error = payload || 'Не удалось получить список домашних заданий';
      })

      .addCase(homeworkDetailGet.pending, state => {
        state.detailLoading = true;
        state.error = null;
      })
      .addCase(homeworkDetailGet.fulfilled, (state, { payload }) => {
        state.detailLoading = false;
        state.homeworkDetail = payload ?? null;
      })
      .addCase(homeworkDetailGet.rejected, (state, { payload }) => {
        state.detailLoading = false;
        state.homeworkDetail = null;
        state.error = payload || 'Не удалось получить детали домашнего задания';
      })

      .addCase(homeWorkPost.pending, state => {
        state.submitLoading = true;
        state.error = null;
      })
      .addCase(homeWorkPost.fulfilled, (state, { payload }) => {
        state.submitLoading = false;
        state.homeworkDetail = payload ?? state.homeworkDetail;
      })
      .addCase(homeWorkPost.rejected, (state, { payload }) => {
        state.submitLoading = false;
        state.error = payload || 'Не удалось отправить решение';
      });
  },
});

export const { clearHomeworkError } = homework.actions;

export const useHomework = () => useSelector(state => state.homework);

export default homework.reducer;
