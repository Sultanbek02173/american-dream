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
      const fd = new FormData();

      fd.append('homework', String(id)); // если нужно — подгоните имя

      // ССЫЛКИ — каждый элемент отдельным append, БЕЗ индексов!
      links
        .filter(Boolean)
        .slice(0, 5)
        .forEach(l => {
          fd.append('project_links', l); // вариант 1
          fd.append('project_links[]', l); // вариант 2 (на случай, если бек ждёт [])
        });

      // ФАЙЛЫ — только реальные File, БЕЗ объектов {name,type,...} и БЕЗ индексов!
      files
        .filter(f => f instanceof File)
        .slice(0, 5)
        .forEach(f => {
          fd.append('files', f, f.name); // вариант 1
          fd.append('files[]', f, f.name); // вариант 2
        });

      if (comment) fd.append('comment', comment);

      const { data } = await axiosApi.patch(`/student/homework/${id}/`, fd);
      return data;
    } catch (e) {
      return rejectWithValue(e?.response?.data || e.message);
    }
  }
);
