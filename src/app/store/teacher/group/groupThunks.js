import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../../services/axiosApi';

export const groupGet = createAsyncThunk(
  'group/get',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get(`/teacher/group-table/`);
      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const groupDetailGet = createAsyncThunk(
  'groupDetail/get',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get(`/teacher/groups/${id}/dashboard/`);
      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const updateLessonRecording = createAsyncThunk(
  'group/lessonRecordingUpdate',
  async ({ lessonId, lesson_recording }, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.patch(`/teacher/lessons/${lessonId}/`, {
        lesson_recording,
      });
      return {
        lessonId,
        lesson_recording: data?.lesson_recording ?? lesson_recording,
      };
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);


export const patchStudentAttendances = createAsyncThunk(
  'group/patchStudentAttendances',
  async ({ groupId, studentId, attendances }, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.patch(
        `/administration/groups/${groupId}/dashboard/${studentId}/`,
        { attendances }
      );
      return {
        studentId,
        attendances: data?.attendances ?? attendances,
      };
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);
