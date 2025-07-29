import React, { useState } from 'react';
import { useTabs } from '../../../app/store/reducers/tabSlice';
import searchIcon from '../../admin/studentsTable/images/search.svg';
import plusIcon from '../../admin/teacherTable/plus.svg';
import {
  StudentPaymentHistory,
  StudentProfile,
  StudentSessionHistory,
  UniversalTable,
} from '../../../entities';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

// import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { menuItemStyle } from '../../../shared/utils/MuiStyles';
import { data, mergeNames } from '../../admin/studentsTable/StudentsTable';

export const Students = () => {
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const handleChange = event => {
    setValue(event.target.value);
  };

  const columns = [
    { title: '№', dataIndex: 'id', key: 'id' },
    { title: 'ФИО', dataIndex: 'name', key: 'name' },
    { title: 'Группа', dataIndex: 'group', key: 'group' },
    { title: 'Направление', dataIndex: 'direction', key: 'direction' },
    { title: 'Преподаватель', dataIndex: 'teacher', key: 'teacher' },
  ];

  return (
    <section className=''>
      <div className='container'>
        <div className='studentsTable__head'>
          <div className='studentsTable__head-search'>
            <input placeholder='Поиск' type='text' />
            <img src={searchIcon} alt='' />
          </div>
          <FormControl
            sx={{
              width: '35%',
              height: '100%',
              opacity: '60%',
              '& .MuiOutlinedInput-root': {
                color: '#fff', // цвет текста
                '& fieldset': {
                  borderColor: '#fff', // обычная граница
                },
                '&:hover fieldset': {
                  borderColor: '#fff', // при наведении
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#2de920', // при нажатии/фокусе (например, оранжевый)
                },
              },
              '& .MuiInputLabel-root': {
                color: '#fff', // цвет label по умолчанию
              },
              '& .Mui-focused .MuiInputLabel-root': {
                color: '#fff', // цвет label при фокусе
              },
            }}
          >
            <InputLabel id='demo-simple-select-label'>Направление</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={value}
              label='Направление'
              onChange={handleChange}
            >
              <MenuItem value='english' sx={menuItemStyle}>
                Английский
              </MenuItem>
              <MenuItem value='mentalArithmetic' sx={menuItemStyle}>
                Ментальная арифметика
              </MenuItem>
              <MenuItem value='robotics' sx={menuItemStyle}>
                Робототехника
              </MenuItem>
            </Select>
          </FormControl>
          <button
            onClick={() => navigate('/add-student')}
            className='studentsTable__head-add'
          >
            <img src={plusIcon} alt='' />
            Добавить ученика
          </button>
        </div>
        <UniversalTable
          columns={columns}
          data={mergeNames(data)}
          onRowClick={item => navigate(`/student/${item.id}`)}
        />
      </div>
    </section>
  );
};
