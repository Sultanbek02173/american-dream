import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import bilol from '../../../../pages/admin/studentsDetail/logo_user.svg';

import { eventHandler } from '../../../../shared/utils/eventHandlers';
import {
  formControlStyle,
  inputStyle,
  menuItemStyle,
} from '../../../../shared/utils/MuiStyles';
import { useDispatch } from 'react-redux';
import {
  getTeacherProfile,
  updateTeacherProfile,
} from '../../../../app/store/admin/teacher/teacherThunk';
import { useTeachers } from '../../../../app/store/admin/teacher/teachersSlice';
import { getDirections, getGroups } from '../../../../app/store/admin/entities/entitiesThunk';
import { useEntities } from '../../../../app/store/admin/entities/entitiesSlice';

const condenseSpaces = (s = '') => s.replace(/\s+/g, ' ').trim();

const splitFullName = full => {
  const clean = condenseSpaces(full || '');
  if (!clean) return { first_name: '', last_name: '' };
  const parts = clean.split(' ');
  const first = parts[0] || '';
  const last = parts.slice(1).join(' ') || '';
  return { first_name: first, last_name: last };
};

const makeDiff = (original = {}, current = {}) => {
  const diff = {};
  const keys = new Set([
    ...Object.keys(original || {}),
    ...Object.keys(current || {}),
  ]);
  for (const k of keys) {
    if (
      k === 'avatarka' ||
      k === 'avatarka_url' ||
      k === 'image' ||
      k === 'full_name'
    )
      continue;
    const a = original?.[k];
    const b = current?.[k];
    if (a !== b) diff[k] = b;
  }
  return diff;
};

export const DataTeacherDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const { groups, directions } = useEntities();
  const { teacherDetail } = useTeachers();
  const { id } = useParams();

  // локальный state со всеми полями с бэка
  const [state, setState] = useState(teacherDetail);
  const onChange = eventHandler(setState);

  // отдельный контрол для направления (как у ученика)
  const [direction, setDirection] = useState(teacherDetail?.direction ?? '');

  // редактируемое поле "ФИО" (отдельно от state.first_name / state.last_name)
  const [fullName, setFullName] = useState('');

  const [touched, setTouched] = useState(false);

  // файл аватара + превью
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');

  /* ---------- загрузка профиля ---------- */
  useEffect(() => {
    if (id) dispatch(getTeacherProfile(id));
  }, [dispatch, id]);

  /* ---------- подстановка данных из бэка ---------- */
  useEffect(() => {
    setState(teacherDetail);
    setDirection(teacherDetail?.direction ?? '');

    // собрать ФИО для инпута из двух полей
    const fn = condenseSpaces(
      [teacherDetail?.first_name, teacherDetail?.last_name]
        .filter(Boolean)
        .join(' ')
    );
    setFullName(fn);

    setTouched(false);
    setAvatarFile(null);
    setAvatarPreview('');
  }, [teacherDetail]);

  /* ---------- синхронизация direction в state ---------- */
  useEffect(() => {
    setState(prev => (prev ? { ...prev, direction } : { direction }));
    dispatch(getGroups());
    dispatch(getDirections());
  }, [direction, dispatch]);

  /* ---------- Select-ы ---------- */
  const handleSelectChange = e => {
    const { name, value } = e.target;
    setTouched(true);
    if (name === 'direction') {
      setDirection(value);
    } else {
      setState(prev => ({ ...prev, [name]: value }));
    }
  };

  /* ---------- Аватар ---------- */
  const onAvatarChange = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    setAvatarFile(file);
    setTouched(true);

    const reader = new FileReader();
    reader.onload = ev => setAvatarPreview(String(ev.target?.result || ''));
    reader.readAsDataURL(file);
  };

  /* ---------- Сохранение ---------- */
  const handleSave = async () => {
    try {
      // 1) Сформировать first_name / last_name из fullName
      const { first_name, last_name } = splitFullName(fullName);

      // 2) Сконструировать базовый объект для diff
      const base = {
        ...(state || {}),
        direction,
        first_name,
        last_name,
      };

      // 3) Собрать только изменившиеся поля
      const payload = makeDiff(teacherDetail, base);

      // 4) Добавить файл, только если выбран новый
      if (avatarFile) {
        payload.avatarka = avatarFile; // имя поля как в бэке
      }

      // 5) Если нечего отправлять — выходим
      if (!avatarFile && Object.keys(payload).length === 0) {
        setTouched(false);
        return;
      }

      await dispatch(updateTeacherProfile({ id, data: payload })).unwrap();
      setTouched(false);
      setAvatarFile(null);
    } catch (e) {
      console.log(e);
    }
  };

  /* ---------- Источник картинки ---------- */
  const avatarSrc =
    avatarPreview ||
    teacherDetail?.avatarka_url ||
    teacherDetail?.avatarka ||
    bilol;

  return (
    <form onSubmit={e => e.preventDefault()} className='dataTeacher'>
      {/* Кликабельный аватар */}
      <div
        role='button'
        tabIndex={0}
        aria-label='Изменить аватар'
        title='Нажмите, чтобы выбрать изображение'
        onClick={() => fileInputRef.current?.click()}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
        style={{
          position: 'relative',
          display: 'inline-block',
          cursor: 'pointer',
          outline: 'none',
          marginBottom: 16,
          width: '100%',
        }}
      >
        <img className='studentsDetail__form-avatar' src={avatarSrc} alt='' />
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
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        >
          Нажмите, чтобы изменить
        </div>
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
          label='ФИО'
          name='full_name'
          onChange={e => {
            setTouched(true);
            setFullName(e.target.value);
          }}
          value={fullName}
          variant='outlined'
          sx={{ ...inputStyle, width: '100%' }}
        />
      </div>

      <div className='studentsDetail__form-inputs'>
        <TextField
          label='Телеграм'
          name='telegram'
          onChange={e => {
            setTouched(true);
            onChange(e);
          }}
          value={state?.telegram ?? ''}
          variant='outlined'
          sx={{ ...inputStyle, width: '55%' }}
        />
        <TextField
          label='Телефон номер'
          name='phone'
          onChange={e => {
            setTouched(true);
            onChange(e);
          }}
          value={state?.phone ?? ''}
          variant='outlined'
          sx={{ ...inputStyle, width: '45%' }}
        />
      </div>

      <div className='studentsDetail__form-inputs'>
        <TextField
          label='Логин'
          name='username'
          onChange={e => {
            setTouched(true);
            onChange(e);
          }}
          value={state?.username ?? ''}
          variant='outlined'
          sx={{ ...inputStyle, width: '45%' }}
        />
        <TextField
          label='Пароль'
          name='password'
          onChange={e => {
            setTouched(true);
            onChange(e);
          }}
          value={state?.password ?? ''}
          variant='outlined'
          sx={{ ...inputStyle, width: '55%' }}
        />
      </div>

      <div className='studentsDetail__form-inputs'>
        <FormControl sx={{ ...formControlStyle, width: '55%' }}>
          <InputLabel id='group-label'>Группа</InputLabel>
          <Select
            labelId='group-label'
            value={state?.group ?? ''}
            label='Группа'
            name='group'
            onChange={handleSelectChange}
          >
            {(groups ?? []).length ? (
              groups.map(g => (
                <MenuItem
                  key={g.id ?? g}
                  value={g.group_name ?? g}
                  sx={menuItemStyle}
                >
                  {g.group_name ?? g}
                </MenuItem>
              ))
            ) : (
              <MenuItem value='ENG-01' sx={menuItemStyle}>
                ENG-01
              </MenuItem>
            )}
          </Select>
        </FormControl>

        <FormControl sx={{ ...formControlStyle, width: '45%' }}>
          <InputLabel id='direction-label'>Направление</InputLabel>
          <Select
            labelId='direction-label'
            value={direction ?? ''}
            label='Направление'
            name='direction'
            onChange={handleSelectChange}
          >
            {(directions ?? []).length ? (
              (directions ?? []).map(d => (
                <MenuItem key={d.id} value={d.name} sx={menuItemStyle}>
                  {d.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem value='english' sx={menuItemStyle}>
                Нету данных
              </MenuItem>
            )}
          </Select>
        </FormControl>
      </div>

      <Box mt={2} className='dataTeacher__row' display='flex' gap={1}>
        <button
          className='dataTeacher__row-button'
          type='button'
          onClick={() => navigate('/teacher-table')}
        >
          Отменить
        </button>
        <button
          className='dataTeacher__row-button add'
          type='button'
          disabled={!touched}
          onClick={handleSave}
        >
          Сохранить
        </button>
      </Box>
    </form>
  );
};
