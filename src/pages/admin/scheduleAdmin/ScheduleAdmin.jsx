import { useDispatch } from 'react-redux';
import { Shedule } from '../../../widgets';
import './scheduleAdmin.scss';
import { useEffect } from 'react';
import {
  scheduleGet,
  schedulePost,
} from '../../../app/store/admin/schedule/scheduleThunks';
import { useScheduleAdmin } from '../../../app/store/admin/schedule/scheduleSlice';
import { toast } from 'react-toastify';

const extractErrorMessage = err => {
  if (!err) return 'Неизвестная ошибка';

  const data = (err && err.response && err.response.data) || err.data || err;

  if (typeof data === 'string') return data;
  if (Array.isArray(data)) return data.join('\n');

  if (data && typeof data === 'object') {
    if (data.detail) return String(data.detail);

    try {
      return Object.entries(data)
        .map(([k, v]) => {
          if (Array.isArray(v)) return `${k}: ${v.join(', ')}`;
          if (v && typeof v === 'object') {
            const flat = Object.values(v).flat
              ? Object.values(v).flat()
              : [].concat(...Object.values(v));
            return `${k}: ${flat.join(', ')}`;
          }
          return `${k}: ${String(v)}`;
        })
        .join('\n');
    } catch (e) {
    }
  }

  return err.message || 'Ошибка запроса';
};

export const ScheduleAdmin = () => {
  const dispatch = useDispatch();
  const { schedule } = useScheduleAdmin();

  const createSchedule = async data => {
    const newSchedule = {
      classroom_id: data.classroom_id,
      group: data.group,
      start_time: `${data.time}:00`,
      end_time: `${data.time + data.duration}:00`,
      date: data.date,
      note: data.note,
      teacher: data.teacher,
    };

    try {
      await dispatch(schedulePost(newSchedule)).unwrap();
      toast.success('Расписание создано');
      dispatch(scheduleGet());
    } catch (err) {
      const msg = extractErrorMessage(err);
      toast.error(msg || 'Ошибка при создании расписания');
      console.error('Ошибка при создании расписания:', err);
    }
  };

  useEffect(() => {
    dispatch(scheduleGet());
  }, [dispatch]);

  return <Shedule schedule={schedule} createSchedule={createSchedule} />;
};
