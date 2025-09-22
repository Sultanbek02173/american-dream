// CreateNewGroupCompletion.jsx
import { Checkbox } from '@mui/material';
import React from 'react';

const isFilled = v => Boolean(v && String(v).trim().length);
const isPositive = n => Number(n) > 0;

export const CreateNewGroupCompletion = ({ value, onReset, onCreate }) => {
  const checks = {
    hasGroupData:
      isFilled(value.group_name) &&
      isFilled(value.age_group) &&
      isFilled(value.format) &&
      Number(value.duration_months) >= 0 &&
      isFilled(value.comment) !== undefined, // коммент можно и пустой, по желанию

    hasTeacher: value.teacher != null,

    hasStudents: Array.isArray(value.students) && value.students.length > 0,

    hasPlan:
      isFilled(value.planned_start) &&
      isPositive(value.lesson_duration) &&
      isPositive(value.lessons_per_week),

    hasSchedule:
      isPositive(value.lessons_per_month) && isFilled(value.schedule_days),
  };

  const allReady = Object.values(checks).every(Boolean);

  return (
    <form className='createGroupCompletion' onSubmit={e => e.preventDefault()}>
      <h2 className='createGroupSchedule__title'>Последний шаг</h2>
      <div className='row1'>
        <div className='col-4'>
          <div className='paymentType__tabs-item'>
            <Checkbox
              checked={checks.hasGroupData}
              sx={{ color: '#fff', '&.Mui-checked': { color: '#2DE920' } }}
            />
            <p>Данные группы</p>
          </div>
        </div>
        <div className='col-4'>
          <div className='paymentType__tabs-item'>
            <Checkbox
              checked={checks.hasTeacher}
              sx={{ color: '#fff', '&.Mui-checked': { color: '#2DE920' } }}
            />
            <p>Преподаватель назначен</p>
          </div>
        </div>
        <div className='col-4'>
          <div className='paymentType__tabs-item'>
            <Checkbox
              checked={checks.hasStudents}
              sx={{ color: '#fff', '&.Mui-checked': { color: '#2DE920' } }}
            />
            <p>Ученики добавлены</p>
          </div>
        </div>
        <div className='col-4'>
          <div className='paymentType__tabs-item'>
            <Checkbox
              checked={checks.hasPlan}
              sx={{ color: '#fff', '&.Mui-checked': { color: '#2DE920' } }}
            />
            <p>План курса составлен</p>
          </div>
        </div>
        <div className='col-4'>
          <div className='paymentType__tabs-item'>
            <Checkbox
              checked={checks.hasSchedule}
              sx={{ color: '#fff', '&.Mui-checked': { color: '#2DE920' } }}
            />
            <p>Расписание сгенерировано</p>
          </div>
        </div>
        <div className='col-4'>
          <div className='paymentType__tabs-item'>
            <Checkbox
              checked={allReady}
              sx={{ color: '#fff', '&.Mui-checked': { color: '#2DE920' } }}
            />
            <p>Всё готово</p>
          </div>
        </div>
      </div>

      <div className='dataTeacher__row'>
        <button
          className='dataTeacher__row-button'
          type='button'
          onClick={onReset}
        >
          Сбросить
        </button>
        <button
          className='dataTeacher__row-button add'
          type='button'
          disabled={!allReady}
          onClick={onCreate}
        >
          Создать
        </button>
      </div>
    </form>
  );
};
