import { useDispatch } from 'react-redux';
import { setActiveTab, useTabs } from '../../../app/store/reducers/tabSlice';
import { DataTeacher, TeacherPaymentType } from '../../../entities';
import './addTeacherTabs.scss';
export const AddTeacherTabs = () => {
  const dispatch = useDispatch();
  const tabId = 'addTeacherTabs';
  const tabsState = useTabs();
  const activeTab = tabsState[tabId] ?? 0;
  const tabs = [
    { label: 'Информация', content: <DataTeacher /> },
    { label: 'Тип оплаты', content: <TeacherPaymentType /> },
  ];

  return (
    <section className='addTeacher'>
      <div className='container'>
        <div className='addTeacher__tabs'>
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
        </div>

        {tabs[activeTab]?.content}
      </div>
    </section>
  );
};
