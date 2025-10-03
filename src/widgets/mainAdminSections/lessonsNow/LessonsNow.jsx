import './lessonsNow.scss';
import arrow from '../../../shared/imgs/admin/Arrow_up.svg';
import { NavLink } from 'react-router-dom';
import { useAdminHome } from '../../../app/store/admin/homeAdmin/homeAdminSlice';

export const LessonsNow = () => {
  const { dashBoard } = useAdminHome();
  return (
    <section className='lessonsNow'>
      <div className='row lessonsNow_header'>
        <p>
          Предстоящие занятия <span>(Сегодня)</span>
        </p>
        <NavLink to={'/schedule'}>
          <p className='row link'>
            Открыть расписание <img src={arrow} alt='' />
          </p>
        </NavLink>
      </div>
      <div className='row shedule'>
        {dashBoard?.upcoming_classes &&
          dashBoard?.upcoming_classes?.slice(0, 2).map((lesson, indx) => (
            <div key={indx} className='shedule_left'>
              <div className='row shedule_left_top'>
                <p className='lesson'>{lesson.group__direction__name}</p>
                <p>{lesson.group__group_name}</p>
              </div>
              <div className='row shedule_left_bottom'>
                <p>
                  <span>Преп.</span>{' '}
                  {lesson.teacher__last_name.split('-').slice(0, 1)}{' '}
                  {lesson.teacher__first_name.slice(0, 1)}.
                </p>
                <h2>{lesson.start_time.split(':').slice(0, 2).join(':')}</h2>
              </div>
            </div>
          ))}
      </div>
      {dashBoard?.upcoming_classes && dashBoard?.upcoming_classes[2] && (
        <div className='last_shedule'>
          <div className='row last_shedule_top'>
            <p className='lesson'>
              {dashBoard?.upcoming_classes[2]?.group__direction__name}
            </p>
            <p>{dashBoard?.upcoming_classes[2]?.group__group_name}</p>
          </div>
          <div className='row last_shedule_bottom'>
            <p>
              <span>Преп.</span>{' '}
              {dashBoard?.upcoming_classes[2]?.teacher__last_name
                .split('-')
                .slice(0, 1)}{' '}
              {dashBoard?.upcoming_classes[2]?.teacher__first_name.slice(0, 1)}.
            </p>
            <h2>
              {dashBoard?.upcoming_classes[2]?.start_time
                .split(':')
                .slice(0, 2)
                .join(':')}
            </h2>
          </div>
        </div>
      )}
    </section>
  );
};
