import { useNavigate } from 'react-router-dom';
import './beforeLesson.scss';
import { Countdown } from '../../../entities';
import { useAccaunt } from '../../../app/store/reducers/accaunt/accauntSlice';

export const BeforeLesson = () => {
  const navigate = useNavigate();
  const { accaunt } = useAccaunt();

  return (
    <section className='before_lesson'>
      <p className='before_lesson_user'>Hi, {accaunt?.first_name ?? 'User'}!</p>
      <h2 className='before_lesson_title'>Ближайшее занятие</h2>

      <div className='before_lesson_info'>
        <div className='row before_lesson_info_header'>
          <h3>Английский</h3>
          <Countdown initialTime='00:23:15:09' />
        </div>
        <p className='before_lesson_info_text'>
          <span>Преподаватель: </span>Жаныбек уулу Руслан
        </p>
        <p className='before_lesson_info_text'>
          <span>Кабинет: </span>304
        </p>
        <p className='before_lesson_info_text'>
          <span>Время: </span>Вторник, 15:00 – 17:00
        </p>

        <button
          onClick={() => navigate('/schedule')}
          className='before_lesson_info_button'
        >
          Открыть расписание
        </button>
      </div>
    </section>
  );
};
