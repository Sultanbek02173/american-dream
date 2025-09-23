import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../../services/axiosApi';

export const homeworkGet = createAsyncThunk(
  'homework/get',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get(`/student/homework/`);
      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const homeworkDetailGet = createAsyncThunk(
  'homeworkDetail/get',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get(`/student/homework/${id}/`);
      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

const fileToDataURL = file =>
  new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });

export const homeWorkPost = createAsyncThunk(
  'homeworkDetail/submit',
  async ({ id, links = [], files = [], comment }, { rejectWithValue }) => {
    try {
      const filesPayload = await Promise.all(
        files.slice(0, 5).map(async f => ({
          name: f.name,
          type: f.type || 'application/octet-stream',
          content_base64: await fileToDataURL(f),
        }))
      );

      const payload = {
        project_links: links.filter(Boolean).slice(0, 5),
        files: filesPayload,
      };

      if (comment) payload.comment = comment;

      const { data } = await axiosApi.post(
        `/student/homework/${id}/submit/`,
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      return data;
    } catch (e) {
      console.error(e);
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);
