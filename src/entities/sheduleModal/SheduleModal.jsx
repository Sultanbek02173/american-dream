import ReactDOM from 'react-dom';
import './sheduleModal.scss';
import { AnimatePresence, motion } from 'framer-motion';

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
            className='row sheduleModal_container'
            onClick={e => e.stopPropagation()}
          >
            <h2>Добавить занятие</h2>
            <form onSubmit={handleSubmit} className='forms'>
              <div>
                <input type='text' name='text' />
                <input type='text' name='text' />
              </div>
              <div>
                <input type='text' name='text' />
                <input type='text' name='text' />
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
