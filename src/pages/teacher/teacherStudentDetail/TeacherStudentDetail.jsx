import { useParams } from 'react-router-dom';
import { useTabs } from '../../../app/store/reducers/tabSlice';
import {
  StudentPaymentHistory,
  StudentProfile,
  StudentSessionHistory,
} from '../../../entities';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { studentDetailGet } from '../../../app/store/teacher/studentList/studentListThunks';
import { useStudentList } from '../../../app/store/teacher/studentList/studentListSlice';

export const TeacherStudentDetail = () => {
  const tabId = 'teacherStudentTabs';
  const { id } = useParams();
  const dispatch = useDispatch();
  const { studentDetail } = useStudentList()
  console.log(studentDetail);
  

  const tabsState = useTabs();
  const activeTab = tabsState[tabId] ?? 0;
  const tabs = [
    { label: 'Профиль студента', content: <StudentProfile /> },
    { label: 'История занятий', content: <StudentSessionHistory /> },
    { label: 'История оплат', content: <StudentPaymentHistory /> },
  ];

  useEffect(() => {
    dispatch(studentDetailGet(id));
  }, [dispatch])
  return (
    <section>
      <div className='container'>{tabs[activeTab]?.content}</div>
    </section>
  );
};
