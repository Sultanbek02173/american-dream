import { useEffect } from 'react';
import { Shedule } from '../../../widgets';
import { useDispatch } from 'react-redux';
import { useScheduleAdmin } from '../../../app/store/admin/schedule/scheduleSlice';
import { scheduleGet } from '../../../app/store/admin/schedule/scheduleThunks';

export const ScheduleStudent = () => {
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
