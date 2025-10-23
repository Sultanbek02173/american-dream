// src/app/App.jsx
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { getRole } from '../../shared';

import {
  Accounting,
  AddStudent,
  AddTeacherTabs,
  ApplicationsAdmin,
  ApplicationsManager,
  CreateNewGroupsTabs,
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

import Cookies from 'js-cookie';
import accounting from '../../shared/imgs/sidebar/accounting.svg';
import curces from '../../shared/imgs/sidebar/curces.svg';
import lessons from '../../shared/imgs/sidebar/lessons.svg';
import main from '../../shared/imgs/sidebar/mainScreen.svg';
import message from '../../shared/imgs/sidebar/message.svg';
import payment from '../../shared/imgs/sidebar/payments.svg';
import reportAnalytics from '../../shared/imgs/sidebar/ReportAnalytics.svg';
import reportCard from '../../shared/imgs/sidebar/reportCard.svg';
import student from '../../shared/imgs/sidebar/students.svg';
import teacher from '../../shared/imgs/sidebar/teacher.svg';
import { getYourSelf } from '../store/reducers/auth/AuthThunk';
// import Cookies from 'js-cookie';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/media.scss';

const App = () => {
  const roleFromStore = useSelector(s => s.auth.role);
  const role = roleFromStore ?? getRole() ?? null;
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isLoggedIn = Boolean(role);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  const navigate = useNavigate();

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
      case 'Administrator':
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getYourSelf()).unwrap();
      } catch (e) {
        console.log(e);
        // navigate('/login', { replace: true });
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className='app'>
      <ToastContainer position='top-right' autoClose={4000} theme='dark' />
      {!isLoggedIn ? (
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Navigate to='/login' replace />} />
        </Routes>
      ) : (
        <div className='layout'>
          <div className='sidebar'>
            <SideBar
              routes={sidebar}
              isOpen={isSidebarOpen}
              onClose={closeSidebar}
            />
          </div>
          <div className='main'>
            <div className='container'>
              <Accaunts
                onToggleSidebar={toggleSidebar}
                isSidebarOpen={isSidebarOpen}
              />
              <Breadcrumbs />
            </div>

            <div className='page-content'>
              <Routes>
                {role === 'Administrator' && (
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
                    <Route path='/students-table' element={<StudentsTable />} />
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
                    <Route path='/add-student' element={<AddStudent />} />
                    <Route
                      path='/create-new-group'
                      element={<CreateNewGroupsTabs />}
                    />
                  </>
                )}

                {role === 'Manager' && (
                  <>
                    <Route path='/' element={<MainManagerPage />} />
                    <Route
                      path='/applications'
                      element={<ApplicationsManager />}
                    />
                    <Route path='/schedule' element={<ScheduleAdmin />} />
                    <Route path='/students-table' element={<StudentsTable />} />
                    <Route
                      path='/students-table/:id'
                      element={<StudentsDetail />}
                    />
                    <Route path='/payments-table' element={<PaymentsTable />} />
                  </>
                )}

                {role === 'Student' && (
                  <>
                    <Route path='/' element={<MainStudent />} />
                    <Route path='/home-work' element={<HomeWork />} />
                    <Route path='/home-work/:id' element={<HomeWorkDetail />} />
                    <Route
                      path='/report-card'
                      element={<ReportCardStudent />}
                    />
                    <Route path='/schedule' element={<ScheduleStudent />} />
                  </>
                )}

                {role === 'Teacher' && (
                  <>
                    <Route path='/' element={<MainTeacher />} />
                    <Route path='/table/:id' element={<TeacherGroupDetail />} />
                    <Route path='/accounting' element={<ScheduleTeacher />} />
                    <Route path='/schedule' element={<ScheduleTeacher />} />
                    <Route path='/students' element={<Students />} />
                    <Route
                      path='/student/:id'
                      element={<TeacherStudentDetail />}
                    />
                  </>
                )}

                <Route path='*' element={<Navigate to='/' replace />} />
              </Routes>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
