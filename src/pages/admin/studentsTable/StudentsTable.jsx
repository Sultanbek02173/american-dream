// import { Select } from "antd";
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import searchIcon from './images/search.svg';
import './studentsTable.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UniversalTable } from '../../../entities';
import { menuItemStyle } from '../../../shared/utils/MuiStyles';
import bilol from '../studentsDetail/image.jpg';
import plusIcon from '../teacherTable/plus.svg';

export const data = [
  {
    id: 1,
    image: bilol,
    group: 'Группа (A3)',
    full_name: 'Алина',
    last_name: 'Жумабаева',
    telegram: '@alin1244',
    phone: '+996 500 123 456',
    login: 'alinaknzzz12',
    password: 'r_12lfomt',
    teacher: 'Алия Калымбекова',
    direction: 'Английский',
  },
  {
    id: 2,
    image: bilol,
    group: 'Группа (A4)',
    full_name: 'Алина1',
    last_name: 'Жумабаева',
    telegram: '@alin1244',
    phone: '+996 500 123 456',
    login: 'alinaknzzz12',
    password: 'r_12lfomt',
    teacher: 'Алия Калымбекова',
    direction: 'Английский',
  },
];

export const mergeNames = data => {
  return data.map(item => {
    const { full_name, last_name, ...rest } = item;
    return {
      ...rest,
      name: `${full_name} ${last_name}`,
    };
  });
};

export const StudentsTable = () => {
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const handleChange = event => {
    setValue(event.target.value);
  };

  // const data2 = data.map((item) => item)
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
          onRowClick={item => navigate(`/students-table/${item.id}`)}
        />
      </div>
    </section>
  );
};
