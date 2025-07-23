import React, { useState } from 'react';
import { eventHandler } from '../../../shared/utils/eventHandlers';
import { inputStyle } from '../../../shared/utils/MuiStyles';
import { TextField } from '@mui/material';

export const ReportTableData = () => {
  const [state, setState] = useState({
    teacher: 'Жамалкулов Аслан Кулунзанович',
    status: '',
    format: '',
    age_group: '',
    creation_date: '',
  });
  const onChange = eventHandler(setState);
  return (
    <div>
      <div className='studentsDetail__form-inputs'>
        <TextField
          label='Преподаватель'
          name='full_name'
          onChange={onChange}
          value={state.teacher}
          variant='outlined'
          sx={{ ...inputStyle, width: '100%' }}
        />
      </div>
      <div className='studentsDetail__form-inputs'>
        <TextField
          label='Статус'
          name='age_group'
          onChange={onChange}
          value={state.status}
          variant='outlined'
          sx={{ ...inputStyle, width: '55%' }}
        />
        <TextField
          label='Формат'
          name='format'
          onChange={onChange}
          value={state.format}
          variant='outlined'
          sx={{ ...inputStyle, width: '45%' }}
        />
      </div>
      <div className='studentsDetail__form-inputs'>
        <TextField
          label='Возрастная группа'
          name='duration'
          onChange={onChange}
          value={state.age_group}
          variant='outlined'
          sx={{ ...inputStyle, width: '45%' }}
        />
        <TextField
          label='Дата создания'
          name='creation_date'
          onChange={onChange}
          value={state.creation_date}
          variant='outlined'
          sx={{ ...inputStyle, width: '55%' }}
        />
      </div>
    </div>
  );
};
