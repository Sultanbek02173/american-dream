import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
} from '@mui/material';
import searchIcon from './images/search.svg';
import './studentsTable.scss';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UniversalTable } from '../../../entities';
import { menuItemStyle } from '../../../shared/utils/MuiStyles';
import bilol from '../studentsDetail/logo_user.svg';
import plusIcon from '../teacherTable/plus.svg';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { useStudents } from '../../../app/store/admin/students/studentsSlice';
import { getStudentList } from '../../../app/store/admin/students/studentsThunk';

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
  return data?.map(item => {
    const { full_name, last_name, ...rest } = item;
    return {
      ...rest,
      name: `${full_name} ${last_name}`,
    };
  });
};

export const StudentsTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = Cookies.get('role');

  const { students = [], directions = [] } = useStudents();

  const [direction, setDirection] = useState('');
  const [query, setQuery] = useState(''); 

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const controlWidth = role === 'Administrator' ? '35%' : '40%';

  useEffect(() => {
    dispatch(getStudentList());
  }, [dispatch]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return (students || []).filter(s => {
      const okDir = direction
        ? String(s.direction) === String(direction)
        : true;

      if (!q) return okDir;

      const fio = [s.full_name, s.last_name, s.first_name, s.username]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      const groupName = String(s.group ?? '').toLowerCase();

      const okText = fio.includes(q) || groupName.includes(q);

      return okDir && okText;
    });
  }, [students, direction, query]);

  useEffect(() => {
    setCurrentPage(1);
  }, [direction, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));

  const paginatedWithSeq = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage).map((row, i) => ({
      ...row,
      seq: start + i + 1, 
    }));
  }, [filtered, currentPage]);

  const columns = [
    { title: '№', dataIndex: 'seq', key: 'seq' }, 
    { title: 'ФИО', dataIndex: 'full_name', key: 'full_name' },
    { title: 'Группа', dataIndex: 'group', key: 'group' },
    { title: 'Направление', dataIndex: 'direction', key: 'direction' },
    { title: 'Преподаватель', dataIndex: 'teacher', key: 'teacher' },
  ];

  return (
    <section className='studentsTable'>
      <div className='container'>
        <div className='studentsTable__head'>
          <div
            className={
              role === 'Administrator'
                ? 'studentsTable__head-search'
                : 'studentsTable__head-search-manager'
            }
          >
            <input
              placeholder='Поиск (ФИО или группа)'
              type='text'
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <img src={searchIcon} alt='' />
          </div>

          <FormControl
            sx={{
              width: controlWidth,
              height: '100%',
              opacity: '60%',
              '& .MuiOutlinedInput-root': {
                color: '#fff',
                '& fieldset': { borderColor: '#fff' },
                '&:hover fieldset': { borderColor: '#fff' },
                '&.Mui-focused fieldset': { borderColor: '#2de920' },
              },
              '& .MuiInputLabel-root': { color: '#fff' },
              '& .Mui-focused .MuiInputLabel-root': { color: '#fff' },
              '& label.Mui-focused': { color: '#2de920' },
            }}
          >
            <InputLabel id='direction-label'>Направление</InputLabel>
            <Select
              labelId='direction-label'
              id='direction'
              value={direction}
              label='Направление'
              onChange={e => setDirection(e.target.value)}
            >
              <MenuItem value='' sx={menuItemStyle}>
                Все направления
              </MenuItem>
              {directions.map(dir => (
                <MenuItem key={dir} value={dir} sx={menuItemStyle}>
                  {dir}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {role === 'Administrator' && (
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
          data={paginatedWithSeq}
          onRowClick={item => navigate(`/students-table/${item.user_id}`)}
          emptyText='Ничего не найдено'
        />

        {filtered.length > itemsPerPage && (
          <div className='studentsTable__pagination'>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, page) => setCurrentPage(page)}
              sx={{
                '& .MuiPaginationItem-root': {
                  fontWeight: 'bold',
                  color: '#ffffff70',
                },
                '& .Mui-selected': {
                  color: '#fff',
                  borderRadius: '8px',
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
