import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
} from '@mui/material';
import searchIcon from '../studentsTable/images/search.svg';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UniversalTable } from '../../../entities';
import plusIcon from './plus.svg';
import './teacherTable.scss';
import { useDispatch } from 'react-redux';
import { useTeachers } from '../../../app/store/admin/teacher/teachersSlice';
import { getTeacherList } from '../../../app/store/admin/teacher/teacherThunk';

export const TeacherTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { teacherList = [], directions = [] } = useTeachers();

  // фильтры
  const [direction, setDirection] = useState('');
  const [query, setQuery] = useState(''); // поиск по ФИО или группе

  // пагинация
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    dispatch(getTeacherList());
  }, [dispatch]);

  // применяем фильтры
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return (teacherList || []).filter(t => {
      // направление может быть строкой или массивом
      const teacherDirs = Array.isArray(t.directions)
        ? t.directions
        : [t.directions].filter(Boolean);
      const okDir = direction ? teacherDirs.includes(direction) : true;

      if (!q) return okDir;

      // ФИО
      const fio = [t.full_name, t.last_name, t.first_name, t.username]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      // Группы
      const groupsText = Array.isArray(t.groups)
        ? t.groups.join(' ').toLowerCase()
        : String(t.groups ?? '').toLowerCase();

      const okText = fio.includes(q) || groupsText.includes(q);

      return okDir && okText;
    });
  }, [teacherList, direction, query]);

  // сброс страницы при смене фильтров
  useEffect(() => {
    setCurrentPage(1);
  }, [direction, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));

  // данные текущей страницы + добавляем порядковый номер seq
  const paginatedWithSeq = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const page = filtered.slice(start, start + itemsPerPage);
    return page.map((row, i) => ({
      ...row,
      // порядковый номер по всей выборке, а не только в рамках страницы
      seq: start + i + 1,
      // нормализуем группы/направления для аккуратного вывода в таблице
      groups: Array.isArray(row.groups) ? row.groups.join(', ') : row.groups,
      directions: Array.isArray(row.directions)
        ? row.directions.join(', ')
        : row.directions,
    }));
  }, [filtered, currentPage]);

  const columns = [
    { title: '№', dataIndex: 'seq', key: 'seq' }, // ← порядок
    { title: 'ФИО', dataIndex: 'full_name', key: 'full_name' },
    { title: 'Группа', dataIndex: 'groups', key: 'groups' },
    { title: 'Направление', dataIndex: 'directions', key: 'directions' },
    { title: 'Ученики', dataIndex: 'student_count', key: 'student_count' },
  ];

  const menuItemHoverStyle = {
    '&:hover': {
      backgroundColor: '#2DE920',
      color: '#fff',
    },
  };

  return (
    <section className='teacherTable studentsTable'>
      <div className='container'>
        <div className='studentsTable__head'>
          {/* Поиск по ФИО или группе */}
          <div className='studentsTable__head-search'>
            <input
              placeholder='Поиск (ФИО или группа)'
              type='text'
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <img src={searchIcon} alt='' />
          </div>

          {/* Фильтр по направлению */}
          <FormControl
            sx={{
              width: '33.3%',
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
              <MenuItem value='' sx={menuItemHoverStyle}>
                Все направления
              </MenuItem>
              {directions?.map(dir => (
                <MenuItem key={dir} value={dir} sx={menuItemHoverStyle}>
                  {dir}
                </MenuItem>
              ))}
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
          data={paginatedWithSeq}
          onRowClick={item => navigate(`/teacher-table/${item.id}`)}
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
