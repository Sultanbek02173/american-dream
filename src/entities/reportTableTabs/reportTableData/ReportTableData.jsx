import React from 'react';
import { inputStyle } from '../../../shared/utils/MuiStyles';
import { TextField } from '@mui/material';

const fmtDate = iso => {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat('ru-RU', {
      timeZone: 'Asia/Bishkek',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(d);
  } catch {
    return String(iso);
  }
};

export const ReportTableData = ({ data }) => {
  const teacher = data?.teacher ?? '';
  const status = data?.is_active ? 'Активна' : 'Неактивна';
  const format =
    data?.format === 'online'
      ? 'Онлайн'
      : data?.format === 'offline'
      ? 'Офлайн'
      : data?.format ?? '';
  const ageGroup = data?.age_group ?? '';
  const creationDate = fmtDate(data?.creation_date);

  const readOnly = { readOnly: true };

  return (
    <div>
      <div className='studentsDetail__form-inputs'>
        <TextField
          label='Преподаватель'
          name='teacher'
          value={teacher}
          variant='outlined'
          InputProps={readOnly}
          sx={{ ...inputStyle, width: '100%' }}
        />
      </div>

      <div className='studentsDetail__form-inputs'>
        <TextField
          label='Статус'
          name='status'
          value={status}
          variant='outlined'
          InputProps={readOnly}
          sx={{ ...inputStyle, width: '55%' }}
        />
        <TextField
          label='Формат'
          name='format'
          value={format}
          variant='outlined'
          InputProps={readOnly}
          sx={{ ...inputStyle, width: '45%' }}
        />
      </div>

      <div className='studentsDetail__form-inputs'>
        <TextField
          label='Возрастная группа'
          name='age_group'
          value={ageGroup}
          variant='outlined'
          InputProps={readOnly}
          sx={{ ...inputStyle, width: '45%' }}
        />
        <TextField
          label='Дата создания'
          name='creation_date'
          value={creationDate}
          variant='outlined'
          InputProps={readOnly}
          sx={{ ...inputStyle, width: '55%' }}
        />
      </div>
    </div>
  );
};
