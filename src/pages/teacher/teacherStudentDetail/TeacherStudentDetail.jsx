import { useParams } from 'react-router-dom';
import { useTabs } from '../../../app/store/reducers/tabSlice';
import {
  StudentPaymentHistory,
  StudentProfile,
  StudentSessionHistory,
} from '../../../entities';
import { useDispatch } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { studentDetailGet } from '../../../app/store/teacher/studentList/studentListThunks';
import { useStudentList } from '../../../app/store/teacher/studentList/studentListSlice';
import Cookies from 'js-cookie';

export const TeacherStudentDetail = () => {
  const tabId = 'teacherStudentTabs';
  const { id } = useParams();
  const dispatch = useDispatch();
  const { studentDetail, detailLoading, error } = useStudentList();

  // роль из cookies
  const role = Cookies.get('role');
  const canSeeCredentials = useMemo(
    () => ['Administrator', 'Manager'].includes(role),
    [role]
  );

  useEffect(() => {
    if (id) dispatch(studentDetailGet(id));
  }, [dispatch, id]);

  // подставляем данные + безопасные дефолты
  const profileData = useMemo(() => {
    const s = studentDetail ?? {
      id: 5,
      username: 'Teacher-eng',
      first_name: 'Курманбеков',
      last_name: 'Эрбол',
      telegram: '@Erbol_Kurmanbekov',
      phone: '+996509250607',
      age: '29',
      email: 'admission@academy.com',
      avatarka:
        'http://185.211.170.64/media/avatarka/photo_2025-07-09_12-03-52_AFpwISW.jpg',
      avatarka_url:
        'http://185.211.170.64/media/avatarka/photo_2025-07-09_12-03-52_AFpwISW.jpg',
      role: 'Teacher',
    };

    return {
      id: s.id,
      fullName: [s.last_name, s.first_name].filter(Boolean).join(' ') || '—',
      firstName: s.first_name || '—',
      lastName: s.last_name || '—',
      username: s.username || '—', // логин (отображается только админам/менеджерам)
      // password не приходит — покажем только если когда-то появится и есть права:
      password: s.password || null,
      telegram: s.telegram || '—',
      phone: s.phone || '—',
      age: s.age || '—',
      email: s.email || '—',
      avatar: s.avatarka_url || s.avatarka || null,
      role: s.role || '—',
    };
  }, [studentDetail]);

  const tabs = [
    {
      label: 'Профиль студента',
      content: (
        <StudentProfile
          data={profileData}
          loading={detailLoading}
          canSeeCredentials={canSeeCredentials}
        />
      ),
    },
    {
      label: 'История занятий',
      content: <StudentSessionHistory studentId={profileData.id} />,
    },
    {
      label: 'История оплат',
      content: <StudentPaymentHistory studentId={profileData.id} />,
    },
  ];

  const tabsState = useTabs();
  const activeTab = tabsState[tabId] ?? 0;

  return (
    <section>
      <div className='container'>
        {error && (
          <div style={{ marginBottom: 12, color: '#ff6961' }}>
            Ошибка: {String(error)}
          </div>
        )}
        {tabs[activeTab]?.content}
      </div>
    </section>
  );
};
