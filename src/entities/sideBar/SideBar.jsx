import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './sideBar.scss';
import { motion, AnimatePresence } from 'framer-motion';

export const SideBar = ({ routes }) => {
  const location = useLocation();

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
      </div>
    </aside>
  );
};
