import { useDispatch } from 'react-redux';
import './reportCardStudent.scss';
import { setActiveTab, useTabs } from '../../../app/store/reducers/tabSlice';
import { ReportStudent, Statistics, Syllabus } from '../../../widgets';

export const ReportCardStudent = () => {
  const dispatch = useDispatch();
  const tabId = 'reportTableTabs';
  const tabsState = useTabs();
  const activeTab = tabsState[tabId] ?? 0;
  const tabs = [
    { label: 'Табель', content: <ReportStudent /> },
    { label: 'Учебный план', content: <Syllabus /> },
    { label: 'Статистика', content: <Statistics /> },
  ];
  return (
    <div className='container reportCardStudent'>
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
    </div>
  );
};
