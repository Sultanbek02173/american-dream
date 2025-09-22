// CreateNewGroupsTabs.jsx
import { useDispatch } from 'react-redux';
import { setActiveTab, useTabs } from '../../../app/store/reducers/tabSlice';
import { CreateNewGroupCompletion } from './CreateNewGroupCompletion/CreateNewGroupCompletion';
import { CreateNewGroupData } from './CreateNewGroupData/CreateNewGroupData';
import { CreateNewGroupSchedule } from './CreateNewGroupSchedule/CreateNewGroupSchedule';
import { CreateNewGroupStudents } from './CreateNewGroupStudents/CreateNewGroupStudents';
import './createNewGroupTabs.scss';
import { useState, useCallback } from 'react';
import { createGroup } from '../../../app/store/admin/report/reportThunk';
import { useNavigate } from 'react-router-dom';

export const CreateNewGroupsTabs = () => {
  const [state, setState] = useState({
    group_name: '',
    age_group: '',
    format: '',
    duration_months: '', // общая длительность курса (мес)
    comment: '',
    planned_start: '', // планируемое начало
    lessons_per_month: '',
    lesson_duration: '', // мин/час — как у вас в ТЗ
    lessons_per_week: '',
    schedule_days: '', // строка или массив — по вашему бекенду
    direction: '', // id направления
    teacher: null, // id преподавателя
    students: [], // [id, id, ...]
  });

  const handleChange = useCallback((name, value) => {
    setState(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleBatchChange = useCallback(patch => {
    setState(prev => ({ ...prev, ...patch }));
  }, []);

  const addStudent = useCallback(id => {
    setState(prev =>
      prev.students.includes(id)
        ? prev
        : { ...prev, students: [...prev.students, id] }
    );
  }, []);

  const removeStudent = useCallback(id => {
    setState(prev => ({
      ...prev,
      students: prev.students.filter(sid => sid !== id),
    }));
  }, []);

  const resetAll = () => {
    setState({
      group_name: '',
      age_group: '',
      format: '',
      duration_months: '',
      comment: '',
      planned_start: '',
      lessons_per_month: '',
      lesson_duration: '',
      lessons_per_week: '',
      schedule_days: '',
      direction: '',
      teacher: null,
      students: [],
    });
  };
  const navigate = useNavigate();

  const onCreate = async () => {
    try {
      await dispatch(createGroup(state)).unwrap();
      navigate('/report-table');
    } catch (e) {
      console.log(e);
    }
  };

  const dispatch = useDispatch();
  const tabId = 'createNewGroup';
  const tabsState = useTabs();
  const activeTab = tabsState[tabId] ?? 0;

  const tabs = [
    {
      label: 'Данные',
      content: (
        <CreateNewGroupData
          value={state}
          onChange={handleChange}
          onBatchChange={handleBatchChange}
        />
      ),
    },
    {
      label: 'Расписание',
      content: (
        <CreateNewGroupSchedule
          value={state}
          onChange={handleChange}
          onBatchChange={handleBatchChange}
        />
      ),
    },
    {
      label: 'Ученики',
      content: (
        <CreateNewGroupStudents
          teacher={state.teacher}
          setTeacher={id => handleChange('teacher', id)}
          selectedStudents={state.students}
          addStudent={addStudent}
          removeStudent={removeStudent}
        />
      ),
    },
    {
      label: 'Завершение',
      content: (
        <CreateNewGroupCompletion
          value={state}
          onReset={resetAll}
          onCreate={onCreate}
        />
      ),
    },
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
