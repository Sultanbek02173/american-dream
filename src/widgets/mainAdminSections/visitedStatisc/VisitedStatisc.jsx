import { useAdminHome } from '../../../app/store/admin/homeAdmin/homeAdminSlice';
import { CircleProgress } from '../../../featurs';
import './visitedStatisc.scss';

export const VisitedStatisc = () => {
  const { dashBoard } = useAdminHome();
  return (
    <section className='visitedStatisc'>
      <div className='row visitedStatisc_header'>
        <p>Общая посещаемость</p>
        <p className='day'>(Сегодня)</p>
      </div>
      <div className='row lessons'>
        <div className='lessons_left'>
          <div className='row lessons_left_top'>
            <p>Всего занятий:</p>
            <h3>{dashBoard?.attendance_stats?.total_lessons}</h3>
          </div>
          <div className='line'></div>
          <div className='row lessons_left_bottom'>
            <p>Учащихся всего:</p>
            <h3>{dashBoard?.attendance_stats?.total_students}</h3>
          </div>
        </div>
        <div className='row lessons_right'>
          <div className='lessons_right_text'>
            <p>Присутствовали:</p>
            <h3>{dashBoard?.attendance_stats?.present}</h3>
          </div>
          <div className='lessons_right_progress'>
            <CircleProgress
              percentage={dashBoard?.attendance_stats?.present_percent}
              radius={90}
              stroke={30}
              color={'#2DE920'}
            />
          </div>
        </div>
      </div>
      <div className='row check_students'>
        <div className='row check_students_right'>
          <div className='check_students_right_text'>
            <p>Онлайн:</p>
            <h3>{dashBoard?.attendance_stats?.online}</h3>
          </div>
          <div className='check_students_right_progress'>
            <CircleProgress
              percentage={dashBoard?.attendance_stats?.online_percent}
              radius={90}
              stroke={30}
              color={'#2DE920'}
            />
          </div>
        </div>
        <div className='row check_students_left'>
          <div className='check_students_left_text'>
            <p>Отсутствуют:</p>
            <h3>{dashBoard?.attendance_stats?.absent}</h3>
          </div>
          <div className='check_students_left_progress'>
            <CircleProgress
              percentage={dashBoard?.attendance_stats?.absent_percent}
              radius={90}
              stroke={30}
              color={'#2DE920'}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
