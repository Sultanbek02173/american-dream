import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import openIcon from '../reportTablePlan/open.svg';
import closeIcon from '../reportTablePlan/close.svg';
export const ReportTableHomeWork = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      title:
        'Месяц 1: Введение в Web design, инструменты и основы, работа над первым сайтом.',
      description: 'Урок 1: Вводная лекция Урок 2: Все тренды дизайна...',
      teacher: 'Жамалкулов',
      link: 'https://www.youtube.com',
      record: 'https://www.youtube.com',
      data_delivery: '30.05.2025 20:59',
      link_hw: 'https://www.youtube.com',
      file_hw: 'https://www.youtube.com',
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
          <div
            key={student.id}
            className='reportTablePlan__item'
            onClick={() => toggleVisibility(student.id)}
          >
            <div className='reportTablePlan__item-head'>
              <p>урок {student.id}</p>
              <h3>{student.title}</h3>
              <img
                src={isOpen ? closeIcon : openIcon}
                alt='toggle'
                style={{ width: '24px', height: '24px' }}
              />
            </div>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  style={{ overflow: 'hidden' }}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className='reportTablePlan__item-description'>
                    {student.description}
                  </p>
                  <div className='row1'>
                    <div className='col-6'>
                      <div className='reportTablePlan__item-task'>
                        <span>Преподаватель: </span>
                        <p>{student.teacher}</p>
                      </div>
                    </div>
                    <div className='col-6'>
                      <div className='reportTablePlan__item-task'>
                        <span>Дата сдачи: </span>
                        <p>{student.data_delivery}</p>
                      </div>
                    </div>
                    <div className='col-6'>
                      <div className='reportTablePlan__item-task'>
                        <span>Ссылки урока: </span>
                        <p>{student.link}</p>
                      </div>
                    </div>
                    <div className='col-6'>
                      <div className='reportTablePlan__item-task'>
                        <span>Ссылки дз: </span>
                        <p>{student.link_hw}</p>
                      </div>
                    </div>
                    <div className='col-6'>
                      <div className='reportTablePlan__item-task'>
                        <span>Запись урока: </span>
                        <p>{student.record}</p>
                      </div>
                    </div>
                    <div className='col-6'>
                      <div className='reportTablePlan__item-task'>
                        <span>Файлы дз: </span>
                        <p>{student.file_hw}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
