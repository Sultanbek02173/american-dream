import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import searchIcon from '../studentsTable/images/search.svg';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UniversalTable } from '../../../entities';
import plusIcon from '../teacherTable/plus.svg';
import './repordTable.scss';
import { menuItemStyle } from '../../../shared/utils/MuiStyles';
import { useDispatch } from 'react-redux';
import { useReport } from '../../../app/store/admin/report/reportSlice';
import { getGroupList } from '../../../app/store/admin/report/reportThunk';

export const RepordTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { groupList = [], directions } = useReport();

  // фильтры
  const [direction, setDirection] = useState(''); // enum-значение из селекта
  const [query, setQuery] = useState(''); // поиск по группе/курсу/уроку

  useEffect(() => {
    dispatch(getGroupList());
  }, [dispatch]);

  // нормализация направления: поддержим и enum, и русские названия в данных
  const dirMap = {
    english: ['english', 'английский'],
    mentalArithmetic: [
      'mentalArithmetic',
      'ментальная арифметика',
      'ментальная',
      'арифметика',
    ],
    robotics: ['robotics', 'робототехника', 'роботика'],
  };
  const matchesDirection = (rowDir, selectedDir) => {
    if (!selectedDir) return true;
    const candidates = dirMap[selectedDir] || [selectedDir];
    const hay = String(rowDir ?? '').toLowerCase();
    return candidates.some(val => hay.includes(String(val).toLowerCase()));
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return groupList.filter(row => {
      const okDir = matchesDirection(row.direction, direction);

      if (!q) return okDir;

      const hay = [
        row.group,
        row.course,
        row.lesson,
        row.direction, // на случай если ищут по направлению текстом
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      const okText = hay.includes(q);
      return okDir && okText;
    });
  }, [groupList, direction, query]);

  const columns = [
    { title: '№', dataIndex: 'id', key: 'id' },
    { title: 'Направление', dataIndex: 'direction', key: 'direction' },
    { title: 'Группа', dataIndex: 'group', key: 'group' },
    { title: 'Курс', dataIndex: 'course', key: 'course' },
    { title: 'Урок', dataIndex: 'lesson', key: 'lesson' },
  ];

  return (
    <section className='reportTable'>
      <div className='container'>
        <div className='studentsTable__head'>
          {/* Поиск по группе/курсу/уроку */}
          <div className='studentsTable__head-search'>
            <input
              placeholder='Поиск (группа, курс, урок)'
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
              {directions?.map(direction => (
                <MenuItem value={direction} sx={menuItemStyle}>
                  {direction}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <button
            onClick={() => navigate('/create-new-group')}
            className='studentsTable__head-add'
          >
            <img src={plusIcon} alt='' />
            Создание новую группу
          </button>
        </div>

        <UniversalTable
          columns={columns}
          data={filtered}
          onRowClick={item => navigate(`/report-table/${item.id}`)}
          emptyText='Ничего не найдено'
        />
      </div>
    </section>
  );
};
