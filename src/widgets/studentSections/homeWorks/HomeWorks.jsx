import { useDispatch } from 'react-redux';
import { HomeWorkCard } from '../../../featurs';
import './homeWorks.scss';
import { useEffect } from 'react';
import { homeworkGet } from '../../../app/store/student/homeWork/homeworkThunks';
import { useHomework } from '../../../app/store/student/homeWork/homeworkSlice';

export const HomeWorks = () => {
  const dispatch = useDispatch();
  const { homework } = useHomework();
  console.log(homework);

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

  useEffect(() => {
    dispatch(homeworkGet());
  }, [dispatch]);
  return (
    <section className='home_works'>
      {homework?.map(homeWork => (
        <HomeWorkCard
          user={homeWork.title}
          group={homeWork.group}
          lesson={homeWork.description}
          status={homeWork.status}
          key={homeWork.id}
        />
      ))}
    </section>
  );
};
