import ReactDOM from 'react-dom';
import './sheduleModal.scss';
import { AnimatePresence, motion } from 'framer-motion';
import TextField from '@mui/material/TextField';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { menuItemStyle } from '../../shared/utils/MuiStyles';

export const SheduleModal = ({ open, setOpen, lesson }) => {
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

  const style = {
    input: {
      width: '345px',
      height: '100%',
      color: '#fff',
    },
    label: {
      color: '#ffffff83',
    },
    '& label.Mui-focused': {
      color: '#fff',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#fff',
      },
      '&:hover fieldset': {
        borderColor: '#fff',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#2de920',
      },
    },
  };

  const handleSubmit = e => {
    e.preventDefault();
    setOpen(false);
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
            <form onSubmit={handleSubmit} className='forms'>
              <div className='forms_left'>
                <FormControl
                  sx={{
                    width: '570px',
                    height: '100%',
                    label: {
                      color: '#ffffff83',
                    },
                    '& label.Mui-focused': {
                      color: '#fff',
                    },
                    '& .MuiOutlinedInput-root': {
                      color: '#fff',
                      '& fieldset': {
                        borderColor: '#fff',
                      },
                      '&:hover fieldset': {
                        borderColor: '#fff',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#2de920',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#fff',
                    },
                    '& .Mui-focused .MuiInputLabel-root': {
                      color: '#fff',
                    },
                  }}
                >
                  <InputLabel id='demo-simple-select-label'>
                    Название занятия
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={value}
                    label='Название занятия'
                    onChange={handleChange}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          backgroundColor: '#313131',
                          color: '#fff',
                        },
                      },
                    }}
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
                <TextField
                  id='outlined-basic'
                  label='Группа'
                  variant='outlined'
                  sx={style}
                />
              </div>
              <div className='forms_right'>
                <TextField
                  id='outlined-basic'
                  label='Преподаватель'
                  variant='outlined'
                  sx={style}
                />
                <TextField
                  id='outlined-basic'
                  label='Примечание'
                  variant='outlined'
                  sx={style}
                />
              </div>
              <div className='row forms_btn'>
                <button type='button' onClick={() => setOpen(!open)}>
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
