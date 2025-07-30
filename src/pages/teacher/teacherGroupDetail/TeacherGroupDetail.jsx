import { useDispatch } from 'react-redux';
import { setActiveTab, useTabs } from '../../../app/store/reducers/tabSlice';
import {
  ReportTableData,
  ReportTableHomeWork,
  ReportTableInTable,
  ReportTablePlan,
  ReportTableStatistic,
  ReportTableStudents,
} from '../../../entities/reportTableTabs';
// import './reportTableDetail.scss';
export const TeacherGroupDetail = () => {
  const dispatch = useDispatch();
  const tabId = 'reportTableTabs';
  const tabsState = useTabs();
  const activeTab = tabsState[tabId] ?? 0;
  const tabs = [
    { label: 'Данные', content: <ReportTableData /> },
    { label: 'Ученики', content: <ReportTableStudents /> },
    { label: 'Планы обучения', content: <ReportTablePlan /> },
    { label: 'Дз', content: <ReportTableHomeWork /> },
    { label: 'Табель', content: <ReportTableInTable /> },
    { label: 'Статистика', content: <ReportTableStatistic /> },
  ];
  return (
    <section className='reportTableDetail'>
      <div className='container'>
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
    </section>
  );
};
