import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import searchIcon from '../studentsTable/images/search.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { data } from '../studentsTable/StudentsTable';
import { UniversalTable } from '../../../entities';
import plusIcon from './plus.svg';
import './teacherTable.scss';
export const TeacherTable = () => {
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const handleChange = event => {
    setValue(event.target.value);
  };
  const menuItemStyle = {
    '&:hover': {
      backgroundColor: '#2DE920',
      color: '#fff',
    },
  };

  const columns = [
    { title: '№', dataIndex: 'id', key: 'id' },
    { title: 'ФИО', dataIndex: 'name', key: 'name' },
    { title: 'Группа', dataIndex: 'group', key: 'group' },
    { title: 'Направление', dataIndex: 'direction', key: 'direction' },
    { title: 'Ученики', dataIndex: 'teacher', key: 'teacher' },
  ];

  return (
    <section className='teacherTable studentsTable'>
      <div className='container'>
        <div className='studentsTable__head'>
          <div className='studentsTable__head-search'>
            <input placeholder='Поиск' type='text' />
            <img src={searchIcon} alt='' />
          </div>
          <FormControl
            sx={{
              width: '33.3%',
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
            onClick={() => navigate('/add-teacher')}
            className='studentsTable__head-add'
          >
            <img src={plusIcon} alt='' />
            Добавить преподавателя
          </button>
        </div>
        <UniversalTable
          columns={columns}
          data={data}
          onRowClick={item => navigate(`/teacher/${item.id}`)}
        />
      </div>
    </section>
  );
};
