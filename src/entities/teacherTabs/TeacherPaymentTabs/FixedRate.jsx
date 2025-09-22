import { TextField } from '@mui/material';
import React from 'react';
import { inputStyle } from '../../../shared/utils/MuiStyles';
import { useDispatch } from 'react-redux';
import { setActiveTab } from '../../../app/store/reducers/tabSlice';

export const FixedRate = ({ amount, onChange }) => {
  const tabId = 'addTeacherTabs';
  const dispatch = useDispatch();

  return (
    <form onSubmit={e => e.preventDefault()} className='FixedRate'>
      <div className='studentsDetail__form-inputs'>
        <TextField
          id='outlined-basic'
          label='В месяц'
          name='amount'
          onChange={e => onChange(e.target.value)}
          value={amount}
          variant='outlined'
          sx={{ ...inputStyle, width: '100%' }}
        />
      </div>
      {/* <div className='dataTeacher__row'>
        <button
          onClick={() => dispatch(setActiveTab({ tabId, index: 0 }))}
          className='dataTeacher__row-button'
          type='button'
        >
          Отменить
        </button>
        <button
          className='dataTeacher__row-button add'
          disabled={!amount}
          type='submit'
        >
          Добавить
        </button>
      </div> */}
    </form>
  );
};
