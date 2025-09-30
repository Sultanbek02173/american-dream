import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { useEffect, useState, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import bilol from '../../pages/admin/studentsDetail/image.jpg';
import { eventHandler } from '../../shared/utils/eventHandlers';
import { inputStyle, menuItemStyle } from '../../shared/utils/MuiStyles';
import { useDispatch } from 'react-redux';
import {
  getStudentList,
  getStudentProfile,
  updateStudentProfile,
} from '../../app/store/admin/students/studentsThunk';
import { useStudents } from '../../app/store/admin/students/studentsSlice';
import Cookies from 'js-cookie';

export const StudentProfile = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const { studentProfile: profile, directions } = useStudents();
  const { id } = useParams();

  const role = Cookies.get('role');
  const canSeeCredentials = useMemo(
    () => ['Administrator', 'Manager'].includes(role),
    [role]
  );
  const canEdit = canSeeCredentials;

  const [state, setState] = useState(profile);
  const [value, setValue] = useState(profile?.direction ?? 'mentalArithmetic');
  const [touched, setTouched] = useState(false);

  // локально храним выбранный файл и превью
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');

  useEffect(() => {
    if (id) dispatch(getStudentProfile(id));
  }, [dispatch, id]);

  useEffect(() => {
    setState(profile);
    if (profile?.direction) setValue(profile.direction);
    setTouched(false);
    setAvatarFile(null);
    setAvatarPreview('');
  }, [profile]);

  useEffect(() => {
    setState(prev =>
      prev ? { ...prev, direction: value } : { direction: value }
    );
  }, [value]);

  const baseOnChange = eventHandler(setState);
  const onChange = e => {
    if (!canEdit) return;
    if (!touched) setTouched(true);
    baseOnChange(e);
  };

  const handleChange = e => {
    if (!canEdit) return;
    if (!touched) setTouched(true);
    setValue(e.target.value);
  };

  // выбор нового аватара
  const onAvatarChange = e => {
    if (!canEdit) return;
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    // if (file.size > 5 * 1024 * 1024) return; // пример лимита 5MB

    setAvatarFile(file);
    setTouched(true);

    const reader = new FileReader();
    reader.onload = ev => setAvatarPreview(String(ev.target?.result || ''));
    reader.readAsDataURL(file);
  };

  const handleEdit = async () => {
    if (!canEdit) return;
    try {
      const payload = { ...(state || {}) };

      // не отправляем креды если нельзя
      if (!canSeeCredentials) {
        delete payload.username;
        delete payload.password;
      }

      payload.direction = value;

      // имя поля под файл — подстройте под ваш бэкенд (avatarka/avatar и т.п.)
      console.log(avatarFile);
      
      if (avatarFile) payload.avatarka = avatarFile;

      await dispatch(updateStudentProfile({ id, data: payload })).unwrap();
      setTouched(false);
      setAvatarFile(null);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    dispatch(getStudentList());
  }, [dispatch]);

  const avatarSrc =
    avatarPreview || profile?.avatarka_url || profile?.avatarka || bilol;

  const lockSelectProps = !canEdit
    ? {
        onOpen: e => e.preventDefault(),
        onMouseDown: e => e.preventDefault(),
        onKeyDown: e => e.preventDefault(),
        sx: { cursor: 'default' },
        IconComponent: props => (
          <span {...props} style={{ pointerEvents: 'none' }} />
        ),
      }
    : {};

  return (
    <form className='studentsDetail__form'>
      <div
        role='button'
        tabIndex={0}
        aria-label='Изменить аватар'
        title={canEdit ? 'Нажмите, чтобы выбрать изображение' : ''}
        onClick={() => canEdit && fileInputRef.current?.click()}
        onKeyDown={e => {
          if (!canEdit) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
        
      >
        <img className='studentsDetail__form-avatar' src={avatarSrc} alt='' />
        {canEdit && (
          <div
            className='avatar__overlay'
            style={{
              position: 'absolute',
              inset: 0,
              display: 'grid',
              placeItems: 'center',
              background: 'rgba(0,0,0,0.35)',
              color: '#fff',
              fontSize: 14,
              opacity: 0,
              transition: 'opacity .2s ease',
              borderRadius: '50%', // уберите, если аватар не круглый
              pointerEvents: 'none',
            }}
          >
            Нажмите, чтобы изменить
          </div>
        )}
        <input
          ref={fileInputRef}
          type='file'
          accept='image/*'
          style={{ display: 'none' }}
          onChange={onAvatarChange}
        />
      </div>

      <div className='studentsDetail__form-inputs'>
        <TextField
          label='Имя'
          name='first_name'
          onChange={onChange}
          value={state?.first_name ?? ''}
          variant='outlined'
          inputProps={{ readOnly: !canEdit }}
          sx={{ ...inputStyle, width: '45%' }}
        />
        <TextField
          label='Фамилия'
          name='last_name'
          onChange={onChange}
          value={state?.last_name ?? ''}
          variant='outlined'
          inputProps={{ readOnly: !canEdit }}
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
          inputProps={{ readOnly: !canEdit }}
          sx={{ ...inputStyle, width: '55%' }}
        />
        <TextField
          label='Телефон номер'
          name='phone'
          onChange={onChange}
          value={state?.phone ?? ''}
          variant='outlined'
          inputProps={{ readOnly: !canEdit }}
          sx={{ ...inputStyle, width: '45%' }}
        />
      </div>

      {canSeeCredentials && (
        <div className='studentsDetail__form-inputs'>
          <TextField
            label='Логин'
            name='username'
            onChange={onChange}
            value={state?.username ?? ''}
            variant='outlined'
            inputProps={{ readOnly: !canEdit }}
            sx={{ ...inputStyle, width: '45%' }}
          />
          <TextField
            label='Пароль'
            name='password'
            type='password'
            onChange={onChange}
            value={state?.password ?? ''}
            variant='outlined'
            inputProps={{ readOnly: !canEdit }}
            sx={{ ...inputStyle, width: '55%' }}
          />
        </div>
      )}

      <div className='studentsDetail__form-inputs'>
        <TextField
          label='Преподаватель'
          name='teacher'
          onChange={onChange}
          value={state?.teacher ?? ''}
          variant='outlined'
          inputProps={{ readOnly: !canEdit }}
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
            {...lockSelectProps}
          >
            {(directions ?? []).map(direction => (
              <MenuItem key={direction} value={direction} sx={menuItemStyle}>
                {direction}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {touched && canEdit && (
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
