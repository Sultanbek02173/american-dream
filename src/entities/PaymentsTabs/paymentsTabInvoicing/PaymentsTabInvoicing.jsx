import { useEffect, useState, useMemo } from 'react';
import { inputStyle } from '../../../shared/utils/MuiStyles';
import {
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormControl,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useStudents } from '../../../app/store/admin/students/studentsSlice';
import { getStudentList } from '../../../app/store/admin/students/studentsThunk';
import { PostPayments } from '../../../app/store/admin/historyPayments/historyPaymentsThunks';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// универсальный обработчик
const eventHandler = setState => e => {
  const { name, value, type, checked } = e.target;
  setState(prev => ({
    ...prev,
    [name]: type === 'checkbox' ? checked : value,
  }));
};

export const PaymentsTabInvoicing = () => {
  const dispatch = useDispatch();
  const { students } = useStudents();

  const [state, setState] = useState({
    student: '',
    direction: '',
    amount: '',
    cash: '',
    transfer: '',
    online: '',
    comment: '',
    discount: '',
    is_full_payment: false,
  });

  const onChange = eventHandler(setState);

  // Map для поиска студента
  const studentByUserId = useMemo(() => {
    const map = new Map();
    students?.forEach(s => {
      map.set(String(s.user_id), s);
    });
    return map;
  }, [students]);

  const isAllFieldsFilled = obj =>
    Object.entries(obj).every(([key, value]) => {
      if (['comment', 'discount', 'is_full_payment'].includes(key)) return true;
      return value !== '' && value !== null && value !== undefined;
    });

  const menuItemHoverStyle = {
    '&:hover': {
      backgroundColor: '#2DE920',
      color: '#fff',
    },
  };

  useEffect(() => {
    dispatch(getStudentList());
  }, [dispatch]);

  const onFormSubmit = async e => {
    e.preventDefault();

    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    const payload = {
      direction: String(state.direction ?? ''),
      amount: Number(state.amount) || 0,
      cash_amount: String(state.cash ?? ''),
      transfer_amount: String(state.transfer ?? ''),
      online_amount: String(state.online ?? ''),
      date: today,
      student_id: Number(state.student) || 0,
      group: 0,
      comment: String(state.comment ?? ''),
      discount: String(state.discount ?? ''),
      is_full_payment: Boolean(state.is_full_payment),
    };

    try {
      await dispatch(PostPayments(payload)).unwrap();

      toast.success('Платёж успешно добавлен!', {
        style: { background: 'black', color: 'white' },
      });

      setState({
        student: '',
        direction: '',
        amount: '',
        cash: '',
        transfer: '',
        online: '',
        comment: '',
        discount: '',
        is_full_payment: false,
      });
    } catch (err) {
      console.error('Ошибка при отправке платежа:', err);

      let message = 'Произошла ошибка при отправке.';

      // если с бэка пришёл detail
      if (err?.detail) {
        message = err.detail;
      }
      // если это объект вида { field: [ "ошибка", "ошибка2" ] }
      else if (typeof err === 'object' && err !== null) {
        message = Object.values(err).flat().join(', ');
      }
      // если просто строка
      else if (typeof err === 'string') {
        message = err;
      }
      // если ошибка в message
      else if (err?.message) {
        message = err.message;
      }

      toast.error(message, {
        style: { background: 'black', color: 'white' },
      });
    }
  };

  return (
    <>
      <form onSubmit={onFormSubmit} className='paymentsInvoicing'>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id='student-label' sx={{ color: '#fff' }}>
            Студент
          </InputLabel>
          <Select
            labelId='student-label'
            name='student'
            sx={{
              color: '#fff',
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#fff' },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#fff',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#2de920',
              },
            }}
            value={state.student}
            onChange={e => {
              const value = String(e.target.value);
              const st = studentByUserId.get(value);
              const inferredDirection = st?.direction || '';
              setState(prev => ({
                ...prev,
                student: value,
                direction: inferredDirection,
              }));
            }}
          >
            <MenuItem value='' sx={menuItemHoverStyle}>
              Все студенты
            </MenuItem>
            {students?.map(s => (
              <MenuItem
                key={s.id}
                value={String(s.user_id)}
                sx={menuItemHoverStyle}
              >
                {s.full_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Направление и сумма */}
        <div className='studentsDetail__form-inputs'>
          <FormControl sx={{ width: '45%' }}>
            <TextField
              label='Направление'
              name='direction'
              onChange={onChange}
              value={state.direction}
              variant='outlined'
              sx={inputStyle}
            />
          </FormControl>

          <FormControl sx={{ width: '55%' }}>
            <TextField
              label='Сумма'
              name='amount'
              type='number'
              onChange={onChange}
              value={state.amount}
              variant='outlined'
              sx={inputStyle}
            />
          </FormControl>
        </div>

        {/* Способы оплаты */}
        <div className='studentsDetail__form-inputs'>
          <FormControl sx={{ width: '33.3%' }}>
            <TextField
              label='Наличные'
              name='cash'
              type='number'
              onChange={onChange}
              value={state.cash}
              variant='outlined'
              sx={inputStyle}
            />
          </FormControl>

          <FormControl sx={{ width: '33.3%' }}>
            <TextField
              label='Перевод'
              name='transfer'
              type='number'
              onChange={onChange}
              value={state.transfer}
              variant='outlined'
              sx={inputStyle}
            />
          </FormControl>

          <FormControl sx={{ width: '33.3%' }}>
            <TextField
              label='Онлайн'
              name='online'
              type='number'
              onChange={onChange}
              value={state.online}
              variant='outlined'
              sx={inputStyle}
            />
          </FormControl>
        </div>

        <FormControl fullWidth sx={{ mt: 2, mb: '20px' }}>
          <TextField
            label='Комментарий'
            name='comment'
            onChange={onChange}
            value={state.comment}
            variant='outlined'
            sx={inputStyle}
          />
        </FormControl>

        <div className='dataTeacher__row'>
          <button
            className='dataTeacher__row-button'
            type='button'
            onClick={() =>
              setState({
                student: '',
                direction: '',
                amount: '',
                cash: '',
                transfer: '',
                online: '',
                comment: '',
                discount: '',
                is_full_payment: false,
              })
            }
          >
            Отменить
          </button>
          <button
            className='dataTeacher__row-button add'
            type='submit'
            disabled={!isAllFieldsFilled(state)}
          >
            Сохранить
          </button>
        </div>
      </form>

      {/* Toast */}
      <ToastContainer position='top-right' autoClose={4000} />
    </>
  );
};
