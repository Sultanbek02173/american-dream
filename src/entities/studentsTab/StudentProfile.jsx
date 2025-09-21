import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import bilol from '../../pages/admin/studentsDetail/image.jpg';
import { eventHandler } from '../../shared/utils/eventHandlers';
import { data } from '../../pages/admin/studentsTable/StudentsTable';
import { inputStyle, menuItemStyle } from '../../shared/utils/MuiStyles';
import { useDispatch } from 'react-redux';
import {
  getStudentList,
  getStudentProfile /* updateStudentProfile */,
  updateStudentProfile,
} from '../../app/store/admin/students/studentsThunk';
import { useStudents } from '../../app/store/admin/students/studentsSlice';

export const StudentProfile = () => {
  const dispatch = useDispatch();
  const { studentProfile: profile, directions } = useStudents();
  const { id } = useParams();

  const [state, setState] = useState(profile);
  const [value, setValue] = useState(profile?.direction ?? 'mentalArithmetic');
  console.log(state);

  const [touched, setTouched] = useState(false);

  const detail = data.find(item => String(item.id) === String(id));

  useEffect(() => {
    dispatch(getStudentProfile(id));
  }, [dispatch, id]);

  useEffect(() => {
    setState(profile);
    if (profile?.direction) setValue(profile.direction);
    setTouched(false);
  }, [profile]);

  useEffect(() => {
    setState(prev =>
      prev ? { ...prev, direction: value } : { direction: value }
    );
  }, [value]);

  const baseOnChange = eventHandler(setState);
  const onChange = e => {
    if (!touched) setTouched(true);
    baseOnChange(e);
  };

  const handleChange = event => {
    if (!touched) setTouched(true);
    setValue(event.target.value);
  };

  const handleEdit = async () => {
    try {
      await dispatch(updateStudentProfile({ id, data: state })).unwrap();
      setTouched(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    dispatch(getStudentList());
  }, []);

  return (
    <form className='studentsDetail__form'>
      <img className='studentsDetail__form-avatar' src={bilol} alt='' />

      <div className='studentsDetail__form-inputs'>
        <TextField
          label='Имя'
          name='first_name'
          onChange={onChange}
          value={state?.first_name ?? ''}
          variant='outlined'
          sx={{ ...inputStyle, width: '45%' }}
        />
        <TextField
          label='Фамилия'
          name='last_name'
          onChange={onChange}
          value={state?.last_name ?? ''}
          variant='outlined'
          sx={{ ...inputStyle, width: '55%' }}
        />
      </div>

      <div className='studentsDetail__form-inputs'>
        <TextField
          label='Телеграм'
          name='telegram'
          onChange={onChange}
          value={state?.telegram ?? ''}
          variant='outlined'
          sx={{ ...inputStyle, width: '55%' }}
        />
        <TextField
          label='Телефон номер'
          name='phone'
          onChange={onChange}
          value={state?.phone ?? ''}
          variant='outlined'
          sx={{ ...inputStyle, width: '45%' }}
        />
      </div>

      <div className='studentsDetail__form-inputs'>
        <TextField
          label='Логин'
          name='username'
          onChange={onChange}
          value={state?.username ?? ''}
          variant='outlined'
          sx={{ ...inputStyle, width: '45%' }}
        />
        <TextField
          label='Пароль'
          name='password'
          onChange={onChange}
          value={state?.password ?? ''}
          variant='outlined'
          sx={{ ...inputStyle, width: '55%' }}
        />
      </div>

      <div className='studentsDetail__form-inputs'>
        <TextField
          label='Преподаватель'
          name='teacher'
          onChange={onChange}
          value={state?.teacher ?? ''}
          variant='outlined'
          sx={{ ...inputStyle, width: '55%' }}
        />
        <FormControl
          sx={{
            width: '45%',
            height: '100%',
            opacity: 0.6,
            '& .MuiOutlinedInput-root': {
              color: '#fff',
              '& fieldset': { borderColor: '#fff' },
              '&:hover fieldset': { borderColor: '#fff' },
              '&.Mui-focused fieldset': { borderColor: '#fff' },
            },
            '& .MuiInputLabel-root': { color: '#fff' },
            '& .MuiInputLabel-root.Mui-focused': { color: '#fff' },
          }}
        >
          <InputLabel id='direction-label'>Направление</InputLabel>
          <Select
            labelId='direction-label'
            id='direction'
            value={value}
            label='Направление'
            name='direction'
            onChange={handleChange}
          >
            {directions?.map(direction => {
              return (
                <MenuItem value={direction} sx={menuItemStyle}>
                  {direction}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>

      {touched && (
        <Box mt={2} textAlign='right'>
          <Button
            className='dataTeacher__row-button add'
            variant='contained'
            onClick={handleEdit}
            
          >
            Редактировать
          </Button>
        </Box>
      )}
    </form>
  );
};
