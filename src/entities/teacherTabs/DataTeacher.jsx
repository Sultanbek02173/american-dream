import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bilol from '../../pages/admin/studentsDetail/image.jpg';
import { eventHandler } from '../../shared/utils/eventHandlers';
import {
  formControlStyle,
  inputStyle,
  menuItemStyle,
} from '../../shared/utils/MuiStyles';


export const DataTeacher = () => {
  const [state, setState] = useState({
    id: 1,
    image: bilol,
    full_name: 'Алина',
    telegram: '@alin1244',
    phone: '+996 500 123 456',
    login: 'alinaknzzz12',
    password: 'r_12lfomt',
    teacher: 'Алия Калымбекова',
    group: 'eng-01',
    direction: 'mentalArithmetic',
  });
  const navigate = useNavigate();

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

  return (
    <form onSubmit={e => e.preventDefault()} className='dataTeacher'>
      <div className='studentsDetail__form-inputs'>
        <TextField
          label='ФИО'
          name='full_name'
          onChange={onChange}
          value={state.full_name}
          variant='outlined'
          sx={{ ...inputStyle, width: '100%' }}
        />
      </div>
      <div className='studentsDetail__form-inputs'>
        <TextField
          label='Телеграм'
          name='telegram'
          onChange={onChange}
          value={state.telegram}
          variant='outlined'
          sx={{ ...inputStyle, width: '55%' }}
        />
        <TextField
          label='Телефон номер'
          name='phone'
          onChange={onChange}
          value={state.phone}
          variant='outlined'
          sx={{ ...inputStyle, width: '45%' }}
        />
      </div>
      <div className='studentsDetail__form-inputs'>
        <TextField
          label='Логин'
          name='login'
          onChange={onChange}
          value={state.login}
          variant='outlined'
          sx={{ ...inputStyle, width: '45%' }}
        />
        <TextField
          label='Пароль'
          name='password'
          onChange={onChange}
          value={state.password}
          variant='outlined'
          sx={{ ...inputStyle, width: '55%' }}
        />
      </div>
      <div className='studentsDetail__form-inputs'>
        <FormControl sx={{ ...formControlStyle, width: '55%' }}>
          <InputLabel id='group-label'>Группа</InputLabel>
          <Select
            labelId='group-label'
            value={state.group}
            label='Группа'
            name='group'
            onChange={handleSelectChange}
          >
            <MenuItem value='eng-01' sx={menuItemStyle}>
              ENG-01
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ ...formControlStyle, width: '45%' }}>
          <InputLabel id='direction-label'>Направление</InputLabel>
          <Select
            labelId='direction-label'
            value={state.direction}
            label='Направление'
            name='direction'
            onChange={handleSelectChange}
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
