import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import openIcon from './open.svg';
import closeIcon from './close.svg';

export const ReportTablePlan = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      title:
        'Месяц 1: Введение в Web design, инструменты и основы, работа над первым сайтом.',
      description: 'Урок 1: Вводная лекция Урок 2: Все тренды дизайна...',
    },
    {
      id: 2,
      title:
        'Месяц 1: Введение в Web design, инструменты и основы, работа над первым сайтом.',
      description: 'Урок 1: Вводная лекция Урок 2: Все тренды дизайна...',
    },
    {
      id: 3,
      title:
        'Месяц 1: Введение в Web design, инструменты и основы, работа над первым сайтом.',
      description: 'Урок 1: Вводная лекция Урок 2: Все тренды дизайна...',
    },
  ]);

  const [isVisible, setVisible] = useState(null);

  const toggleVisibility = id => {
    setVisible(prev => (prev === id ? null : id));
  };

  return (
    <div className='reportTablePlan'>
      {students.map(student => {
        const isOpen = isVisible === student.id;

        return (
          <div key={student.id} className='reportTablePlan__item'>
            <div
              className='reportTablePlan__item-head'
              onClick={() => toggleVisibility(student.id)}
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <h3>{student.title}</h3>
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
                  <p className='reportTablePlan__item_content'>{student.description}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
