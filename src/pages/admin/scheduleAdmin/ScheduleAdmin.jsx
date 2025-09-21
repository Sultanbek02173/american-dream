import { useDispatch } from 'react-redux';
import { Shedule } from '../../../widgets';
import './scheduleAdmin.scss';
import { useEffect } from 'react';
import { scheduleGet, schedulePost } from '../../../app/store/admin/schedule/scheduleThunks';
import { useScheduleAdmin } from '../../../app/store/admin/schedule/scheduleSlice';

export const ScheduleAdmin = () => {
  const dispatch = useDispatch();
  const { schedule } = useScheduleAdmin();

  const createSchedule = (data) => {
    dispatch(schedulePost(data));
  }

  useEffect(() => {
    dispatch(scheduleGet());
  }, [dispatch]);
  return (
    <>
      <Shedule schedule={schedule} createSchedule={createSchedule} />
    </>
  );
};
