import { CircleProgress } from '../../../featurs';
import './visitedStatisc.scss';

export const VisitedStatisc = () => {
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
            <h3>12</h3>
          </div>
          <div className='line'></div>
          <div className='row lessons_left_bottom'>
            <p>Учащихся всего:</p>
            <h3>72</h3>
          </div>
        </div>
        <div className='row lessons_right'>
          <div className='lessons_right_text'>
            <p>Присутствовали:</p>
            <h3>59</h3>
          </div>
          <div className='lessons_right_progress'>
            <CircleProgress percentage={82} radius={90} stroke={30} />
          </div>
        </div>
      </div>
      <div className='row check_students'>
        <div className='row check_students_right'>
          <div className='check_students_right_text'>
            <p>Присутствовали:</p>
            <h3>5</h3>
          </div>
          <div className='check_students_right_progress'>
            <CircleProgress percentage={82} radius={90} stroke={30} />
          </div>
        </div>
        <div className='row check_students_left'>
          <div className='check_students_left_text'>
            <p>Присутствовали:</p>
            <h3>8</h3>
          </div>
          <div className='check_students_left_progress'>
            <CircleProgress percentage={82} radius={90} stroke={30} />
          </div>
        </div>
      </div>
    </section>
  );
};
