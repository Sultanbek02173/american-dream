import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import bilol from '../../pages/admin/studentsDetail/image.jpg';
import { eventHandler } from '../../shared/utils/eventHandlers';
import { data } from '../../pages/admin/studentsTable/StudentsTable';
import { inputStyle, menuItemStyle } from '../../shared/utils/MuiStyles';

export const StudentProfile = () => {
  const { id } = useParams();
  const [value, setValue] = useState('mentalArithmetic');
  const detail = data.find(item => item.id == id);
  const { 0: state, 1: setState } = useState({
    id: null,
    image: bilol,
    first_name: 'Алина',
    last_name: 'Жумабаева',
    telegram: '@alin1244',
    phone: '+996 500 123 456',
    login: 'alinaknzzz12',
    password: 'r_12lfomt',
    teacher: 'Алия Калымбекова',
    direction: value,
  });

  useEffect(() => {
    setState(prev => ({ ...prev, direction: value }));
  }, [value]);

  const handleChange = event => {
    setValue(event.target.value);
  };
  const onChange = eventHandler(setState);

  return (
    <form className='studentsDetail__form'>
      <img className='studentsDetail__form-avatar' src={bilol} alt='' />
      <div className='studentsDetail__form-inputs'>
        <TextField
          id='outlined-basic'
          label='Имя'
          name='first_name'
          onChange={onChange}
          value={state.first_name}
          variant='outlined'
          sx={{ ...inputStyle, width: '45%' }}
        />
        <TextField
          id='outlined-basic'
          label='Фамилия'
          name='last_name'
          onChange={onChange}
          value={state.last_name}
          variant='outlined'
          sx={{ ...inputStyle, width: '55%' }}
        />
      </div>
      <div className='studentsDetail__form-inputs'>
        <TextField
          id='outlined-basic'
          label='Телеграм'
          name='telegram'
          onChange={onChange}
          value={state.telegram}
          variant='outlined'
          sx={{ ...inputStyle, width: '55%' }}
        />
        <TextField
          id='outlined-basic'
          label='Телефон номер'
          name='phone'
          onChange={onChange}
          value={state.phone}
          variant='outlined'
          sx={{ ...inputStyle, width: '45%' }}
        />
      </div>
      <div className='studentsDetail__form-inputs'>
        <TextField
          id='outlined-basic'
          label='Логин'
          name='login'
          onChange={onChange}
          value={state.login}
          variant='outlined'
          sx={{ ...inputStyle, width: '45%' }}
        />
        <TextField
          id='outlined-basic'
          label='Пароль'
          name='password'
          onChange={onChange}
          value={state.password}
          variant='outlined'
          sx={{ ...inputStyle, width: '55%' }}
        />
      </div>
      <div className='studentsDetail__form-inputs'>
        <TextField
          id='outlined-basic'
          label='Преподаватель'
          name='teacher'
          onChange={onChange}
          value={state.teacher}
          variant='outlined'
          sx={{ ...inputStyle, width: '55%' }}
        />
        {/* <TextField
              id="outlined-basic"
              label="Фамилия"
              value={"Жумабаева"}
              variant="outlined"
              sx={{ ...inputStyle, width: "45%" }}
            /> */}
        <FormControl
          sx={{
            width: '45%',
            height: '100%',
            opacity: '60%',
            '& .MuiOutlinedInput-root': {
              color: '#fff', // цвет текста
              '& fieldset': {
                borderColor: '#fff', // обычная граница
              },
              '&:hover fieldset': {
                borderColor: '#fff', // при наведении
              },
              '&.Mui-focused fieldset': {
                borderColor: '#fff', // при нажатии/фокусе (например, оранжевый)
              },
            },
            '& .MuiInputLabel-root': {
              color: '#fff', // цвет label по умолчанию
            },
            '& .Mui-focused .MuiInputLabel-root': {
              color: '#fff', // цвет label при фокусе
            },
          }}
        >
          <InputLabel id='demo-simple-select-label'>Направление</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={value}
            label='Направление'
            name='direction'
            onChange={handleChange}
          >
            <MenuItem value='english' sx={menuItemStyle}>
              Английский
            </MenuItem>
            <MenuItem value='mentalArithmetic' sx={menuItemStyle}>
              Ментальная арифметика
            </MenuItem>
            <MenuItem value='robotics' sx={menuItemStyle}>
              Робототехника
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    </form>
  );
};
