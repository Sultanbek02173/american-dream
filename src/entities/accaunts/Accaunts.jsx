import { AnimatePresence, motion } from 'framer-motion';
import './accaunts.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import user from '../../shared/imgs/login/user.jpg';
import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../app/store/reducers/auth/AuthThunk';

export const Accaunts = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handlerLogaut = async () => {
    setOpen(false);
    try {
      await dispatch(logoutUser()).unwrap();
    } finally {
      navigate('/login', { replace: true });
    }
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
  return (
    <>
      {location.pathname === '/' && (
        <div className='accaunts_cont'>
          <div className='accaunts'>
            <div className='accaunts_main'>
              <div className='accaunts_main_img'>
                <img src={user} alt='' />
              </div>
              <div className='accaunts_main_name'>
                <h2>Дмитрий</h2>
                <p>000000000000@gmai.com</p>
              </div>
              <div
                className='accaunts_main_more'
                onClick={() => setOpen(!open)}
              >
                <IoIosArrowDown size={20} />
              </div>
            </div>
          </div>
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                className='accaunts_logout'
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                onClick={handlerLogaut}
              >
                <IoIosArrowBack size={26} color='#fff' />
                <button>Выйти с аккаунта</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
};
