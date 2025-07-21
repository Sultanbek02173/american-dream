import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './sideBar.scss';
import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io';
import { removeRole } from '../../shared/hooks/auth';
import { motion, AnimatePresence } from 'framer-motion';
import user from '../../shared/imgs/login/user.jpg';
import { useState } from 'react';

export const SideBar = ({ routes }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handlerLogaut = () => {
    removeRole();
    navigate('/login');
    window.location.reload();
  };
  return (
    <aside className='sideBar'>
      <h2 className='logo'>AD</h2>

      <div className='sideBar__main'>
        <div className='sideBar__links'>
          {routes?.map(route => {
            const isActive = location.pathname === route.link;
            return (
              <div className='linkWrapper' key={route.id}>
                <NavLink to={route.link} className='link'>
                  {isActive && (
                    <motion.div
                      layoutId='activeIndicator'
                      className='active-indicator'
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                  <img src={route.img} alt='' />
                </NavLink>
              </div>
            );
          })}
        </div>
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
                >
                  <IoIosArrowBack color='#fff' />
                  <button onClick={handlerLogaut}>Выйти с аккаунта</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </aside>
  );
};
