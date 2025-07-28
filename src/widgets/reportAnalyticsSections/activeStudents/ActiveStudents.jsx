import { CircleProgress, VerticalProgress } from '../../../featurs';
import './activeStudents.scss';

export const ActiveStudents = () => {
  return (
    <section className='activeStudents'>
      <h2 className='activeStudents_title'>Количество активных учеников</h2>
      <p className='activeStudents_text'>Активные ученики на сегодня:</p>

      <div className='activeStudents_statistics'>
        <div className='activeStudents_statistics_header'>
          <h2 className='count_student'>142</h2>

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
                text={'+12'}
                width={'100px'}
                height={'400px'}
                border={'100px'}
              />
              <p className='second_text'>Перестали ходить:</p>
              <VerticalProgress
                progress={80}
                text={'-4'}
                width={'100px'}
                height={'400px'}
                border={'100px'}
              />
              <p className='third_text'>Средний возраст:</p>
              <VerticalProgress
                progress={80}
                text={'13.7 лет'}
                width={'100px'}
                height={'400px'}
                border={'100px'}
              />
            </div>
          </div>
        </div>

        <div className='row activeStudents_statistics_lessons'>
          <div className='row item'>
            <p>Английский</p>
            <CircleProgress
              percentage={45}
              radius={100}
              stroke={30}
              color={'#313131'}
            />
          </div>
          <div className='row item'>
            <p>Математика</p>
            <CircleProgress
              percentage={30}
              radius={100}
              stroke={30}
              color={'#313131'}
            />
          </div>
          <div className='row item'>
            <p>Робототехника</p>
            <CircleProgress
              percentage={25}
              radius={100}
              stroke={30}
              color={'#313131'}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
