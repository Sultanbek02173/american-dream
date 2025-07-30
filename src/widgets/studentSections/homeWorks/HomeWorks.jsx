import { HomeWorkCard } from '../../../featurs';
import './homeWorks.scss';

export const HomeWorks = () => {
  const homeWorks = [
    {
      id: 1,
      user: 'Английский',
      title: 'Прочитать текст и ответить на вопросы',
      group: 'ENG-04',
      status: 'done',
    },
    {
      id: 2,
      user: 'Английский',
      title: 'Прочитать текст и ответить на вопросы',
      group: 'ENG-04',
      status: 'doesnot',
    },
    {
      id: 3,
      user: 'Английский',
      title: 'Прочитать текст и ответить на вопросы',
      group: 'ENG-04',
      status: 'error',
    },
    {
      id: 4,
      user: 'Английский',
      title: 'Прочитать текст и ответить на вопросы',
      group: 'ENG-04',
      status: 'error',
    },
  ];
  return (
    <section className='home_works'>
      {homeWorks.map(homeWork => (
        <HomeWorkCard
          user={homeWork.user}
          group={homeWork.group}
          lesson={homeWork.title}
          status={homeWork.status}
          key={homeWork.id}
        />
      ))}
    </section>
  );
};
