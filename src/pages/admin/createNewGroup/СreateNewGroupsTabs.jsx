import { useDispatch } from 'react-redux';
import { setActiveTab, useTabs } from '../../../app/store/reducers/tabSlice';
import { CreateNewGroupCompletion } from './CreateNewGroupCompletion/CreateNewGroupCompletion';
import { CreateNewGroupData } from './CreateNewGroupData/CreateNewGroupData';
import { CreateNewGroupSchedule } from './CreateNewGroupSchedule/CreateNewGroupSchedule';
import { CreateNewGroupStudents } from './CreateNewGroupStudents/CreateNewGroupStudents';
import './createNewGroupTabs.scss';

export const СreateNewGroupsTabs = () => {
  const dispatch = useDispatch();
  const tabId = 'createNewGroup';
  const tabsState = useTabs();
  const activeTab = tabsState[tabId] ?? 0;
  const tabs = [
    { label: 'Данные', content: <CreateNewGroupData /> },
    { label: 'Расписание', content: <CreateNewGroupSchedule /> },
    { label: 'Ученики', content: <CreateNewGroupStudents /> },
    { label: 'Завершение', content: <CreateNewGroupCompletion /> },
  ];
  return (
    <section className='createNewGroup'>
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
