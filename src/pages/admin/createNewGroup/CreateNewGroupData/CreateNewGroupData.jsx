// CreateNewGroupData.jsx
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import {
  formControlStyle,
  inputStyle,
  menuItemStyle,
} from '../../../../shared/utils/MuiStyles';
import { useDispatch } from 'react-redux';
import { useEntities } from '../../../../app/store/admin/entities/entitiesSlice';
import { useEffect } from 'react';
import { getDirections } from '../../../../app/store/admin/entities/entitiesThunk';

export const CreateNewGroupData = ({ value, onChange }) => {
  const dispatch = useDispatch();
  const { directions = [] } = useEntities();

  useEffect(() => {
    dispatch(getDirections());
  }, [dispatch]);

  const handle = e => onChange(e.target.name, e.target.value);

  return (
    <form onSubmit={e => e.preventDefault()}>
      <div className='studentsDetail__form-inputs'>
        <TextField
          label='Название группы'
          name='group_name'
          onChange={handle}
          value={value.group_name ?? ''}
          variant='outlined'
          sx={{ ...inputStyle, width: '100%' }}
        />
      </div>

      <div className='studentsDetail__form-inputs'>
        <TextField
          label='Возрастная группа'
          name='age_group'
          onChange={handle}
          value={value.age_group ?? ''}
          variant='outlined'
          sx={{ ...inputStyle, width: '55%' }}
        />

        <FormControl sx={{ ...formControlStyle, width: '45%' }}>
          <InputLabel id='format-label'>Формат</InputLabel>
          <Select
            labelId='format-label'
            label='Формат'
            name='format'
            value={value.format ?? ''}
            onChange={handle}
          >
            <MenuItem value='online' sx={menuItemStyle}>
              Онлайн
            </MenuItem>
            <MenuItem value='offline' sx={menuItemStyle}>
              Офлайн
            </MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className='studentsDetail__form-inputs'>
        <TextField
          label='Длительность курса (мес)'
          name='duration_months'
          // оставляем строкой, но подсказываем числовой ввод
          value={value.duration_months}
          onChange={handle}
          variant='outlined'
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          sx={{ ...inputStyle, width: '45%' }}
        />

        <FormControl sx={{ ...formControlStyle, width: '55%' }}>
          <InputLabel id='direction-label'>Направление</InputLabel>
          <Select
            labelId='direction-label'
            label='Направление'
            name='direction'
            value={value.direction ?? ''} // строка!
            onChange={handle}
          >
            {directions.map(direction => (
              <MenuItem
                key={direction.id}
                value={direction.id} // приводим к строке
                sx={menuItemStyle}
              >
                {direction.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className='studentsDetail__form-inputs'>
        <TextField
          label='Комментарий'
          name='comment'
          onChange={handle}
          value={value.comment ?? ''}
          variant='outlined'
          sx={{ ...inputStyle, width: '100%' }}
        />
      </div>
    </form>
  );
};
