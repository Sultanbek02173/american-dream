import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import { setActiveTab, useTabs } from '../../app/store/reducers/tabSlice';
import './breadcrumbs.scss';
import { StudentProfile } from '../studentsTab/StudentProfile';
import { StudentSessionHistory } from '../studentsTab/StudentSessionHistory';
import { StudentPaymentHistory } from '../studentsTab/StudentPaymentHistory';

const routeNameMap = {
  '': 'Главная',
  'home-work': 'Домашние задания',
  'report-table': 'Табель',
  'students-table': 'Ученики',
  'teacher-table': 'Преподаватели',
  accounting: 'Табель',
  applications: 'Заявки',
  payments: 'Платежи',
  'payments-table': 'Платежи',
  'report-analytics': 'Отчёт и аналитика',
  schedule: 'Табель',
  students: 'Ученики',
  // 'repord-table': 'Бухгалтерия',
  'add-teacher': 'Добавить преподавателя',
  // 'students-detail/': 'Детали ученика(цы)',
};

export const Breadcrumbs = () => {
  const dispatch = useDispatch();
  const tabId = 'applicationTabs';
  const tabsState = useTabs();
  const activeTab = tabsState[tabId] ?? 0;
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  const breadcrumbs = pathnames.map((segment, index) => {
    const path = `/${pathnames.slice(0, index + 1).join('/')}`;
    return (
      <span key={index} className='breadcrumb-item'>
        <span className='separator'>{' / '}</span>
        <Link className='breadcrumbs__link' to={path}>
          {routeNameMap[segment] || segment}
        </Link>
      </span>
    );
  });
  const tabs = [
    { label: 'Профиль студента', content: <StudentProfile /> },
    { label: 'История занятий', content: <StudentSessionHistory /> },
    { label: 'История оплат', content: <StudentPaymentHistory /> },
  ];
  return (
    <>
      {location.pathname !== '/' && (
        <nav className='breadcrumbs'>
          <div className='breadcrumbs__first'>
            <Link className='breadcrumbs__link' to='/'>
              Главная
            </Link>
            {breadcrumbs}
          </div>
          {/^\/students-table\/\d+$/.test(location.pathname) && (
            <div className='breadcrumbs__second'>
              {tabs.map((tab, index) => (
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
          )}
        </nav>
      )}
    </>
  );
};
