// import { Select } from "antd";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
} from '@mui/material';
import searchIcon from './images/search.svg';
import './studentsTable.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UniversalTable } from '../../../entities';
import { menuItemStyle } from '../../../shared/utils/MuiStyles';
import bilol from '../studentsDetail/image.jpg';
import plusIcon from '../teacherTable/plus.svg';
import Cookies from 'js-cookie';

export const data = [
  {
    id: 1,
    image: bilol,
    group: 'Группа (A3)',
    full_name: 'Алин',
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
  {
    id: 3,
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
  {
    id: 4,
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
  {
    id: 5,
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
  {
    id: 6,
    image: bilol,
    group: 'Группа (A4)фысфыс',
    full_name: 'Алина1',
    last_name: 'Жумабаева',
    telegram: '@alin1244',
    phone: '+996 500 123 456',
    login: 'alinaknzzz12',
    password: 'r_12lfomt',
    teacher: 'Алия Калымбекова',
    direction: 'Английский',
  },
  {
    id: 7,
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
  {
    id: 8,
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
  ,
  {
    id: 9,
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
  {
    id: 10,
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
  {
    id: 11,
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
  {
    id: 12,
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
  const role = Cookies.get('user_role');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const mergedData = mergeNames(data);
  const totalPages = Math.ceil(mergedData.length / itemsPerPage);
  const paginatedData = mergedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
  const menuItemStyle = role === 'admin' ? '35%' : '40%';

  return (
    <section className='studentsTable'>
      <div className='container'>
        <div className='studentsTable__head'>
          <div className={role === 'admin' ? 'studentsTable__head-search' : 'studentsTable__head-search-manager'}>
            <input placeholder='Поиск' type='text' />
            <img src={searchIcon} alt='' />
          </div>
          <FormControl
            sx={{
              width: `${menuItemStyle}`,
              height: '100%',
              opacity: '60%',
              '& .MuiOutlinedInput-root': {
                color: '#fff',
                '& fieldset': {
                  borderColor: '#fff',
                },
                '&:hover fieldset': {
                  borderColor: '#fff',
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

          {role === 'admin' && (
            <button
              onClick={() => navigate('/add-student')}
              className='studentsTable__head-add'
            >
              <img src={plusIcon} alt='' />
              Добавить ученика
            </button>
          )}
        </div>
        <UniversalTable
          columns={columns}
          data={paginatedData}
          onRowClick={item => navigate(`/students-table/${item.id}`)}
        />

        {mergedData.length > itemsPerPage && (
          <div className='studentsTable__pagination'>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, value) => setCurrentPage(value)}
              sx={{
                '& .MuiPaginationItem-root': {
                  fontWeight: 'bold',
                  color: '#ffffff70',
                },
                '& .Mui-selected': {
                  color: '#fff',
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: '#0077ff',
                  },
                },
                '& .MuiPaginationItem-previousNext': {
                  color: '#2DE920',
                },
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
};
