import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import searchIcon from '../../studentsTable/images/search.svg';
import { Checkbox, TextField } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { inputStyle } from '../../../../shared/utils/MuiStyles';
import { eventHandler } from '../../../../shared/utils/eventHandlers';
import plusIcon from '../../teacherTable/plus.svg';
export const CreateNewGroupStudents = () => {
  const [isListVisible, setIsListVisible] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [state, setState] = useState({
    teacher: '',
    search: '',
  });

  const students = [
    { id: 1, name: 'Алина Жумабаева Кларковна' },
    { id: 2, name: 'Максат Абдыкадыров' },
    { id: 3, name: 'Алия Ахметова' },
    { id: 4, name: 'Ислам Жээналиев' },
    { id: 5, name: 'Нурайым Осмонова' },
    { id: 6, name: 'Айгуль Сыдыкова' },
  ];

  const onChange = eventHandler(setState);

  const toggleStudent = id => {
    setSelectedStudents(prev =>
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    );
  };

  const fadeIn = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: '260px',
      position: 'absolute',
      zIndex: 1,
      width: '100%',
    },
    exit: { opacity: 0, height: 0 },
  };

  return (
    <motion.form
      className='createGroupStudents'
      onSubmit={e => e.preventDefault()}
      initial='hidden'
      animate='visible'
      transition={{ duration: 0.6 }}
    >
      <div className='studentsTable__head-search'>
        <input
          placeholder='Поиск'
          name='search'
          onChange={onChange}
          type='text'
        />
        <img src={searchIcon} alt='' />
      </div>

      <div className='studentsDetail__form-inputs'>
        <TextField
          label='Преподаватель'
          name='full_name'
          onChange={onChange}
          value={state.teacher}
          variant='outlined'
          sx={{ ...inputStyle, width: '100%' }}
        />
      </div>

      <div
        className='createGroupStudents__add'
        onClick={() => setIsListVisible(prev => !prev)}
        style={{ cursor: 'pointer' }}
      >
        <img src={plusIcon} alt='' />
        <p>Добавить ученика</p>
      </div>

      <AnimatePresence>
        {isListVisible && (
          <motion.div
            className='createGroupStudents__check active'
            initial='hidden'
            animate='visible'
            exit='exit'
            variants={fadeIn}
            transition={{ duration: 0.4 }}
          >
            {students.map(student => (
              <div className='paymentType__tabs-item' key={student.id}>
                <Checkbox
                  icon={
                    <CheckBoxOutlineBlankIcon sx={{ fontSize: 32 }} /> // размер неактивного чекбокса
                  }
                  checkedIcon={
                    <CheckBoxIcon sx={{ fontSize: 32 }} /> // размер активного чекбокса
                  }
                  checked={selectedStudents.includes(student.id)}
                  onChange={() => toggleStudent(student.id)}
                  sx={{
                    color: '#fff',
                    '&.Mui-checked': {
                      color: '#2DE920',
                    },
                  }}
                />
                <p>{student.name}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className='createGroupStudents__selected'>
        {selectedStudents.map(id => {
          const student = students.find(s => s.id === id);
          return (
            <div className='createGroupStudents__selected-item' key={id}>
              <div className='paymentType__tabs-item'>
                <Checkbox
                  checked
                  onChange={() => toggleStudent(id)}
                  sx={{
                    color: '#fff',
                    '&.Mui-checked': {
                      color: '#2DE920',
                    },
                  }}
                />
                <p>{student?.name}</p>
              </div>
              <p className='createGroupStudents__selected-date'>
                {new Date().toLocaleString('ru-RU')}
              </p>
            </div>
          );
        })}
      </div>
    </motion.form>
  );
};
