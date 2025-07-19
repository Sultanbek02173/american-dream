import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { getRole } from "../../shared";
import { useEffect, useState } from "react";
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
    TeacherTable } from "../../pages";
import '../styles/app.scss';
import { SideBar } from "../../entities";

const App = () => {
    const [role, setRole] = useState(null);
    const isLoggedIn = !!role;

    useEffect(() => {
        const storeRole = getRole(); 
        setRole(storeRole);
    }, []);

    if (role === null) {
        return <div>Загрузка...</div>;
    }

  return (
    <BrowserRouter>

        {
            isLoggedIn && (
                <>
                    <SideBar />
                </>
            )
        }

        <Routes>
        {
            !isLoggedIn ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              {role === 'admin' && (
                <>
                  <Route path="/admin/accounting" element={<Accounting />} />
                  <Route path="/admin/applications" element={<ApplicationsAdmin />} />
                  <Route path="/" element={<MainAdmin />} />
                  <Route path="/admin/payments" element={<PaymentsTable />} />
                  <Route path="/admin/repord-table" element={<RepordTable />} />
                  <Route path="/admin/report-analytics" element={<ReportAnalytics />} />
                  <Route path="/admin/schedule" element={<ScheduleAdmin />} />
                  <Route path="/admin/students-table" element={<StudentsTable />} />
                  <Route path="/admin/teacher-table" element={<TeacherTable />} />
                </>
              )}

              {role === 'manager' && (
                <>
                  <Route path="/" element={<MainManagerPage />} />
                  <Route path="/manager/applications" element={<ApplicationsManager />} />
                  <Route path="/manager/schedule" element={<ScheduleAdmin />} />
                  <Route path="/manager/students-table" element={<StudentsTable />} />
                  <Route path="/manager/payments-table" element={<PaymentsTable />} />
                </>
              )}

              {role === 'student' && (
                <>
                  <Route path="/student/home-work" element={<HomeWork />} />
                  <Route path="/" element={<MainStudent />} />
                  <Route path="/student/report-card" element={<ReportCardStudent />} />
                  <Route path="/student/students-table" element={<StudentsTable />} />
                </>
              )}

              {role === 'teacher' && (
                <>
                  <Route path="/" element={<MainTeacher />} />
                  <Route path="/teacher/applications" element={<ScheduleTeacher />} />
                  <Route path="/teacher/students" element={<Students />} />
                </>
              )}
            </>
          )
        }
      </Routes>
    </BrowserRouter>
  );
};


export default App;
