import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useStudents } from '../../../app/store/admin/students/studentsSlice';
import { getStudentList } from '../../../app/store/admin/students/studentsThunk';
import {
  datePickerPopperSx,
  datePickerTextFieldSx,
  inputStyle,
} from '../../../shared/utils/MuiStyles';
import { eventHandler } from '../../../shared/utils/eventHandlers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import {
  AccountingExpenses,
  AccountingIncome,
  AccountingSettlements,
} from '../../../widgets';
import { AccountingFinancialResult } from '../../../widgets/accounting/accountingFinancialResult/AccountingFinancialResult';
import './accounting.scss';
import { PostHistoryPayments } from '../../../app/store/admin/historyPayments/historyPaymentsThunks';
import {
  getDirections,
  getGroups,
} from '../../../app/store/admin/entities/entitiesThunk';
import { useEntities } from '../../../app/store/admin/entities/entitiesSlice';

export const Accounting = () => {
  const dispatch = useDispatch();
  const { students } = useStudents();
  const { directions, groups } = useEntities();

  const [state, setState] = useState({
    id: 1,
    student: '',
    direction: '',
    amount: '',
    cash_amount: '',
    transfer_amount: '',
    online_amount: '',
    comment: '',
    discount: '',
    payment_date: null,
    is_full_payment: false,
  });
  // console.log(groups);

  const onChange = eventHandler(setState);

  const isAllFieldsFilled = obj =>
    Object.entries(obj).every(([key, value]) => {
      if (key === 'image' || key === 'id') return true;
      return value !== '' && value !== null && value !== undefined;
    });

  const onFormSubmit = async e => {
    e.preventDefault();
    const payload = {
      direction: Number(state.direction) || 0,
      cash_amount: String(state.cash_amount ?? ''),
      transfer_amount: String(state.transfer_amount ?? ''),
      online_amount: String(state.online_amount ?? ''),
      date: state.payment_date ? state.payment_date.format('YYYY-MM-DD') : null,
      student: Number(state.student) || 0,
      group: 0,
      comment: String(state.comment ?? ''),
      discount: String(state.discount ?? ''),
      is_full_payment: Boolean(state.is_full_payment),
    };
    try {
      await dispatch(PostHistoryPayments(payload)).unwrap();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    dispatch(getStudentList());
    dispatch(getDirections());
    dispatch(getGroups());
  }, [dispatch]);

  // Быстрый доступ: "user_id" -> объект студента
  const studentByUserId = useMemo(() => {
    return new Map((students ?? []).map(s => [String(s.user_id), s]));
  }, [students]);

  const menuItemHoverStyle = {
    '&:hover': {
      backgroundColor: '#2DE920',
      color: '#fff',
    },
  };

  return (
    <main className='accounting'>
      <section className='registration'>
        <div className='container'>
          <h2 className='registration__title'>Регистрация оплат</h2>
          <p className='registration__subtitle'>Регистрация новых оплат</p>

          <form onSubmit={onFormSubmit}>
            <div className='studentsDetail__form-inputs'>
              <FormControl
                sx={{
                  width: '100%',
                  height: '100%',
                  opacity: 0.6,
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    '& fieldset': { borderColor: '#fff' },
                    '&:hover fieldset': { borderColor: '#fff' },
                    '&.Mui-focused fieldset': { borderColor: '#2de920' },
                  },
                  '& .MuiInputLabel-root': { color: '#fff' },
                  '& .MuiInputLabel-root.Mui-focused': { color: '#2de920' },
                }}
              >
                <InputLabel id='student-label'>Студент</InputLabel>
                <Select
                  labelId='student-label'
                  id='student'
                  label='Студент'
                  name='student'
                  value={state.student}
                  onChange={e => {
                    const value = String(e.target.value);
                    const st = studentByUserId.get(value);
                    const inferredDirection = st?.direction;
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
            </div>

            <div className='studentsDetail__form-inputs'>
              <TextField
                label='Направление'
                name='direction'
                onChange={onChange}
                value={state.direction}
                variant='outlined'
                sx={{ ...inputStyle, width: '55%' }}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label='Дата оплаты'
                  value={state.payment_date}
                  onChange={v => setState(p => ({ ...p, payment_date: v }))}
                  slotProps={{
                    textField: { sx: datePickerTextFieldSx },
                    popper: { sx: datePickerPopperSx },
                  }}
                />
              </LocalizationProvider>
            </div>

            <div className='studentsDetail__form-inputs'>
              <TextField
                label='Наличные'
                name='cash_amount'
                onChange={onChange}
                value={state.cash_amount}
                variant='outlined'
                sx={{ ...inputStyle, width: '33.3%' }}
              />
              <TextField
                label='Перевод'
                name='transfer_amount'
                onChange={onChange}
                value={state.transfer_amount}
                variant='outlined'
                sx={{ ...inputStyle, width: '33.3%' }}
              />
              <TextField
                label='Онлайн'
                name='online_amount'
                onChange={onChange}
                value={state.online_amount}
                variant='outlined'
                sx={{ ...inputStyle, width: '33.3%' }}
              />
            </div>

            <div className='studentsDetail__form-inputs'>
              <TextField
                label='Комментарий'
                name='comment'
                onChange={onChange}
                value={state.comment}
                variant='outlined'
                sx={{ ...inputStyle, width: '45%' }}
              />
              <TextField
                label='Скидка'
                name='discount'
                onChange={onChange}
                value={state.discount}
                variant='outlined'
                sx={{ ...inputStyle, width: '55%' }}
              />
            </div>

            <div className='paymentType__tabs'>
              <div className='paymentType__tabs-item'>
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon sx={{ fontSize: 32 }} />}
                  checkedIcon={<CheckBoxIcon sx={{ fontSize: 32 }} />}
                  checked={!state.is_full_payment}
                  onChange={() =>
                    setState(p => ({ ...p, is_full_payment: false }))
                  }
                  sx={{
                    color: '#fff',
                    '&.Mui-checked': {
                      color: '#2DE920',
                    },
                  }}
                />
                <p>Частичная оплата</p>
              </div>
              <div className='paymentType__tabs-item'>
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon sx={{ fontSize: 32 }} />}
                  checkedIcon={<CheckBoxIcon sx={{ fontSize: 32 }} />}
                  checked={state.is_full_payment}
                  onChange={() =>
                    setState(p => ({ ...p, is_full_payment: true }))
                  }
                  sx={{
                    color: '#fff',
                    '&.Mui-checked': {
                      color: '#2DE920',
                    },
                  }}
                />
                <p>Полная оплата</p>
              </div>
            </div>

            <div className='dataTeacher__row'>
              <button
                className='dataTeacher__row-button'
                type='button'
                onClick={() =>
                  setState({
                    id: 1,
                    student: '',
                    direction: '',
                    amount: '',
                    cash_amount: '',
                    transfer_amount: '',
                    online_amount: '',
                    comment: '',
                    discount: '',
                  })
                }
              >
                Сбросить
              </button>
              <button className='dataTeacher__row-button add' type='submit'>
                Зарегистрировать оплату
              </button>
            </div>
          </form>
        </div>
      </section>

      <AccountingSettlements />
      <AccountingIncome />
      <AccountingExpenses />
      <AccountingFinancialResult />

      <section className='container'>
        <div className='popularityCourses_reload'>
          <p>
            Все отчёты генерируются автоматически на основе внесённых данных:
            оплаты учеников, проведённых занятий, ставок и расходов.
          </p>

          <div className='row popularityCourses_reload_btns'>
            <button>Отправить на почту Руководителя</button>
            <button>Скачать отчёт PDF</button>
          </div>
        </div>
      </section>
    </main>
  );
};
