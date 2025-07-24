import { NavLink, useLocation } from 'react-router-dom';
import './sideBar.scss';
import { AnimatePresence, motion } from 'framer-motion';

export const SideBar = ({ routes }) => {
  const location = useLocation();

  const sidebarVariants = {
    hidden: {
      x: -200,
      opacity: 0,
      transition: { duration: 0.3 },
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      x: -200,
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <AnimatePresence>
      {location.pathname !== '/applications' && (
        <motion.aside
          variants={sidebarVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
          className='sideBar'
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
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
