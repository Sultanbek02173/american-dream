// app/store/student/homeWork/homeworkThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../../services/axiosApi';

/* ===== Helpers ===== */

// Конвертируем File в ПОЛНЫЙ data URL: "data:<mime>;base64,...."
const fileToDataURL = file =>
  new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onerror = () => reject(new Error('dataURL read error'));
    r.onload = () => resolve(String(r.result || ''));
    r.readAsDataURL(file);
  });

// Нормализуем ссылки в массив строк (<=5)
const normalizeLinks = links =>
  (Array.isArray(links) ? links : [links])
    .map(l => (typeof l === 'string' ? l.trim() : String(l ?? '')))
    .filter(Boolean)
    .slice(0, 5);

// Готовим массив dataURL (<=5) только из реальных File
const toFilesDataURL = async files =>
  Promise.all(
    (Array.isArray(files) ? files : [files])
      .filter(f => f instanceof File)
      .slice(0, 5)
      .map(f => fileToDataURL(f))
  );

/* ===== List / Detail ===== */

export const homeworkGet = createAsyncThunk(
  'homework/get',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get(`/student/homework/`);
      return data;
    } catch (e) {
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
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

/* ===== Submit: JSON с dataURL =====
 * Формат, ожидаемый бэком:
 * {
 *   "homework": "42",
 *   "project_links": ["https://..."],
 *   "files": ["data:application/pdf;base64,JVBE..."],
 *   "comment": "..."
 * }
 */
export const homeWorkPost = createAsyncThunk(
  'homeworkDetail/submit',
  async ({ id, links = [], files = [], comment }, { rejectWithValue }) => {
    try {
      const project_links = normalizeLinks(links);
      const filesData = await toFilesDataURL(files); // string[]

      const payload = {
        homework: String(id),
        project_links, // всегда массив
        files: filesData, // всегда массив dataURL
        ...(comment ? { comment } : {}),
      };

      const { data } = await axiosApi.patch(
        `/student/homework/${id}/`,
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );
      return data;
    } catch (e) {
      return rejectWithValue(e?.response?.data || e.message);
    }
  }
);
