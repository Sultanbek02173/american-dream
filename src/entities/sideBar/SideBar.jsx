import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './sideBar.scss';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../app/store/reducers/auth/AuthThunk';
import { useAccaunt } from '../../app/store/reducers/accaunt/accauntSlice';
import { FiLogOut } from 'react-icons/fi';

export const SideBar = ({ routes, isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false);
  const { accaunt } = useAccaunt();

  // ширина экрана
  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth <= 768);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // закрывать сайдбар по смене роута на мобилке
  useEffect(() => {
    if (isMobile && isOpen) onClose();
  }, [location.pathname]); // намеренно без isOpen/isMobile/onClose

  const handlerLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  // ✅ скрывать сайдбар только на мобилке для этих путей
  const HIDE_PATHS = ['/applications', '/schedule'];
  const hideSidebar = isMobile && HIDE_PATHS.includes(location.pathname);

  if (hideSidebar) return null;

  return (
    <>
      {/* Оверлей только на мобилке */}
      {isMobile && isOpen && (
        <div
          className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
          onClick={onClose}
        />
      )}

      {/* Сайдбар */}
      <motion.aside
        animate={{ x: isMobile ? (isOpen ? 0 : '-100%') : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`sideBar ${isMobile && isOpen ? 'open' : ''}`}
      >
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

          {/* Кнопка выхода только на мобилке */}
          {isMobile && (
            <div className='sideBar__logout'>
              <button
                style={{ padding: '10px 15px' }}
                className='sideBar__logout-btn'
                onClick={handlerLogout}
              >
                <FiLogOut size={25} />
              </button>
            </div>
          )}
        </div>
      </motion.aside>
    </>
  );
};
