import { useNavigate } from 'react-router-dom';
import './beforeLesson.scss';
import { Countdown } from '../../../entities';
import { useAccaunt } from '../../../app/store/reducers/accaunt/accauntSlice';
import { useDispatch } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { scheduleStudentGet } from '../../../app/store/student/sheduleStudent/sheduleStudentThunks';
import { useScheduleStudent } from '../../../app/store/student/sheduleStudent/sheduleStudentSlice';

/** "HH:MM" -> {h, m} безопасно */
const parseHHMM = timeStr => {
  if (!timeStr) return { h: 0, m: 0 };
  const [hStr, mStr = '00'] = String(timeStr).split(':');
  const h = parseInt(hStr, 10);
  const m = parseInt(mStr, 10);
  return { h: Number.isNaN(h) ? 0 : h, m: Number.isNaN(m) ? 0 : m };
};

/** Склейка "YYYY-MM-DD" + "HH:MM" в локальный Date */
const getLessonStartDate = (dateISO, timeStr) => {
  if (!dateISO || !timeStr) return null;
  const { h, m } = parseHHMM(timeStr);
  const d = new Date(dateISO);
  if (Number.isNaN(d.getTime())) return null;
  d.setHours(h, m, 0, 0);
  return d;
};

/** Секунды -> "DD:HH:MM:SS" */
const formatDHMS = totalSeconds => {
  const sec = Math.max(0, Math.floor(totalSeconds));
  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec % 86400) / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = sec % 60;
  const pad = n => String(n).padStart(2, '0');
  return `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

/** Прибавляет часы к "HH:MM" */
const addHoursToTime = (timeStr, hoursToAdd = 0) => {
  if (!timeStr || typeof timeStr !== 'string') return '';
  const { h, m } = parseHHMM(timeStr);
  const minutes = h * 60 + m + Number(hoursToAdd || 0) * 60;
  const total = ((minutes % (24 * 60)) + 24 * 60) % (24 * 60);
  const hh = String(Math.floor(total / 60)).padStart(2, '0');
  const mm = String(total % 60).padStart(2, '0');
  return `${hh}:${mm}`;
};

export const BeforeLesson = () => {
  const navigate = useNavigate();
  const { accaunt } = useAccaunt();
  const dispatch = useDispatch();

  // из твоего слайса: schedule (array), listLoading, error
  const { schedule, listLoading, error } = useScheduleStudent();

  useEffect(() => {
    dispatch(scheduleStudentGet());
  }, [dispatch]);

  // Унифицированный доступ: вдруг придёт не массив, а объект
  const nextLesson = useMemo(() => {
    if (Array.isArray(schedule)) return schedule[0] ?? null;
    if (schedule && typeof schedule === 'object') return schedule;
    return null;
  }, [schedule]);

  // Текст "нет занятий" из error
  const noLessonsMsg = useMemo(() => {
    if (!error) return null;
    if (typeof error === 'object' && error !== null) {
      // ожидаем { detail: "Нет ближайших занятий" } или что-то похожее
      if ('detail' in error && typeof error.detail === 'string')
        return error.detail;
      // вдруг бэк отдал просто {message:"..."}
      if ('message' in error && typeof error.message === 'string')
        return error.message;
    }
    if (typeof error === 'string') return error;
    return 'Нет ближайших занятий';
  }, [error]);

  // initialTime для Countdown
  const countdownInitial = useMemo(() => {
    if (!nextLesson?.date || !nextLesson?.time) return '00:00:00:00';
    const startAt = getLessonStartDate(nextLesson.date, nextLesson.time);
    if (!startAt) return '00:00:00:00';
    const now = new Date();
    const diffSeconds = Math.floor((startAt.getTime() - now.getTime()) / 1000);
    return formatDHMS(Math.max(0, diffSeconds));
  }, [nextLesson?.date, nextLesson?.time]);

  // Время конца урока
  const endTime = useMemo(() => {
    if (!nextLesson?.time || nextLesson?.duration == null) return '';
    return addHoursToTime(nextLesson.time, Number(nextLesson.duration));
  }, [nextLesson?.time, nextLesson?.duration]);

  return (
    <section className='before_lesson'>
      <p className='before_lesson_user'>Hi, {accaunt?.first_name ?? 'User'}!</p>
      <h2 className='before_lesson_title'>Ближайшее занятие</h2>

      {/* Загрузка */}
      {listLoading && (
        <div className='before_lesson_info'>
          <div className='row before_lesson_info_header'>
            <h3>Загружаем…</h3>
          </div>
          <p className='before_lesson_info_text'>Пожалуйста, подождите.</p>
        </div>
      )}

      {/* Нет занятий / ошибка */}
      {!listLoading && noLessonsMsg && (
        <div className='before_lesson_info'>
          <div className='row before_lesson_info_header'>
            <h3>—</h3>
          </div>
          <p
            className='before_lesson_info_text'
            style={{ color: 'var(--danger, #ff6b6b)' }}
          >
            {noLessonsMsg}
          </p>
          <button
            onClick={() => navigate('/schedule')}
            className='before_lesson_info_button'
          >
            Открыть расписание
          </button>
        </div>
      )}

      {/* Есть ближайшее занятие */}
      {!listLoading && !noLessonsMsg && nextLesson && (
        <div className='before_lesson_info'>
          <div className='row before_lesson_info_header'>
            <h3>{nextLesson.direction ?? '—'}</h3>
            <Countdown initialTime={countdownInitial} />
          </div>

          <p className='before_lesson_info_text'>
            <span>Преподаватель: </span>
            {nextLesson.teacher ?? '—'}
          </p>

          <p className='before_lesson_info_text'>
            <span>Кабинет: </span>
            {typeof nextLesson.roomIndex === 'number'
              ? `30${nextLesson.roomIndex + 1}`
              : '—'}
          </p>

          <p className='before_lesson_info_text'>
            <span>Время: </span>
            {nextLesson.time ?? '—'}
            {nextLesson.time && endTime ? ` - ${endTime}` : ''}
          </p>

          <button
            onClick={() => navigate('/schedule')}
            className='before_lesson_info_button'
          >
            Открыть расписание
          </button>
        </div>
      )}
    </section>
  );
};
