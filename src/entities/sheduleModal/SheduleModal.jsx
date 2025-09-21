import ReactDOM from 'react-dom';
import './sheduleModal.scss';
import { AnimatePresence, motion } from 'framer-motion';
import TextField from '@mui/material/TextField';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import {
  firstTextFieldSx,
  menuItemStyle,
  secondTextFieldSx,
  selectSx,
} from '../../shared/utils/MuiStyles';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object({
  lessonName: yup.string().required('Выберите занятие'),
  group: yup.string().required('Введите группу'),
  teacher: yup.string().required('Введите имя преподавателя'),
  note: yup.string(),
  duration: yup.number().required('Укажите длительность').min(1).max(5),
});

export const SheduleModal = ({ open, setOpen, createSchedule, cellInfo }) => {
  const initial = {
    hidden: {
      x: -800,
      opacity: 0,
      transition: { duration: 0.3 },
    },
    visibly: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      x: -800,
      opacity: 0,
      transition: { duration: 0.5 },
    },
  };

  const [value, setValue] = useState('');
  const handleChange = event => {
    setValue(event.target.value);
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    if (!cellInfo) return;

    const payload = {
      classroom_id: cellInfo.roomIndex + 1,
      date: cellInfo.date,
      direction: data.lessonName,
      duration: data.duration,
      group: data.group,
      note: data.note,
      roomIndex: cellInfo.roomIndex,
      teacher: data.teacher,
      time: cellInfo.time,
    };

    createSchedule(payload);
    setOpen(false);
    reset();
  };

  return ReactDOM.createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className='sheduleModal'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            variants={initial}
            initial='hidden'
            animate='visibly'
            exit='exit'
            className='sheduleModal_container'
            onClick={e => e.stopPropagation()}
          >
            <h2>Добавить занятие</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='forms'>
              <div className='forms_left'>
                <Controller
                  name='lessonName'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <FormControl sx={selectSx} error={!!errors.lessonName}>
                      <InputLabel>Название занятия</InputLabel>
                      <Select
                        {...field}
                        sx={{ color: '#fff' }}
                        label='Название занятия'
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              backgroundColor: '#313131',
                              color: '#fff',
                            },
                          },
                        }}
                      >
                        <MenuItem value='Англиский' sx={menuItemStyle}>
                          Английский
                        </MenuItem>
                        <MenuItem
                          value='Ментальная арифметика'
                          sx={menuItemStyle}
                        >
                          Ментальная арифметика
                        </MenuItem>
                        <MenuItem value='Робототехника' sx={menuItemStyle}>
                          Робототехника
                        </MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />

                <Controller
                  name='group'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label='Группа'
                      variant='outlined'
                      sx={secondTextFieldSx}
                      error={!!errors.group}
                    />
                  )}
                />

                <Controller
                  name='duration'
                  control={control}
                  defaultValue={1}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type='number'
                      label='Длительность (часов)'
                      variant='outlined'
                      sx={secondTextFieldSx}
                      error={!!errors.duration}
                      inputProps={{ min: 1, max: 5 }}
                    />
                  )}
                />
              </div>

              <div className='forms_right'>
                <Controller
                  name='teacher'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label='Преподаватель'
                      variant='outlined'
                      sx={firstTextFieldSx}
                      error={!!errors.teacher}
                    />
                  )}
                />

                <Controller
                  name='note'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label='Примечание'
                      variant='outlined'
                      sx={secondTextFieldSx}
                    />
                  )}
                />
              </div>

              <div className='row forms_btn'>
                <button
                  type='button'
                  onClick={() => {
                    setOpen(false);
                    reset();
                  }}
                >
                  Отменить
                </button>
                <button type='submit'>Добавить</button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById('modal-root')
  );
};
