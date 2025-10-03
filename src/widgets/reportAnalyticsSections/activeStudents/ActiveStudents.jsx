import { useDispatch } from 'react-redux';
import { CircleProgress, VerticalProgress } from '../../../featurs';
import './activeStudents.scss';
import { useEffect } from 'react';
import { analyticGet } from '../../../app/store/admin/reportAnalytic/reportAnalyticThunks';
import { useReportAnalytic } from '../../../app/store/admin/reportAnalytic/reportAnalyticSlice';

export const ActiveStudents = () => {
  const dispatch = useDispatch();
  const { analytic } = useReportAnalytic();

  useEffect(() => {
    dispatch(analyticGet());
  }, [dispatch]);
  return (
    <section className='activeStudents'>
      <h2 className='activeStudents_title'>Количество активных учеников</h2>
      <p className='activeStudents_text'>Активные ученики на сегодня:</p>

      <div className='activeStudents_statistics'>
        <div className='activeStudents_statistics_header'>
          <h2 className='count_student'>
            {analytic.active_today ? analytic.active_today : '0'}
          </h2>

          <div className='row main_stistic'>
            <div className='activeStudents_statistics_header_text'>
              <p>
                Общая количество активных учеников на сегодня включая новые за
                неделю, перестали ходить, средний возраст.
              </p>
            </div>
            <div className='row activeStudents_statistics_header_progress'>
              <p className='first_text'>Новые за неделю:</p>
              <VerticalProgress
                progress={80}
                text={
                  analytic.new_this_week ? `+${analytic.new_this_week}` : '0'
                }
                width={'100px'}
                height={'400px'}
                border={'100px'}
                color={'#2DE920'}
              />
              <p className='second_text'>Перестали ходить:</p>
              <VerticalProgress
                progress={80}
                text={
                  analytic.left_this_week ? `-${analytic.left_this_week}` : '0'
                }
                width={'100px'}
                height={'400px'}
                border={'100px'}
                color={'#2DE920'}
              />
              <p className='third_text'>Средний возраст:</p>
              <VerticalProgress
                progress={80}
                text={analytic.avg_age ? (analytic.avg_age).toFixed(1) : '0'}
                width={'100px'}
                height={'400px'}
                color={'#2DE920'}
                border={'100px'}
              />
            </div>
          </div>
        </div>

        <div className='row activeStudents_statistics_lessons'>
          {analytic?.directions_distribution &&
            Object.entries(analytic.directions_distribution)?.map(
              ([subject, percentage]) => (
                <div className='row item' key={subject}>
                  <p>{subject}</p>
                  <CircleProgress
                    percentage={percentage}
                    radius={100}
                    stroke={30}
                    color={'#313131'}
                  />
                </div>
              )
            )}
        </div>
      </div>
    </section>
  );
};
