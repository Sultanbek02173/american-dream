import { Checkbox } from '@mui/material';
import React from 'react';

export const CreateNewGroupCompletion = () => {
  return (
    <form className='createGroupCompletion'>
      <h2 className='createGroupSchedule__title'>Последний шаг</h2>
      <div className='row'>
        <div className='col-4'>
          <div className='paymentType__tabs-item'>
            <Checkbox
              // checked={selectedStudents.includes(student.id)}
              // onChange={() => toggleStudent(student.id)}
              sx={{
                color: '#fff',
                '&.Mui-checked': {
                  color: '#2DE920',
                },
              }}
            />
            <p>Данные группы</p>
          </div>
        </div>
        <div className='col-4'>
          <div className='paymentType__tabs-item'>
            <Checkbox
              // checked={selectedStudents.includes(student.id)}
              // onChange={() => toggleStudent(student.id)}
              sx={{
                color: '#fff',
                '&.Mui-checked': {
                  color: '#2DE920',
                },
              }}
            />
            <p>Преподаватель назначен</p>
          </div>
        </div>
        <div className='col-4'>
          <div className='paymentType__tabs-item'>
            <Checkbox
              // checked={selectedStudents.includes(student.id)}
              // onChange={() => toggleStudent(student.id)}
              sx={{
                color: '#fff',
                '&.Mui-checked': {
                  color: '#2DE920',
                },
              }}
            />
            <p>Ученики добавлены</p>
          </div>
        </div>
        <div className='col-4'>
          <div className='paymentType__tabs-item'>
            <Checkbox
              // checked={selectedStudents.includes(student.id)}
              // onChange={() => toggleStudent(student.id)}
              sx={{
                color: '#fff',
                '&.Mui-checked': {
                  color: '#2DE920',
                },
              }}
            />
            <p>План курса составлен</p>
          </div>
        </div>
        <div className='col-4'>
          <div className='paymentType__tabs-item'>
            <Checkbox
              // checked={selectedStudents.includes(student.id)}
              // onChange={() => toggleStudent(student.id)}
              sx={{
                color: '#fff',
                '&.Mui-checked': {
                  color: '#2DE920',
                },
              }}
            />
            <p>Расписание сгенерировано</p>
          </div>
        </div>
        <div className='col-4'>
          <div className='paymentType__tabs-item'>
            <Checkbox
              // checked={selectedStudents.includes(student.id)}
              // onChange={() => toggleStudent(student.id)}
              sx={{
                color: '#fff',
                '&.Mui-checked': {
                  color: '#2DE920',
                },
              }}
            />
            <p>Всё готово</p>
          </div>
        </div>
      </div>
      <div className='dataTeacher__row'>
        <button
          className='dataTeacher__row-button'
          type='button'
          // onClick={() => navigate('/teacher-table')}
        >
          Сбросить
        </button>
        <button
          className='dataTeacher__row-button add'
          // disabled={!isAllFieldsFilled(state)}
        >
          Создать
        </button>
      </div>
    </form>
  );
};
