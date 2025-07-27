import { FormControl, MenuItem, Select, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { setActiveTab, useTabs } from '../../app/store/reducers/tabSlice';
import { StudentPaymentHistory } from '../studentsTab/StudentPaymentHistory';
import { StudentProfile } from '../studentsTab/StudentProfile';
import { StudentSessionHistory } from '../studentsTab/StudentSessionHistory';
import './breadcrumbs.scss';

import { useState } from 'react';

const routeNameMap = {
  '': 'Главная',
  'home-work': 'Домашние задания',
  'report-table': 'Табель',
  'students-table': 'Ученики',
  'teacher-table': 'Преподаватели',
  accounting: ' Бухгалтерия',
  applications: 'Заявки',
  payments: 'Платежи',
  'payments-table': 'Платежи',
  'report-analytics': 'Отчёт и аналитика',
  schedule: 'Табель',
  students: 'Ученики',
  'add-teacher': 'Добавить преподавателя',
};

export const Breadcrumbs = () => {
  const dispatch = useDispatch();
  const tabId = 'applicationTabs';
  const tabsState = useTabs();
  const activeTab = tabsState[tabId] ?? 0;
  const location = useLocation();

  const [value, setValue] = useState('mouth1');

  const itemStyle = {
    color: '#fff',
    backgroundColor: '#000',
    '&:hover': {
      backgroundColor: '#333',
      color: '#fff',
    },
    '&.Mui-selected': {
      backgroundColor: '#000',
      color: '#fff',
    },
    '&.Mui-selected:hover': {
      backgroundColor: '#000',
    },
  };

  const handleChange = event => {
    setValue(event.target.value);
  };
  const pathnames = location.pathname.split('/').filter(Boolean);

  const breadcrumbs = pathnames
    .map((segment, index) => {
      if (!isNaN(Number(segment))) return null;
      const path = `/${pathnames.slice(0, index + 1).join('/')}`;
      return (
        <span key={index} className='breadcrumb-item'>
          <span className='separator'>{' / '}</span>
          <Link className='breadcrumbs__link' to={path}>
            {routeNameMap[segment] || segment}
          </Link>
        </span>
      );
    })
    .filter(Boolean);

  const isStudentDetail = /^\/students-table\/\d+$/.test(location.pathname);
  const isTableDetail = /^\/report-table\/\d+$/.test(location.pathname);

  const tabs = [
    { label: 'Профиль студента', content: <StudentProfile /> },
    { label: 'История занятий', content: <StudentSessionHistory /> },
    { label: 'История оплат', content: <StudentPaymentHistory /> },
  ];
  return (
    <>
      {location.pathname === '/' ||
      location.pathname === '/applications' ||
      location.pathname === '/schedule' ? (
        ''
      ) : (
        <nav className='breadcrumbs'>
          <div className='breadcrumbs__first'>
            <Link className='breadcrumbs__link' to='/'>
              Главная
            </Link>
            {breadcrumbs}
          </div>

          <div className='breadcrumbs__second'>
            {isStudentDetail &&
              tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => dispatch(setActiveTab({ tabId, index }))}
                  className={`breadcrumbs__second-tab ${
                    index === activeTab ? 'active' : ''
                  }`}
                >
                  {tab.label}
                </button>
              ))}
          </div>
          {isTableDetail && (
            <FormControl
              sx={{
                width: '20%',
                height: '100%',
                background: '#424242',
                // opacity: '60%',
                '& .MuiOutlinedInput-root': {
                  color: '#fff', // цвет текста
                  '& fieldset': {
                    borderColor: '#424242', // обычная граница
                  },
                  '&:hover fieldset': {
                    borderColor: '#424242', // при наведении
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#424242', // при нажатии/фокусе (например, оранжевый)
                  },
                },
              }}
            >
              <Select
                value={value}
                onChange={handleChange}
                displayEmpty
                // renderValue={selected => {
                //   if (!selected) {
                //     return (
                //       <Typography sx={{ color: '#aaa' }}>Месяц №1</Typography>
                //     );
                //   }
                //   return {
                //     mouth2: 'Месяц №2',
                //     mouth3: 'Месяц №3',
                //     mouth4: 'Месяц №4',
                //     mouth5: 'Месяц №5',
                //   }[selected];
                // }}
                inputProps={{ 'aria-label': 'Выбор месяца' }}
              >
                <MenuItem
                  value='mouth1'
                  sx={{ ...itemStyle, fontStyle: 'normal' }}
                >
                  Месяц №1
                </MenuItem>
                <MenuItem value='mouth2' sx={itemStyle}>
                  Месяц №2
                </MenuItem>
                <MenuItem value='mouth3' sx={itemStyle}>
                  Месяц №3
                </MenuItem>
                <MenuItem value='mouth4' sx={itemStyle}>
                  Месяц №4
                </MenuItem>
                <MenuItem value='mouth5' sx={itemStyle}>
                  Месяц №5
                </MenuItem>
              </Select>
            </FormControl>
            // <FormControl
            //   sx={{
            //     width: '20%',
            //     height: '100%',
            //     opacity: '60%',
            //     '& .MuiOutlinedInput-root': {
            //       color: '#fff', // цвет текста
            //       '& fieldset': {
            //         borderColor: '#fff', // обычная граница
            //       },
            //       '&:hover fieldset': {
            //         borderColor: '#fff', // при наведении
            //       },
            //       '&.Mui-focused fieldset': {
            //         borderColor: '#2de920', // при нажатии/фокусе (например, оранжевый)
            //       },
            //     },
            //     '& .MuiInputLabel-root': {
            //       color: '#fff', // цвет label по умолчанию
            //     },
            //     '& .Mui-focused .MuiInputLabel-root': {
            //       color: '#fff', // цвет label при фокусе
            //     },
            //   }}
            // >
            //   {/* <InputLabel id='demo-simple-select-label'>Направление</InputLabel> */}
            //   <Select
            //     labelId='demo-simple-select-label'
            //     id='demo-simple-select'
            //     value={value}
            //     label='Направление'
            //     onChange={handleChange}
            //   >
            //     <MenuItem value='english' sx={menuItemStyle}>
            //       Английский
            //     </MenuItem>
            //     <MenuItem value='mentalArithmetic' sx={menuItemStyle}>
            //       Ментальная арифметика
            //     </MenuItem>
            //     <MenuItem value='robotics' sx={menuItemStyle}>
            //       Робототехника
            //     </MenuItem>
            //   </Select>
            // </FormControl>
          )}
        </nav>
      )}
    </>
  );
};
