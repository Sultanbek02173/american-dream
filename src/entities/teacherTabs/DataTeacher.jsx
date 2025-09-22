import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getDirections,
  getGroups,
} from '../../app/store/admin/entities/entitiesThunk';
import { eventHandler } from '../../shared/utils/eventHandlers';
import {
  formControlStyle,
  inputStyle,
  menuItemStyle,
} from '../../shared/utils/MuiStyles';
import { useEntities } from '../../app/store/admin/entities/entitiesSlice';
import { useDispatch } from 'react-redux';

export const DataTeacher = ({ formData, setFormData }) => {
  const { directions, groups } = useEntities();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDirections());
    dispatch(getGroups());
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={e => e.preventDefault()} className='dataTeacher'>
      <div className='studentsDetail__form-inputs'>
        <TextField
          label='Имя'
          name='first_name'
          value={formData.first_name}
          onChange={handleChange}
          sx={{ ...inputStyle, width: '50%' }}
        />
        <TextField
          label='Фамилия'
          name='last_name'
          value={formData.last_name}
          onChange={handleChange}
          sx={{ ...inputStyle, width: '50%' }}
        />
      </div>
      <div className='studentsDetail__form-inputs'>
        <TextField
          label='Возраст'
          name='age'
          value={formData.age}
          onChange={handleChange}
          sx={{ ...inputStyle, width: '100%' }}
        />
      </div>

      <div className='studentsDetail__form-inputs'>
        <TextField
          label='Телеграм'
          name='telegram'
          value={formData.telegram}
          onChange={handleChange}
          sx={{ ...inputStyle, width: '55%' }}
        />
        <TextField
          label='Телефон'
          name='phone'
          value={formData.phone}
          onChange={handleChange}
          sx={{ ...inputStyle, width: '45%' }}
        />
      </div>

      <div className='studentsDetail__form-inputs'>
        <TextField
          label='Логин'
          name='username'
          value={formData.username}
          onChange={handleChange}
          sx={{ ...inputStyle, width: '45%' }}
        />
        <TextField
          label='Пароль'
          name='password'
          value={formData.password}
          onChange={handleChange}
          sx={{ ...inputStyle, width: '55%' }}
        />
      </div>

      <div className='studentsDetail__form-inputs'>
        <FormControl sx={{ ...formControlStyle, width: '55%' }}>
          <InputLabel id='group-label'>Группа</InputLabel>
          <Select
            labelId='group-label'
            value={formData.group_ids[0] || ''}
            onChange={e =>
              setFormData(prev => ({ ...prev, group_ids: [e.target.value] }))
            }
          >
            {groups.map(group => (
              <MenuItem key={group.id} value={group.id} sx={menuItemStyle}>
                {group.group_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ ...formControlStyle, width: '45%' }}>
          <InputLabel id='direction-label'>Направление</InputLabel>
          <Select
            labelId='direction-label'
            value={formData.direction_ids[0] || ''}
            onChange={e =>
              setFormData(prev => ({
                ...prev,
                direction_ids: [e.target.value],
              }))
            }
          >
            {directions.map(direction => (
              <MenuItem
                key={direction.id}
                value={direction.id}
                sx={menuItemStyle}
              >
                {direction.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </form>
  );
};
