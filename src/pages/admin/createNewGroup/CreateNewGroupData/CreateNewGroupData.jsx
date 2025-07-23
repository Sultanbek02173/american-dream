import { TextField } from '@mui/material';
import { useState } from 'react';
import bilol from '../../../admin/studentsDetail/image.jpg';

import { eventHandler } from '../../../../shared/utils/eventHandlers';
import { inputStyle } from '../../../../shared/utils/MuiStyles';
export const CreateNewGroupData = () => {
  const [state, setState] = useState({
    id: 1,
    course_name: 'Алина',
    age_group: '@alin1244',
    format: '+996 500 123 456',
    duration: 'alinaknzzz12',
    creation_date: 'r_12lfomt',
    comment: 'mentalArithmetic',
  });

  const onChange = eventHandler(setState);
  return (
    <form onSubmit={e => e.preventDefault()}>
      <div className='studentsDetail__form-inputs'>
        <TextField
          label='Название курса'
          name='course_name'
          onChange={onChange}
          value={state.course_name}
          variant='outlined'
          sx={{ ...inputStyle, width: '100%' }}
        />
      </div>
      <div className='studentsDetail__form-inputs'>
        <TextField
          label='Возрастная группа'
          name='age_group'
          onChange={onChange}
          value={state.age_group}
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
          label='Продолжительность'
          name='duration'
          onChange={onChange}
          value={state.duration}
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
      <div className='studentsDetail__form-inputs'>
        <TextField
          label='Комментарий'
          name='comment'
          onChange={onChange}
          value={state.comment}
          variant='outlined'
          sx={{ ...inputStyle, width: '100%' }}
        />
      </div>
    </form>
  );
};
