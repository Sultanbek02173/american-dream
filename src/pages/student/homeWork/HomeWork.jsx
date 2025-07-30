import { HomeWorkCard } from '../../../featurs';
import './homeWork.scss';
import { useNavigate } from 'react-router-dom';

export const HomeWork = () => {
  const navigate = useNavigate();
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
    <div className='container home_work'>
      <h2 className='title'>Домашние задания</h2>
      <div className='home_work__content'>
        {homeWorks.map(homeWork => (
          <div
            onClick={() => navigate(`/home-work/${homeWork.id}`)}
            key={homeWork.id}
          >
            <HomeWorkCard
              user={homeWork.user}
              group={homeWork.group}
              lesson={homeWork.title}
              status={homeWork.status}
              key={homeWork.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
