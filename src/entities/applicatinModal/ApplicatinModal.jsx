import { IoIosArrowUp } from 'react-icons/io';
import './applicatinModal.scss';
import ReactDOM from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

export const ApplicatinModal = ({ open, setOpen }) => {
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

  return ReactDOM.createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className='modal'
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
            className='row modal_container'
            onClick={e => e.stopPropagation()}
          >
            <div className='modal_container_user'>
              <h3>Айбек Калыков</h3>
              <p>+996 555 111 222</p>
              <p>ayibek45676@gmail.com</p>
              <p>Источник: Форма на сайте</p>
              <p>Подготовка к ОРТ</p>
            </div>
            <div className='modal_container_message'>
              <p>"Хотел бы узнать расписание и формат занятий"</p>
              <input type='text' name='user' placeholder='Аслан Караев' />
              <p>03.06.2025 — 12:42</p>
            </div>

            <p
              className='modal_container_close row'
              onClick={() => setOpen(false)}
            >
              Свернуть <IoIosArrowUp size={20} />
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById('modal-root')
  );
};
