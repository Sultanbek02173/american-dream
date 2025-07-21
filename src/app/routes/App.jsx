import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getRole } from '../../shared';
import { useEffect, useState } from 'react';
import {
  Accounting,
  ApplicationsAdmin,
  ApplicationsManager,
  HomeWork,
  Login,
  MainAdmin,
  MainManagerPage,
  MainStudent,
  MainTeacher,
  PaymentsTable,
  RepordTable,
  ReportAnalytics,
  ReportCardStudent,
  ScheduleAdmin,
  ScheduleTeacher,
  Students,
  StudentsTable,
  TeacherTable,
} from '../../pages';
import '../styles/app.scss';
import { Accaunts, Breadcrumbs, SideBar } from '../../entities';

import main from '../../shared/imgs/sidebar/mainScreen.svg';
import student from '../../shared/imgs/sidebar/students.svg';
import payment from '../../shared/imgs/sidebar/payments.svg';
import reportAnalytics from '../../shared/imgs/sidebar/ReportAnalytics.svg';
import teacher from '../../shared/imgs/sidebar/teacher.svg';
import accounting from '../../shared/imgs/sidebar/accounting.svg';
import reportCard from '../../shared/imgs/sidebar/reportCard.svg';
import message from '../../shared/imgs/sidebar/message.svg';
import curces from '../../shared/imgs/sidebar/curces.svg';
import lessons from '../../shared/imgs/sidebar/lessons.svg';

const App = () => {
  const [role, setRole] = useState(null);
  const [sidebar, setSidebar] = useState([]);
  const isLoggedIn = !!role;

  const admin = [
    { id: 1, img: main, link: '/' },
    { id: 2, img: student, link: '/students-table' },
    { id: 3, img: payment, link: '/payments' },
    { id: 4, img: reportAnalytics, link: '/report-analytics' },
    { id: 5, img: teacher, link: '/teacher-table' },
    { id: 6, img: accounting, link: '/accounting' },
    { id: 7, img: reportCard, link: '/repord-table' },
  ];

  const menegment = [
    { id: 1, img: main, link: '/' },
    { id: 2, img: message, link: '/applications' },
    { id: 3, img: curces, link: '/schedule' },
    { id: 4, img: student, link: '/students-table' },
    { id: 5, img: payment, link: '/payments-table' },
  ];

  const teacherSideBar = [
    { id: 1, img: main, link: '/', name: 'Главный экран' },
    { id: 2, img: accounting, link: '/applications' },
    { id: 3, img: student, link: '/students' },
  ];

  const studentSideBar = [
    { id: 1, img: main, link: '/' },
    { id: 2, img: message, link: '/report-card' },
    { id: 3, img: accounting, link: '/students-table' },
    { id: 4, img: lessons, link: '/home-work' },
  ]; 

  useEffect(() => {
    const storeRole = getRole();
    setRole(storeRole);

    switch (storeRole) {
      case 'admin':
        setSidebar(admin);
        break;
      case 'manager':
        setSidebar(menegment);
        break;

      case 'student':
        setSidebar(studentSideBar);
        break;

      case 'teacher':
        setSidebar(teacherSideBar);
        break;
      default:
        setSidebar([]);
    }
  }, []);

  if (role === null) {
    return <div>Загрузка...</div>;
  }
  return (
    <BrowserRouter>
      {isLoggedIn && (
        <>
          <SideBar routes={sidebar} />
          <Accaunts />
          <Breadcrumbs />
        </>
      )}

      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<Navigate to='/login' />} />
          </>
        ) : (
          <>
            {role === 'admin' && (
              <>
                <Route path='/admin/accounting' element={<Accounting />} />
                <Route
                  path='/admin/applications'
                  element={<ApplicationsAdmin />}
                />
                <Route path='/' element={<MainAdmin />} />
                <Route path='/admin/payments' element={<PaymentsTable />} />
                <Route path='/admin/repord-table' element={<RepordTable />} />
                <Route
                  path='/admin/report-analytics'
                  element={<ReportAnalytics />}
                />
                <Route path='/admin/schedule' element={<ScheduleAdmin />} />
                <Route
                  path='/admin/students-table'
                  element={<StudentsTable />}
                />
                <Route path='/admin/teacher-table' element={<TeacherTable />} />
              </>
            )}

            {role === 'manager' && (
              <>
                <Route path='/' element={<MainManagerPage />} />
                <Route
                  path='/manager/applications'
                  element={<ApplicationsManager />}
                />
                <Route path='/manager/schedule' element={<ScheduleAdmin />} />
                <Route
                  path='/manager/students-table'
                  element={<StudentsTable />}
                />
                <Route
                  path='/manager/payments-table'
                  element={<PaymentsTable />}
                />
              </>
            )}

            {role === 'student' && (
              <>
                <Route path='/student/home-work' element={<HomeWork />} />
                <Route path='/' element={<MainStudent />} />
                <Route
                  path='/student/report-card'
                  element={<ReportCardStudent />}
                />
                <Route
                  path='/student/students-table'
                  element={<StudentsTable />}
                />
              </>
            )}

            {role === 'teacher' && (
              <>
                <Route path='/' element={<MainTeacher />} />
                <Route
                  path='/teacher/applications'
                  element={<ScheduleTeacher />}
                />
                <Route path='/teacher/students' element={<Students />} />
              </>
            )}
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
