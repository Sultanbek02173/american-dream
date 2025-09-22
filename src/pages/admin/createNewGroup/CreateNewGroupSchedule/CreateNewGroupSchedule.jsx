// CreateNewGroupSchedule.jsx
import { Radio, TextField } from '@mui/material';
import { useState } from 'react';
import { inputStyle } from '../../../../shared/utils/MuiStyles';

export const CreateNewGroupSchedule = ({ value, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(1);
  const handle = e => onChange(e.target.name, e.target.value);

  const controlProps = item => ({
    checked: selectedValue === item,
    onChange: e => setSelectedValue(Number(e.target.value)),
    value: item,
    name: 'distribute-mode',
    inputProps: { 'aria-label': item },
  });

  return (
    <form className='createGroupSchedule' onSubmit={e => e.preventDefault()}>
      <div className='studentsDetail__form-inputs'>
        <TextField
          label='Планируемое начало'
          name='planned_start'
          onChange={handle}
          value={value.planned_start}
          variant='outlined'
          sx={{ ...inputStyle, width: '55%' }}
        />
        <TextField
          label='Занятий в месяц'
          name='lessons_per_month'
          type='number'
          onChange={handle}
          value={value.lessons_per_month}
          variant='outlined'
          sx={{ ...inputStyle, width: '45%' }}
        />
      </div>

      <div className='studentsDetail__form-inputs'>
        <TextField
          label='Длительность занятия (мин)'
          name='lesson_duration'
          type='number'
          onChange={handle}
          value={value.lesson_duration}
          variant='outlined'
          sx={{ ...inputStyle, width: '45%' }}
        />
        <TextField
          label='Занятий в неделю'
          name='lessons_per_week'
          type='number'
          onChange={handle}
          value={value.lessons_per_week}
          variant='outlined'
          sx={{ ...inputStyle, width: '55%' }}
        />
      </div>

      <div className='studentsDetail__form-inputs'>
        <TextField
          label='Дни недели (через запятую)'
          name='schedule_days'
          onChange={handle}
          value={value.schedule_days}
          variant='outlined'
          sx={{ ...inputStyle, width: '100%' }}
        />
      </div>

      <h2 className='createGroupSchedule__title'>Распределить занятия</h2>
      <div className='paymentType__tabs'>
        <div className='paymentType__tabs-item'>
          <Radio
            {...controlProps(1)}
            sx={{ color: '#fff', '&.Mui-checked': { color: '#2DE920' } }}
          />
          <p>Автоматический</p>
        </div>
        <div className='paymentType__tabs-item'>
          <Radio
            {...controlProps(2)}
            sx={{ color: '#fff', '&.Mui-checked': { color: '#2DE920' } }}
          />
          <p>Вручную</p>
        </div>
      </div>

      {selectedValue === 2 && (
        <div className='dataTeacher__row'>
          <button className='dataTeacher__row-button' type='button'>
            Сбросить
          </button>
          <button className='dataTeacher__row-button add' type='button'>
            Перейти к расписанию
          </button>
        </div>
      )}
    </form>
  );
};
