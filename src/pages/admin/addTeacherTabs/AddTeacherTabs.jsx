import { useDispatch } from 'react-redux';
import { setActiveTab, useTabs } from '../../../app/store/reducers/tabSlice';
import { DataTeacher, TeacherPaymentType } from '../../../entities';
import './addTeacherTabs.scss';
import { useState } from 'react';
import { createTeacher } from '../../../app/store/admin/teacher/teacherThunk';
import { useNavigate } from 'react-router-dom';
export const AddTeacherTabs = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    age: '',
    phone: '',
    telegram: '',
    payment_type: 'fixed',
    payment_amount: '',
    payment_period: 'month',
    direction_ids: [],
    group_ids: [],
  });

  const dispatch = useDispatch();
  const tabId = 'addTeacherTabs';
  const tabsState = useTabs();
  const activeTab = tabsState[tabId] ?? 0;
  const navigate = useNavigate();

  const tabs = [
    {
      label: 'Информация',
      content: <DataTeacher formData={formData} setFormData={setFormData} />,
    },
    {
      label: 'Тип оплаты',
      content: (
        <TeacherPaymentType formData={formData} setFormData={setFormData} />
      ),
    },
  ];

  const handleSubmit = async () => {
    try {
      await dispatch(createTeacher(formData)).unwrap();
      navigate('/teacher-table');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section className='addTeacher'>
      <div className='container'>
        <div className='addTeacher__tabs'>
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => dispatch(setActiveTab({ tabId, index }))}
              className={`addTeacher__tabs-button ${
                index === activeTab ? 'active' : ''
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {tabs[activeTab]?.content}

        <div className='dataTeacher__row'>
          <button
            onClick={() => navigate('/teacher-table')}
            className='dataTeacher__row-button'
            type='button'
          >
            Отменить
          </button>
          <button
            className='dataTeacher__row-button add'
            onClick={handleSubmit}
          >
            Добавить
          </button>
        </div>
      </div>
    </section>
  );
};
