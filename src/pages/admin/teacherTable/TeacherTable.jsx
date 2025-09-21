import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import searchIcon from '../studentsTable/images/search.svg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { data, mergeNames } from '../studentsTable/StudentsTable';
import { UniversalTable } from '../../../entities';
import plusIcon from './plus.svg';
import './teacherTable.scss';
import { useDispatch } from 'react-redux';
import { useTeachers } from '../../../app/store/admin/teacher/teachersSlice';
import { getTeacherList } from '../../../app/store/admin/teacher/teacherThunk';
export const TeacherTable = () => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const { teacherList, directions } = useTeachers();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(teacherList?.length / itemsPerPage);
  const paginatedData = teacherList?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
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
    { title: 'ФИО', dataIndex: 'full_name', key: 'full_name' },
    { title: 'Группа', dataIndex: 'groups', key: 'groups' },
    { title: 'Направление', dataIndex: 'directions', key: 'directions' },
    { title: 'Ученики', dataIndex: 'student_count', key: 'student_count' },
  ];

  useEffect(() => {
    dispatch(getTeacherList());
  }, []);

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
              '& label.Mui-focused': {
                color: '#2de920',
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
              {directions?.map(direction => {
                return (
                  <MenuItem value={direction} sx={menuItemStyle}>
                    {direction}
                  </MenuItem>
                );
              })}
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
          data={teacherList}
          onRowClick={item => navigate(`/teacher-table/${item.id}`)}
        />
        {teacherList.length > itemsPerPage && (
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
