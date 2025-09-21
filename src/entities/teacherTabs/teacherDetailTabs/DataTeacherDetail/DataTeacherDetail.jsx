import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import bilol from '../../../../pages/admin/studentsDetail/image.jpg';

import { eventHandler } from '../../../../shared/utils/eventHandlers';
import {
  formControlStyle,
  inputStyle,
  menuItemStyle,
} from '../../../../shared/utils/MuiStyles';
import { useDispatch } from 'react-redux';
import { getTeacherProfile } from '../../../../app/store/admin/teacher/teacherThunk';
import { useTeachers } from '../../../../app/store/admin/teacher/teachersSlice';

const initialState = {
  id: 1,
  image: bilol,
  first_name: '',
  full_name: '',
  telegram: '',
  phone: '',
  login: '',
  password: '',
  teacher: '',
  group: '',
  direction: '',
};

export const DataTeacherDetail = () => {
  const { teacherProfile: profile, directions } = useTeachers();

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { 0: state, 1: setState } = useState(profile);
  const onChange = eventHandler(setState);

  const handleSelectChange = event => {
    const { name, value } = event.target;
    setState(prev => ({ ...prev, [name]: value }));
  };

  const isAllFieldsFilled = obj =>
    Object.entries(obj).every(([key, value]) => {
      if (key === 'image' || key === 'id') return true;
      return value !== '' && value !== null && value !== undefined;
    });

  useEffect(() => {
    dispatch(getTeacherProfile(id));
  }, [dispatch, id]);

  return (
    <form onSubmit={e => e.preventDefault()} className='dataTeacher'>
      <div className='studentsDetail__form-inputs'>
        <TextField
          label='ФИО'
          name='full_name'
          onChange={onChange}
          value={state?.full_name}
          variant='outlined'
          sx={{ ...inputStyle, width: '100%' }}
        />
      </div>
      <div className='studentsDetail__form-inputs'>
        <TextField
          label='Телеграм'
          name='telegram'
          onChange={onChange}
          value={state?.telegram}
          variant='outlined'
          sx={{ ...inputStyle, width: '55%' }}
        />
        <TextField
          label='Телефон номер'
          name='phone'
          onChange={onChange}
          value={state?.phone}
          variant='outlined'
          sx={{ ...inputStyle, width: '45%' }}
        />
      </div>
      <div className='studentsDetail__form-inputs'>
        <TextField
          label='Логин'
          name='username'
          onChange={onChange}
          value={state?.username}
          variant='outlined'
          sx={{ ...inputStyle, width: '45%' }}
        />
        <TextField
          label='Пароль'
          name='password'
          onChange={onChange}
          value={state?.password}
          variant='outlined'
          sx={{ ...inputStyle, width: '55%' }}
        />
      </div>
      <div className='studentsDetail__form-inputs'>
        <FormControl sx={{ ...formControlStyle, width: '55%' }}>
          <InputLabel id='group-label'>Группа</InputLabel>
          <Select
            labelId='group-label'
            value={state?.group}
            label='Группа'
            name='group'
            onChange={handleSelectChange}
          >
            <MenuItem value='Группа (A3)' sx={menuItemStyle}>
              ENG-01
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ ...formControlStyle, width: '45%' }}>
          <InputLabel id='direction-label'>Направление</InputLabel>
          <Select
            labelId='direction-label'
            value={state?.direction}
            label='Направление'
            name='direction'
            onChange={handleSelectChange}
          >
            <MenuItem value='Английский' sx={menuItemStyle}>
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
      <div className='dataTeacher__row'>
        <button
          className='dataTeacher__row-button'
          type='button'
          onClick={() => navigate('/teacher-table')}
        >
          Отменить
        </button>
        <button
          className='dataTeacher__row-button add'
          disabled={!isAllFieldsFilled(state)}
        >
          Добавить
        </button>
      </div>
    </form>
  );
};
