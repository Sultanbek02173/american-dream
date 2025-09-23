import { useDispatch } from 'react-redux';
import { Shedule } from '../../../widgets';
import { useScheduleAdmin } from '../../../app/store/admin/schedule/scheduleSlice';
import { scheduleGet } from '../../../app/store/admin/schedule/scheduleThunks';
import { useEffect } from 'react';

export const ScheduleTeacher = () => {
  const dispatch = useDispatch();
  const { schedule } = useScheduleAdmin();
  console.log(schedule);
  
  useEffect(() => {
    dispatch(scheduleGet());
  }, [dispatch]);
  return (
    <>
      <Shedule schedule={schedule} />
    </>
  );
};
