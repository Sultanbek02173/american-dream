import './beforeLesson.scss';

export const BeforeLesson = () => {
  return (
    <section className='before_lesson'>
      <p className='before_lesson_user'>Hi, Айдана!</p>
      <h2 className='before_lesson_title'>Ближайшее занятие</h2>

      <div className='before_lesson_info'>
        <div className='row before_lesson_info_header'>
          <h3>Английский</h3>
          <h2>00:23:15:09</h2>
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

        <button className='before_lesson_info_button'>
          Открыть расписание
        </button>
      </div>
    </section>
  );
};
