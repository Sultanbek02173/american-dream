import './lessonsNow.scss';
import arrow from '../../../shared/imgs/admin/Arrow_up.svg';

export const LessonsNow = () => {
  return (
    <section className='lessonsNow'>
      <div className='row lessonsNow_header'>
        <p>
          Предстоящие занятия <span>(Сегодня)</span>
        </p>
        <p className='row link'>
          Открыть расписание <img src={arrow} alt='' />
        </p>
      </div>
      <div className='row shedule'>
        <div className='shedule_left'>
          <div className='row shedule_left_top'>
            <p className='lesson'>Английский</p>
            <p>Группа A3</p>
          </div>
          <div className='row shedule_left_bottom'>
            <p><span>Преп.</span> Алия К</p>
            <h2>10:00</h2>
          </div>
        </div>
        <div className='shedule_right'>
          <div className='row shedule_right_top'>
            <p className='lesson'>Ментальная арифметика</p>
            <p>Группа A3</p>
          </div>
          <div className='row shedule_right_bottom'>
            <p><span>Преп.</span> Руслан Т</p>
            <h2>10:00</h2>
          </div>
        </div>
      </div>

      <div className='last_shedule'>
        <div className='row last_shedule_top'>
          <p className='lesson'>Робототехника</p>
          <p>Группа R2</p>
        </div>
        <div className='row last_shedule_bottom'>
          <p><span>Преп.</span> Жанара Б</p>
          <h2>15:00</h2>
        </div>
      </div>
    </section>
  );
};
