// src/app/App.jsx
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getRole } from '../../shared';

import {
  Accounting,
  AddTeacherTabs,
  ApplicationsAdmin,
  ApplicationsManager,
  СreateNewGroupsTabs,
  HomeWork,
  HomeWorkDetail,
  Login,
  MainAdmin,
  MainManagerPage,
  MainStudent,
  MainTeacher,
  PaymentsTable,
  RepordTable,
  ReportAnalytics,
  ReportCardStudent,
  ReportTableTabs,
  ScheduleAdmin,
  ScheduleStudent,
  ScheduleTeacher,
  Students,
  StudentsDetail,
  StudentsTable,
  TeacherDetail,
  TeacherGroupDetail,
  TeacherStudentDetail,
  TeacherTable,
} from '../../pages';

import { Accaunts, Breadcrumbs, SideBar } from '../../entities';
import '../styles/app.scss';

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
import { useAuth } from '../store/reducers/auth/AuthSlice';

const App = () => {
  const { role: roleFromStore } = useAuth();
  console.log(roleFromStore);

  const role = roleFromStore ?? getRole() ?? null;

  const isLoggedIn = Boolean(role);

  const sidebar = useMemo(() => {
    const admin = [
      { id: 1, img: main, link: '/' },
      { id: 2, img: student, link: '/students-table' },
      { id: 3, img: teacher, link: '/teacher-table' },
      { id: 4, img: reportCard, link: '/report-table' },
      { id: 5, img: payment, link: '/payments' },
      { id: 6, img: reportAnalytics, link: '/report-analytics' },
      { id: 7, img: accounting, link: '/accounting' },
    ];

    const management = [
      { id: 1, img: main, link: '/' },
      { id: 2, img: message, link: '/applications' },
      { id: 3, img: curces, link: '/schedule' },
      { id: 4, img: student, link: '/students-table' },
      { id: 5, img: payment, link: '/payments-table' },
    ];

    const teacherSideBar = [
      { id: 1, img: main, link: '/', name: 'Главный экран' },
      { id: 2, img: accounting, link: '/schedule' },
      { id: 3, img: student, link: '/students' },
    ];

    const studentSideBar = [
      { id: 1, img: main, link: '/' },
      { id: 2, img: curces, link: '/schedule' },
      { id: 3, img: reportCard, link: '/report-card' },
      { id: 4, img: lessons, link: '/home-work' },
    ];

    switch (role) {
      case 'Admin':
        return admin;
      case 'Manager':
        return management;
      case 'Student':
        return studentSideBar;
      case 'Teacher':
        return teacherSideBar;
      default:
        return [];
    }
  }, [role]);

  return (
    <div className='app'>
      <BrowserRouter>
        {!isLoggedIn ? (
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<Navigate to='/login' replace />} />
          </Routes>
        ) : (
          <div className='layout'>
            <div className='sidebar'>
              <SideBar routes={sidebar} />
            </div>
            <div className='main'>
              <div className='container'>
                <Accaunts />
                <Breadcrumbs />
              </div>

              <div className='page-content'>
                <Routes>
                  {role === 'admin' && (
                    <>
                      <Route path='/' element={<MainAdmin />} />
                      <Route path='/accounting' element={<Accounting />} />
                      <Route
                        path='/applications'
                        element={<ApplicationsAdmin />}
                      />
                      <Route path='/payments' element={<PaymentsTable />} />
                      <Route path='/report-table' element={<RepordTable />} />
                      <Route
                        path='/report-table/:id'
                        element={<ReportTableTabs />}
                      />
                      <Route
                        path='/report-analytics'
                        element={<ReportAnalytics />}
                      />
                      <Route path='/schedule' element={<ScheduleAdmin />} />
                      <Route
                        path='/students-table'
                        element={<StudentsTable />}
                      />
                      <Route
                        path='/students-table/:id'
                        element={<StudentsDetail />}
                      />
                      <Route path='/teacher-table' element={<TeacherTable />} />
                      <Route
                        path='/teacher-table/:id'
                        element={<TeacherDetail />}
                      />
                      <Route path='/add-teacher' element={<AddTeacherTabs />} />
                      <Route path='/add-student' element={<AddTeacherTabs />} />
                      <Route
                        path='/create-new-group'
                        element={<СreateNewGroupsTabs />}
                      />
                    </>
                  )}

                  {role === 'manager' && (
                    <>
                      <Route path='/' element={<MainManagerPage />} />
                      <Route
                        path='/applications'
                        element={<ApplicationsManager />}
                      />
                      <Route path='/schedule' element={<ScheduleAdmin />} />
                      <Route
                        path='/students-table'
                        element={<StudentsTable />}
                      />
                      <Route
                        path='/students-table/:id'
                        element={<StudentsDetail />}
                      />
                      <Route
                        path='/payments-table'
                        element={<PaymentsTable />}
                      />
                    </>
                  )}

                  {role === 'student' && (
                    <>
                      <Route path='/' element={<MainStudent />} />
                      <Route path='/home-work' element={<HomeWork />} />
                      <Route
                        path='/home-work/:id'
                        element={<HomeWorkDetail />}
                      />
                      <Route
                        path='/report-card'
                        element={<ReportCardStudent />}
                      />
                      <Route path='/schedule' element={<ScheduleStudent />} />
                    </>
                  )}

                  {role === 'teacher' && (
                    <>
                      <Route path='/' element={<MainTeacher />} />
                      <Route
                        path='/table/:group'
                        element={<TeacherGroupDetail />}
                      />
                      <Route path='/accounting' element={<ScheduleTeacher />} />
                      <Route path='/schedule' element={<ScheduleTeacher />} />
                      <Route path='/students' element={<Students />} />
                      <Route
                        path='/student/:id'
                        element={<TeacherStudentDetail />}
                      />
                    </>
                  )}

                  {/* Фолбэк на неизвестные маршруты */}
                  <Route path='*' element={<Navigate to='/' replace />} />
                </Routes>
              </div>
            </div>
          </div>
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;
