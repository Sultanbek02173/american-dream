// CreateNewGroupStudents.jsx
import { motion, AnimatePresence } from 'framer-motion';
import searchIcon from '../../studentsTable/images/search.svg';
import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import {
  formControlStyle,
  inputStyle,
  menuItemStyle,
} from '../../../../shared/utils/MuiStyles';
import { useStudents } from '../../../../app/store/admin/students/studentsSlice';
import { useDispatch } from 'react-redux';
import { getStudentList } from '../../../../app/store/admin/students/studentsThunk';
import { useEffect, useMemo, useState } from 'react';
import { useTeachers } from '../../../../app/store/admin/teacher/teachersSlice';
import { getTeacherList } from '../../../../app/store/admin/teacher/teacherThunk';

export const CreateNewGroupStudents = ({
  teacher,
  setTeacher,
  selectedStudents,
  addStudent,
  removeStudent,
}) => {
  const [isListVisible, setIsListVisible] = useState(false);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const { students } = useStudents();
  const { teacherList } = useTeachers();

  useEffect(() => {
    dispatch(getStudentList());
    dispatch(getTeacherList());
  }, [dispatch]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return students;
    return students.filter(s =>
      (s.full_name || s.name || '').toLowerCase().includes(q)
    );
  }, [students, search]);

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

  const toggleStudent = id => {
    if (selectedStudents.includes(id)) removeStudent(id);
    else addStudent(id);
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
          onChange={e => setSearch(e.target.value)}
          type='text'
          value={search}
        />
        <img src={searchIcon} alt='' />
      </div>

      <div className='studentsDetail__form-inputs'>
        <FormControl sx={{ ...formControlStyle, width: '100%' }}>
          <InputLabel id='direction-label'>Преподаватель</InputLabel>
          <Select
            labelId='direction-label'
            label='Преподаватель'
            name='teacher'
            value={teacher}
            onChange={e =>
              setTeacher(e.target.value ? Number(e.target.value) : null)
            }
          >
            {teacherList.map(teacher => (
              <MenuItem key={teacher.id} value={teacher.id} sx={menuItemStyle}>
                {teacher.full_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div
        className='createGroupStudents__add'
        onClick={() => setIsListVisible(prev => !prev)}
        style={{ cursor: 'pointer' }}
      >
        <img src={/* plus icon path */ ''} alt='' />
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
            {filtered.map(student => (
              <div className='paymentType__tabs-item' key={student.id}>
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon sx={{ fontSize: 32 }} />}
                  checkedIcon={<CheckBoxIcon sx={{ fontSize: 32 }} />}
                  checked={selectedStudents.includes(student.id)}
                  onChange={() => toggleStudent(student.id)}
                  sx={{ color: '#fff', '&.Mui-checked': { color: '#2DE920' } }}
                />
                <p>{student.full_name || student.name}</p>
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
                  sx={{ color: '#fff', '&.Mui-checked': { color: '#2DE920' } }}
                />
                <p>{student?.full_name || student?.name || `ID ${id}`}</p>
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
