import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { eventHandler } from '../../../shared/utils/eventHandlers';
import { useNavigate } from 'react-router-dom';
import { inputStyle } from '../../../shared/utils/MuiStyles';
import { setActiveTab } from '../../../app/store/reducers/tabSlice';
import { useDispatch } from 'react-redux';

export const FixedRate = () => {
  const { 0: state, 1: setState } = useState({
    amount: '30 000 с',
  });
  const tabId = 'addTeacherTabs';
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const onChange = eventHandler(setState);

  return (
    <form onSubmit={e => e.preventDefault()} className='FixedRate'>
      <div className='studentsDetail__form-inputs'>
        <TextField
          id='outlined-basic'
          label='В месяц'
          name='amount'
          onChange={onChange}
          value={state.amount}
          variant='outlined'
          sx={{ ...inputStyle, width: '100%' }}
        />
      </div>
      <div className='dataTeacher__row'>
        <button
          onClick={() => dispatch(setActiveTab({ tabId, index: 0 }))}
          className='dataTeacher__row-button'
          type='button'
        >
          Отменить
        </button>
        <button
          className='dataTeacher__row-button add'
          disabled={!state.amount}
          type='submit'
        >
          Добавить
        </button>
      </div>
    </form>
  );
};
