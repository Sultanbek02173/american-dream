import React from 'react';
import { Radio, TextField } from '@mui/material';
import { useState } from 'react';
import bilol from '../../../admin/studentsDetail/image.jpg';
import { eventHandler } from '../../../../shared/utils/eventHandlers';
import { inputStyle } from '../../../../shared/utils/MuiStyles';
import { FixedRate, HourlyRate } from '../../../../entities';
import { useDispatch } from 'react-redux';
import { useTabs } from '../../../../app/store/reducers/tabSlice';

// import { eventHandler } from '../../../../shared/utils/eventHandlers';
// import { inputStyle } from '../../../../shared/utils/MuiStyles';
export const CreateNewGroupSchedule = () => {
  const [state, setState] = useState({
    id: 1,
    course_name: 'Алина',
    planned_start: '@alin1244',
    per_month: '+996 500 123 456',
    duration: 'alinaknzzz12',
    per_week: 'r_12lfomt',
    comment: 'mentalArithmetic',
  });
  const [selectedValue, setSelectedValue] = useState(1);
  const dispatch = useDispatch();
  const tabId = 'distributeClasses';
  const tabsState = useTabs();
  const activeTab = tabsState[tabId] ?? 0;
  const handleChange = event => {
    setSelectedValue(Number(event.target.value));
  };

  const tabs = [
    { id: 1, label: 'Автоматический', content: '' },
    {
      id: 2,
      label: 'В ручную',
      content: (
        <div className='dataTeacher__row'>
          <button className='dataTeacher__row-button' type='button'>
            Сбросить
          </button>
          <button className='dataTeacher__row-button add'>
            Перейти в расписанию
          </button>
        </div>
      ),
    },
  ];

  const onChange = eventHandler(setState);

  const controlProps = item => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });
  const currentTab = tabs.find(tab => tab.id === selectedValue);
  return (
    <form className='createGroupSchedule' onSubmit={e => e.preventDefault()}>
      <div className='studentsDetail__form-inputs'>
        <TextField
          label='Планируемое начало'
          name='planned_start'
          onChange={onChange}
          value={state.planned_start}
          variant='outlined'
          sx={{ ...inputStyle, width: '55%' }}
        />
        <TextField
          label='В месяц'
          name='per_month'
          onChange={onChange}
          value={state.per_month}
          variant='outlined'
          sx={{ ...inputStyle, width: '45%' }}
        />
      </div>
      <div className='studentsDetail__form-inputs'>
        <TextField
          label='Продолжительность занятия'
          name='duration'
          onChange={onChange}
          value={state.duration}
          variant='outlined'
          sx={{ ...inputStyle, width: '45%' }}
        />
        <TextField
          label='В неделю'
          name='per_week'
          onChange={onChange}
          value={state.per_week}
          variant='outlined'
          sx={{ ...inputStyle, width: '55%' }}
        />
      </div>
      <h2 className='createGroupSchedule__title'>Распределить занятий</h2>
      <div className='paymentType__tabs'>
        <div className='paymentType__tabs-item'>
          <Radio
            {...controlProps(1)}
            sx={{
              color: '#fff',
              '&.Mui-checked': {
                color: '#2DE920',
              },
            }}
          />
          <p>Автоматический</p>
        </div>
        <div className='paymentType__tabs-item'>
          <Radio
            {...controlProps(2)}
            sx={{
              color: '#fff',
              '&.Mui-checked': {
                color: '#2DE920',
              },
            }}
          />
          <p>В ручную</p>
        </div>
      </div>
      {currentTab?.content}
    </form>
  );
};
