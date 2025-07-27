import { useDispatch } from 'react-redux';
import { setActiveTab, useTabs } from '../../../app/store/reducers/tabSlice';
import {
  DataTeacher,
  DataTeacherDetail,
  TeacherPaymentType,
  TeacherPaymentTypeData,
} from '../../../entities';
import { data } from '../studentsTable/StudentsTable';
import { useParams } from 'react-router-dom';
export const TeacherDetail = () => {
  const { id } = useParams();
  const detail = data.find(item => item.id == id);
  console.log(detail);

  const dispatch = useDispatch();
  const tabId = 'teacherDetailTabs';
  const tabsState = useTabs();
  const activeTab = tabsState[tabId] ?? 0;
  const tabs = [
    { label: 'Информация', content: <DataTeacherDetail detail={detail} /> },
    { label: 'Тип оплаты', content: <TeacherPaymentTypeData /> },
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
