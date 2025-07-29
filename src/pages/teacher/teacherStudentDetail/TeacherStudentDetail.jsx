import React from 'react';
import { useTabs } from '../../../app/store/reducers/tabSlice';
import {
  StudentPaymentHistory,
  StudentProfile,
  StudentSessionHistory,
} from '../../../entities';

export const TeacherStudentDetail = () => {
  const tabId = 'teacherStudentTabs';

  const tabsState = useTabs();
  const activeTab = tabsState[tabId] ?? 0;
  const tabs = [
    { label: 'Профиль студента', content: <StudentProfile /> },
    { label: 'История занятий', content: <StudentSessionHistory /> },
    { label: 'История оплат', content: <StudentPaymentHistory /> },
  ];
  return (
    <section>
      <div className='container'>{tabs[activeTab]?.content}</div>
    </section>
  );
};
