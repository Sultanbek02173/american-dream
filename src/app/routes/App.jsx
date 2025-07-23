import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { getRole } from '../../shared';
import { useEffect, useState } from 'react';
import {
  Accounting,
  AddTeacherTabs,
  ApplicationsAdmin,
  ApplicationsManager,
  CreateNewGroupTabs,
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
  ReportTableTabs,
  ScheduleAdmin,
  ScheduleTeacher,
  Students,
  StudentsDetail,
  StudentsTable,
  TeacherDetail,
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
    { id: 7, img: reportCard, link: '/report-table' },
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
    <div className='app'>
      <BrowserRouter>
        {!isLoggedIn ? (
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<Navigate to='/login' />} />
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
                      <Route path='/accounting' element={<Accounting />} />
                      <Route
                        path='/applications'
                        element={<ApplicationsAdmin />}
                      />
                      <Route path='/' element={<MainAdmin />} />
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
                      <Route
                        path='/create-new-group'
                        element={<CreateNewGroupTabs />}
                      />
                      <Route path='/add-teacher' element={<AddTeacherTabs />} />
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
                        path='/report-card'
                        element={<ReportCardStudent />}
                      />
                      <Route
                        path='/students-table'
                        element={<StudentsTable />}
                      />
                    </>
                  )}
                  {role === 'teacher' && (
                    <>
                      <Route path='/' element={<MainTeacher />} />
                      <Route
                        path='/applications'
                        element={<ScheduleTeacher />}
                      />
                      <Route path='/students' element={<Students />} />
                    </>
                  )}
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
