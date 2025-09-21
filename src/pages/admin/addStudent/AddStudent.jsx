import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEntities } from '../../../app/store/admin/entities/entitiesSlice';
import {
  getDirections,
  getGroups,
} from '../../../app/store/admin/entities/entitiesThunk';
import { eventHandler } from '../../../shared/utils/eventHandlers';
import {
  formControlStyle,
  inputStyle,
  menuItemStyle,
} from '../../../shared/utils/MuiStyles';
import { createStudent } from '../../../app/store/admin/students/studentsThunk';
export const AddStudent = () => {
  const [state, setState] = useState({
    full_name: '',
    telegram: '',
    phone: '',
    username: '',
    age: '18',
    group: '',
    direction: '',
  });
  const { directions, groups } = useEntities();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = eventHandler(setState);

  const isAllFieldsFilled = obj => {
    const requiredFields = [
      'full_name',
      'telegram',
      'phone',
      'username',
      'password',
      'group',
      'direction',
    ];

    return requiredFields.every(field => {
      const value = obj[field];
      return value !== '' && value !== null && value !== undefined;
    });
  };

  const onFormSubmit = async e => {
    e.preventDefault();
    try {
      await dispatch(createStudent(state)).unwrap();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    dispatch(getDirections());
    dispatch(getGroups());
  }, []);

  return (
    <section>
      <div className='container'>
        <form onSubmit={onFormSubmit} className='dataTeacher'>
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
              name='username'
              onChange={onChange}
              value={state.username}
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
                onChange={onChange}
              >
                {groups.map(group => {
                  return (
                    <MenuItem value={group.id} sx={menuItemStyle}>
                      {group.group_name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl sx={{ ...formControlStyle, width: '45%' }}>
              <InputLabel id='direction-label'>Направление</InputLabel>
              <Select
                labelId='direction-label'
                value={state.direction}
                label='Направление'
                name='direction'
                onChange={onChange}
              >
                {directions.map(direction => (
                  <MenuItem value={direction.id} sx={menuItemStyle}>
                    {direction.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className='dataTeacher__row'>
            <button
              className='dataTeacher__row-button'
              type='button'
              onClick={() => navigate('/students-table')}
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
      </div>
    </section>
  );
};
