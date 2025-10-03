import { useTabs } from '../../../app/store/reducers/tabSlice';
import {
  StudentPaymentHistory,
  StudentProfile,
  StudentSessionHistory,
} from '../../../entities';
import './studentsDetail.scss';

export const StudentsDetail = () => {
  const tabId = 'applicationTabs';
  const tabsState = useTabs();
  const activeTab = tabsState[tabId] ?? 0;
  const tabs = [
    { label: 'Профиль студента', content: <StudentProfile /> },
    { label: 'История занятий', content: <StudentSessionHistory /> },
    { label: 'История оплат', content: <StudentPaymentHistory /> },
  ];

  return (
    <section className='studentsDetail'>
      <div className='container'>{tabs[activeTab]?.content}</div>
    </section>
  );
};
