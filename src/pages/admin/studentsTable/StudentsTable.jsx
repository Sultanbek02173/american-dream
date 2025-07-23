// import { Select } from "antd";
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import searchIcon from './images/search.svg';
import './studentsTable.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UniversalTable } from '../../../entities';
import { menuItemStyle } from '../../../shared/utils/MuiStyles';

export const data = [
  {
    id: 1,
    group: 'Группа (A3)',
    direction: 'Английский',
    name: 'Алина Жумабаева',
    teacher: 'Наталья Светлановна',
  },
  {
    id: 2,
    name: 'Алина Жумабаева',
    group: 'Группа (A3)',
    direction: 'Английский',
    teacher: 'Наталья Светлановна',
  },
  {
    id: 3,
    name: 'Алина Жумабаева',
    group: 'Группа (A3)',
    direction: 'Английский',
    teacher: 'Наталья Светлановна',
  },
  {
    id: 4,
    name: 'Алина Жумабаева',
    group: 'Группа (A3)',
    direction: 'Английский',
    teacher: 'Наталья Светлановна',
  },
  {
    id: 5,
    name: 'Алина Жумабаева',
    group: 'Группа (A3)',
    direction: 'Английский',
    teacher: 'Наталья Светлановна',
  },
];
export const StudentsTable = () => {
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
    <section className='studentsTable'>
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
        </div>
        <UniversalTable
          columns={columns}
          data={data}
          onRowClick={item => navigate(`/students-table/${item.id}`)}
        />
      </div>
    </section>
  );
};
