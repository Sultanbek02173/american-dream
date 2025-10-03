import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import openIcon from './open.svg';
import closeIcon from './close.svg';

export const ReportTablePlan = ({ syllabus }) => {
  const [isVisible, setVisible] = useState(null);

  const toggleVisibility = id => {
    setVisible(prev => (prev === id ? null : id));
  };

  return (
    <div className='reportTablePlan'>
      {syllabus?.map(student => {
        const isOpen = isVisible === student.id;

        return (
          <div
            key={student.id}
            className='reportTablePlan__item'
            onClick={() => toggleVisibility(student.id)}
          >
            <div
              className='reportTablePlan__item-head'
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <h3>{`Месяц ${student.month_number} ${student.title}`}</h3>
              <img
                src={isOpen ? closeIcon : openIcon}
                alt='toggle'
                style={{ width: '24px', height: '24px' }}
              />
            </div>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className='reportTablePlan__item_content'>
                    {student.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
