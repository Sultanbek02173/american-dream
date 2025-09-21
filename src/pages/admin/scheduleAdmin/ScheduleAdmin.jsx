import { useDispatch } from 'react-redux';
import { Shedule } from '../../../widgets';
import './scheduleAdmin.scss';
import { useEffect } from 'react';
import {
  scheduleGet,
  schedulePost,
} from '../../../app/store/admin/schedule/scheduleThunks';
import { useScheduleAdmin } from '../../../app/store/admin/schedule/scheduleSlice';

export const ScheduleAdmin = () => {
  const dispatch = useDispatch();
  const { schedule } = useScheduleAdmin();

  const createSchedule = data => {
    const newSchedule = {
      classroom_id: data.classroom_id,
      group: data.group,
      start_time: `${data.time}:00`,
      end_time: `${data.time + data.duration - 1}:00`,
      date: data.date,
      note: data.note,
      teacher: data.teacher,
      group: data.group,
    };
    dispatch(schedulePost(newSchedule))
      .unwrap()
      .then(() => {
        dispatch(scheduleGet());
      })
      .catch(err => {
        console.error('Ошибка при создании расписания:', err);
      });
  };

  useEffect(() => {
    dispatch(scheduleGet());
  }, [dispatch]);
  return (
    <>
      <Shedule schedule={schedule} createSchedule={createSchedule} />
    </>
  );
};
