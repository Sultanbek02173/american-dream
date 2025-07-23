import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import searchIcon from '../studentsTable/images/search.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { data } from '../studentsTable/StudentsTable';
import { UniversalTable } from '../../../entities';
import plusIcon from '../teacherTable/plus.svg';
import './repordTable.scss';
import { menuItemStyle } from '../../../shared/utils/MuiStyles';
export const RepordTable = () => {
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const handleChange = event => {
    setValue(event.target.value);
  };

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
            onClick={() => navigate('/create-new-group')}
            className='studentsTable__head-add'
          >
            <img src={plusIcon} alt='' />
            Создание новую группу
          </button>
        </div>
        <UniversalTable
          columns={columns}
          data={[
            {
              id: 1,
              group: 'Группа (A3)',
              direction: 'Английский',
              course: 1,
              lesson: '-',
            },
          ]}
          onRowClick={item => navigate(`/report-table/${item.id}`)}
        />
      </div>
    </section>
  );
};
