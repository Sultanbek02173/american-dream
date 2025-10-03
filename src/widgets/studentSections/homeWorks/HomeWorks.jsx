import { useDispatch } from 'react-redux';
import { HomeWorkCard } from '../../../featurs';
import './homeWorks.scss';
import { useEffect } from 'react';
import { homeworkGet } from '../../../app/store/student/homeWork/homeworkThunks';
import { useHomework } from '../../../app/store/student/homeWork/homeworkSlice';
import { Link } from 'react-router-dom';

export const HomeWorks = () => {
  const dispatch = useDispatch();
  const { homework } = useHomework();

  console.log(homework);

  useEffect(() => {
    dispatch(homeworkGet());
  }, [dispatch]);
  return (
    <section className='home_works'>
      {homework?.slice(0, 6)?.map(homeWork => (
        <Link key={homeWork?.id} to={`/home-work/${homeWork?.id}`}>
          <HomeWorkCard
            user={homeWork?.teacher_full_name}
            group={homeWork?.group_name}
            lesson={homeWork?.description}
            status={homeWork?.homework_submission?.status}
          />
        </Link>
      ))}
    </section>
  );
};
