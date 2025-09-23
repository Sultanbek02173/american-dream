import { useState } from 'react';
import { eventHandler } from '../../../shared/utils/eventHandlers';
import { inputStyle } from '../../../shared/utils/MuiStyles';
import { TextField } from '@mui/material';

export const PaymentsTabInvoicing = () => {
  const onChange = eventHandler();
  const { 0: state, 1: setState } = useState({
    recipient: '',
    direction: '',
    amount: '',
    cash: '',
    transfer: '',
    online: '',
    comment: '',
  });
  const isAllFieldsFilled = obj =>
    Object.entries(obj).every(([key, value]) => {
      if (key === 'image' || key === 'id') return true;
      return value !== '' && value !== null && value !== undefined;
    });
  return (
    <form onSubmit={e => e.preventDefault()} className='paymentsInvoicing'>
      <div className='studentsDetail__form-inputs'>
        <TextField
          id='outlined-basic'
          label='Имя'
          name='recipient'
          onChange={onChange}
          value={state.recipient}
          variant='outlined'
          sx={{ ...inputStyle, width: '100%' }}
        />
      </div>
      <div className='studentsDetail__form-inputs'>
        <TextField
          id='outlined-basic'
          label='Направление'
          name='direction'
          onChange={onChange}
          value={state.direction}
          variant='outlined'
          sx={{ ...inputStyle, width: '45%' }}
        />
        <TextField
          id='outlined-basic'
          label='Сумма'
          name='amount'
          onChange={onChange}
          value={state.amount}
          variant='outlined'
          sx={{ ...inputStyle, width: '55%' }}
        />
      </div>
      <div className='studentsDetail__form-inputs'>
        <TextField
          id='outlined-basic'
          label='Наличные'
          name='cash'
          onChange={onChange}
          value={state.cash}
          variant='outlined'
          sx={{ ...inputStyle, width: '33.3%' }}
        />
        <TextField
          id='outlined-basic'
          label='Перевод'
          name='transfer'
          onChange={onChange}
          value={state.transfer}
          variant='outlined'
          sx={{ ...inputStyle, width: '33.3%' }}
        />
        <TextField
          id='outlined-basic'
          label='Онлайн'
          name='online'
          onChange={onChange}
          value={state.online}
          variant='outlined'
          sx={{ ...inputStyle, width: '33.3%' }}
        />
      </div>
      <div className='studentsDetail__form-inputs'>
        <TextField
          id='outlined-basic'
          label='Комментарий'
          name='comment'
          onChange={onChange}
          value={state.comment}
          variant='outlined'
          sx={{ ...inputStyle, width: '100%' }}
        />
      </div>
      <div className='dataTeacher__row'>
        <button
          className='dataTeacher__row-button'
          type='button'
          // onClick={() => navigate('/teacher-table')}
        >
          Отменить
        </button>
        <button
          className='dataTeacher__row-button add'
          disabled={!isAllFieldsFilled(state)}
        >
          Сохранить
        </button>
      </div>
    </form>
  );
};
