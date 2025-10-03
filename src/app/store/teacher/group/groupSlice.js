import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import {
  groupDetailGet,
  groupGet,
  updateLessonRecording,
  patchStudentAttendances,
} from './groupThunks';

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
      })
      // запись урока
      .addCase(updateLessonRecording.fulfilled, (state, { payload }) => {
        const { lessonId, lesson_recording } = payload || {};
        const months = state.groupDetail?.months;
        if (!months || !Array.isArray(months)) return;

        for (const m of months) {
          if (!m?.lessons) continue;
          const idx = m.lessons.findIndex(
            l => String(l.id) === String(lessonId)
          );
          if (idx !== -1) {
            m.lessons[idx] = {
              ...m.lessons[idx],
              lesson_recording,
            };
            break;
          }
        }
      })
      // ✅ PATCH посещаемости студента
      .addCase(patchStudentAttendances.fulfilled, (state, { payload }) => {
        const { studentId, attendances } = payload || {};
        if (!studentId || !Array.isArray(attendances)) return;

        // Пытаемся найти студента в groupDetail.students (если такая структура)
        const students = state.groupDetail?.students;
        if (Array.isArray(students)) {
          const sIdx = students.findIndex(
            s => String(s.id) === String(studentId)
          );
          if (sIdx !== -1) {
            const current = students[sIdx].attendances || [];
            // Обновляем статусы по id
            const byId = new Map(current.map(a => [String(a.id), a]));
            attendances.forEach(upd => {
              const key = String(upd.id);
              const row = byId.get(key);
              if (row) {
                row.status = upd.status;
              }
            });
            students[sIdx].attendances = Array.from(byId.values());
            return;
          }
        }

        if (Array.isArray(state.groupDetail?.attendances)) {
          const byId = new Map(
            state.groupDetail.attendances.map(a => [String(a.id), a])
          );
          attendances.forEach(upd => {
            const key = String(upd.id);
            const row = byId.get(key);
            if (row) row.status = upd.status;
          });
          state.groupDetail.attendances = Array.from(byId.values());
        }
      })
      .addCase(patchStudentAttendances.rejected, (state, { payload }) => {
        state.error = payload || 'Не удалось обновить посещаемость';
      });
  },
});

export const useGroup = () => useSelector(state => state.group);
export default groupSlice.reducer;
