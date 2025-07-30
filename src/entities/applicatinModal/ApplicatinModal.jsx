import { IoIosArrowUp } from 'react-icons/io';
import './applicatinModal.scss';
import ReactDOM from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

export const ApplicatinModal = ({ open, setOpen, children }) => {
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
  useEffect(() => {
    const handleEsc = event => {
      if (event.keyCode === 27) {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return ReactDOM.createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className='modal'
          onClick={() => setOpen(false)}
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
            <>{children}</>

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
