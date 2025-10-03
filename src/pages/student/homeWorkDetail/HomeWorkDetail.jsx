import { useParams } from 'react-router-dom';
import './homeWorkDetail.scss';
import { RecordLesson, Works } from '../../../widgets';
import { setActiveTab, useTabs } from '../../../app/store/reducers/tabSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { homeworkDetailGet } from '../../../app/store/student/homeWork/homeworkThunks';
import { useHomework } from '../../../app/store/student/homeWork/homeworkSlice';

export const HomeWorkDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const tabId = 'reportTableTabs';
  const tabsState = useTabs();
  const activeTab = tabsState[tabId] ?? 0;
  const { homeworkDetail } = useHomework();
  console.log(homeworkDetail);
  

  useEffect(() => {
    dispatch(homeworkDetailGet(id));
  }, [dispatch])

  const tabs = [
    {
      label: 'Запись урока',
      content: <RecordLesson lessonLink={homeworkDetail?.lesson_recording} />,
    },
    {
      label: 'Домашнее задание',
      content: (
        <Works
          id={id}
          deadLine={homeworkDetail?.homework_deadline}
          homework_requirements={homeworkDetail?.homework_requirements}
          link={homeworkDetail?.homework_submission?.project_links}
          file={homeworkDetail?.homework_submission?.files}
        />
      ),
    },
  ];
  return (
    <section className='container home-work-detail'>
      <h2 className='title'>Урок №{id}</h2>
      <p className='description'>{homeworkDetail?.title ?? '...'}</p>

      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => dispatch(setActiveTab({ tabId, index }))}
          className={`addTeacher__tabs-button ${
            index === activeTab && 'active'
          }`}
        >
          {tab.label}
        </button>
      ))}
      {tabs[activeTab]?.content}
    </section>
  );
};
