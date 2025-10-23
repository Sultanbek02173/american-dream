import { useEffect, useMemo, useState } from 'react';
import searchIcon from '../../admin/studentsTable/images/search.svg';
import plusIcon from '../../admin/teacherTable/plus.svg';
import { UniversalTable } from '../../../entities';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { menuItemStyle } from '../../../shared/utils/MuiStyles';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { studentListGet } from '../../../app/store/teacher/studentList/studentListThunks';
import { useStudentList } from '../../../app/store/teacher/studentList/studentListSlice';
import { AnimatePresence, motion } from 'framer-motion';
import { IoIosArrowDown } from 'react-icons/io';
import './students.scss';

export const Students = () => {
  const navigate = useNavigate();
  const role = Cookies.get('role');
  const dispatch = useDispatch();

  const { studentList, listLoading, error } = useStudentList();

  const students = studentList?.students ?? [];
  const filters = studentList?.filters ?? {};
  const selected = studentList?.selected_filters ?? {};

  const [search, setSearch] = useState('');
  const [direction, setDirection] = useState('');
  const [openRowId, setOpenRowId] = useState(null);
  const [openPaymentsId, setOpenPaymentsId] = useState(null);

  useEffect(() => {
    dispatch(studentListGet());
  }, [dispatch]);

  useEffect(() => {
    setSearch(selected?.search ?? '');
    setDirection(selected?.direction ?? '');
  }, [selected?.search, selected?.direction]);

  const columns = [
    { title: '№', dataIndex: 'num', key: 'num' },
    { title: 'ФИО', dataIndex: 'name', key: 'name' },
    { title: 'Группа', dataIndex: 'group', key: 'group' },
    { title: 'Направление', dataIndex: 'direction', key: 'direction' },
    { title: 'Преподаватель', dataIndex: 'teacher', key: 'teacher' },
  ];

  const controlWidth = role === 'Administrator' ? '35%' : '50%';

  const tableData = useMemo(() => {
    const q = (search ?? '').trim().toLowerCase();

    return students
      .filter(s => (direction ? s.direction === direction : true))
      .filter(s => {
        if (!q) return true;
        const hay = [
          s.full_name,
          s.group,
          s.direction,
          s.teacher,
          String(s.user_id ?? s.id),
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return hay.includes(q);
      })
      .map((s, i) => ({
        num: i + 1,
        id: s.user_id ?? s.id,
        user_id: s.user_id ?? s.id,
        name: s.full_name,
        group: s.group,
        direction: s.direction,
        teacher: s.teacher,
      }));
  }, [students, direction, search]);

  return (
    <section>
      <div className='container'>
        <div className='studentsTable__head'>
          <div
            className='studentsTable__head-search'
            style={{ width: controlWidth }}
          >
            <input
              placeholder='Поиск'
              type='text'
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <img src={searchIcon} alt='' />
          </div>

          <FormControl
            sx={{
              width: controlWidth,
              height: '100%',
              opacity: 0.6,
              '& .MuiOutlinedInput-root': {
                color: '#fff',
                '& fieldset': { borderColor: '#fff' },
                '&:hover fieldset': { borderColor: '#fff' },
                '&.Mui-focused fieldset': { borderColor: '#2de920' },
              },
              '& .MuiInputLabel-root': {
                color: '#fff',
                '&.Mui-focused': { color: '#fff' },
              },
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

              {(filters?.directions ?? []).map(dir => (
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

        {error && (
          <div style={{ marginTop: 12, color: '#ff6961' }}>
            Ошибка: {String(error)}
          </div>
        )}

        <div className='students__wrapper'>
          <UniversalTable
            columns={columns}
            data={tableData}
            loading={listLoading}
            onRowClick={item => navigate(`/student/${item.user_id}`)}
            emptyText='Ничего не найдено'
          />
        </div>

        {/* Анимированная таблица-аккордеон для студентов */}
        <div className='accordion'>
          {tableData.map(row => {
            const isOpen = openRowId === row.id;
            return (
              <div
                key={row.id}
                className={`accordion__item${isOpen ? ' open' : ''}`}
              >
                <button
                  type='button'
                  className='accordion__header'
                  onClick={() =>
                    setOpenRowId(prev => (prev === row.id ? null : row.id))
                  }
                >
                  <span className='accordion__title'>{row.name}</span>
                  <IoIosArrowDown
                    className={`accordion__chevron${isOpen ? ' rotate' : ''}`}
                    size={22}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className='accordion__panel'
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                    >
                      <div className='accordion__row'>
                        <span className='label'>Группа:</span>
                        <span className='value'>{row.group || '—'}</span>
                      </div>
                      <div className='accordion__row'>
                        <span className='label'>Направление:</span>
                        <span className='value'>{row.direction || '—'}</span>
                      </div>
                      <div className='accordion__row'>
                        <span className='label'>Преподаватель:</span>
                        <span className='value'>{row.teacher || '—'}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Вторая анимированная таблица-аккордеон с другими классами (как на скрине) */}
      </div>
    </section>
  );
};
