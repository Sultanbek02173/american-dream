import { useEffect } from 'react';
import { useHomework } from '../../../app/store/student/homeWork/homeworkSlice';
import { HomeWorkCard } from '../../../featurs';
import './homeWork.scss';
import { useNavigate } from 'react-router-dom';
import { homeworkGet } from '../../../app/store/student/homeWork/homeworkThunks';
import { useDispatch } from 'react-redux';

export const HomeWork = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { homework } = useHomework();

  useEffect(() => {
    dispatch(homeworkGet());
  }, [dispatch]);
  return (
    <div className='container home_work'>
      <h2 className='title'>Домашние задания</h2>
      <div className='home_work__content'>
        {homework?.map(homeWork => (
          <div
            onClick={() =>
              navigate(`/home-work/${homeWork?.id}`)
            }
            key={homeWork?.id}
          >
            <HomeWorkCard
              user={homeWork?.teacher_full_name}
              group={homeWork?.group_name}
              lesson={homeWork?.description}
              status={homeWork?.homework_submission?.status}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
