import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTeachers } from '../../../app/store/admin/teacher/teachersSlice';
import { getTeacherList } from '../../../app/store/admin/teacher/teacherThunk';
import { eventHandler } from '../../../shared/utils/eventHandlers';
import {
  datePickerPopperSx,
  datePickerTextFieldSx,
  inputStyle,
} from '../../../shared/utils/MuiStyles';
import dayjs from 'dayjs';
import { createExpenses } from '../../../app/store/admin/historyPayments/historyPaymentsThunks';

const normalizeToDayjs = value => {
  if (value == null || value === '') return null;
  if (dayjs.isDayjs?.(value)) return value;
  const day = dayjs(value);
  return day.isValid() ? day : null;
};

const AddExpense = () => {
  const dispatch = useDispatch();
  const { teacherList } = useTeachers();
  const { 0: state, 1: setState } = useState({
    description: '',
    amount: '',
    date: '',
    category: '',
    teacher: '',
  });
  const safeDate = normalizeToDayjs(state.date);

  const onChange = eventHandler(setState);
  const onSubmit = async event => {
    event.preventDefault();

    try {
      await dispatch(
        createExpenses({
          ...state,
          date: safeDate ? safeDate.format('YYYY-MM-DD') : null,
        })
      ).unwrap();
      setState({
        description: '',
        amount: '',
        date: '',
        category: '',
        teacher: '',
      });
    } catch (err) {
      console.error(err);
    }
  };
  console.log(state);

  const menuItemHoverStyle = {
    '&:hover': {
      backgroundColor: '#2DE920',
      color: '#fff',
    },
  };

  useEffect(() => {
    dispatch(getTeacherList());
  }, []);

  return (
    <section>
      <div className='container'>
        <h2 className='registration__title'>Добавить Расход</h2>
        <form onSubmit={onSubmit}>
          <div className='studentsDetail__form-inputs'>
            <TextField
              label='Название расхода'
              name='description'
              onChange={onChange}
              value={state.description}
              variant='outlined'
              sx={{ ...inputStyle, width: '55%' }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                // sx={{ borderColor: '#fff' }}
                label='Дата оплаты'
                value={safeDate}
                onChange={v =>
                  setState(p => ({
                    ...p,
                    date: normalizeToDayjs(v),
                  }))
                }
                slotProps={{
                  textField: { sx: datePickerTextFieldSx },
                  popper: { sx: datePickerPopperSx },
                }}
              />
            </LocalizationProvider>
          </div>

          <div className='studentsDetail__form-inputs'>
            <FormControl
              sx={{
                width: '50%',
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
              <InputLabel id='category-label'>Категории</InputLabel>
              <Select
                labelId='category-label'
                id='category'
                label='Категории'
                name='category'
                value={state.category}
                onChange={onChange}
                // error={!!errors?.teacher}
              >
                <MenuItem value='' sx={menuItemHoverStyle}>
                  Все категории
                </MenuItem>
                <MenuItem value='salary' sx={menuItemHoverStyle}>
                  Зарплата
                </MenuItem>
                <MenuItem value='rent' sx={menuItemHoverStyle}>
                  Аренда
                </MenuItem>
                <MenuItem value='marketing' sx={menuItemHoverStyle}>
                  Маркетинг
                </MenuItem>
                <MenuItem value='office' sx={menuItemHoverStyle}>
                  Хозяйственные
                </MenuItem>
                <MenuItem value='other' sx={menuItemHoverStyle}>
                  Другое
                </MenuItem>
              </Select>
            </FormControl>
            <TextField
              label='Сумма'
              name='amount'
              onChange={onChange}
              value={state.amount}
              variant='outlined'
              sx={{ ...inputStyle, width: '50%' }}
            />
          </div>
          {state.category === 'salary' && (
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
                <InputLabel id='student-label'>Преподаватель</InputLabel>
                <Select
                  labelId='teacher-label'
                  id='teacher'
                  label='Преподаватель'
                  name='teacher'
                  value={state.teacher}
                  onChange={onChange}
                  // error={!!errors?.teacher}
                >
                  <MenuItem value='' sx={menuItemHoverStyle}>
                    Все преподаватели
                  </MenuItem>
                  {teacherList?.map(s => (
                    <MenuItem
                      key={s.id}
                      value={String(s.id)}
                      sx={menuItemHoverStyle}
                    >
                      {s.full_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          )}
          <div className='dataTeacher__row' style={{ marginBottom: '40px' }}>
            <button
              className='dataTeacher__row-button'
              type='button'
              onClick={() =>
                setState({
                  description: '',
                  amount: '',
                  date: '',
                  category: '',
                  teacher: '',
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
  );
};

export default AddExpense;
