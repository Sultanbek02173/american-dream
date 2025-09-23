import { AnimatePresence, motion } from 'framer-motion';
import './works.scss';
import { useState } from 'react';
import { TextField } from '@mui/material';
import { inputStyle } from '../../../../shared/utils/MuiStyles';

export const Works = ({ deadLine, homework_requirements }) => {
  const [open, setOpen] = useState(false);

  const formateDate = time => {
    if (!time) return 'dd.mm.yyyy hh:mm';
    const d = new Date(time);
    const s = new Intl.DateTimeFormat('ru-RU', {
      timeZone: 'Asia/Bishkek',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(d);
    return s.replace(',', '');
  };

  return (
    <section className='works'>
      <div className='works_home'>
        <div className='row works_home_header' onClick={() => setOpen(!open)}>
          <h2>Домашнее задание</h2>
          <p>Дедлайн: {formateDate(deadLine)}</p>
        </div>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className='works_home_content'>{homework_requirements}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className='works_link'>
        <h2>Прикрепить домашнее задание</h2>
        <div className='works_link_input'>
          <TextField
            sx={inputStyle}
            id='outlined-basic'
            label='Ссылка на проект:'
            variant='outlined'
          />
          <p className='works_link_limit'>Максимум 5 ссылок</p>
        </div>

        <TextField
          sx={inputStyle}
          id='outlined-basic'
          label='Прикрепить файл:'
          variant='outlined'
        />
        <p className='works_link_limit'>Максимум 5 ссылок</p>
      </div>
    </section>
  );
};
