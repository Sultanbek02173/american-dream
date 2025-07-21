import { useLocation, Link } from 'react-router-dom';
import './breadcrumbs.scss';

const routeNameMap = {
  '': 'Главная',
  'home-work': 'Домашние задания',
  'report-card': 'Табель',
  'students-table': 'Ученики',
  'teacher-table': 'Преподаватели',
  accounting: 'Табель',
  applications: 'Заявки',
  payments: 'Платежи',
  'payments-table': 'Платежи',
  'report-analytics': 'Отчёт и аналитика',
  schedule: 'Табель',
  students: 'Ученики',
  'repord-table': 'Бухгалтерия',
};

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  const breadcrumbs = pathnames.map((segment, index) => {
    const path = `/${pathnames.slice(0, index + 1).join('/')}`;
    return (
      <span key={index} className='breadcrumb-item'>
        <span className='separator'>{' / '}</span>
        <Link to={path}>{routeNameMap[segment] || segment}</Link>
      </span>
    );
  });

  return (
    <>
      {location.pathname !== '/' ? (
        <nav className='breadcrumbs'>
          <Link to='/'>Главная</Link>
          {breadcrumbs}
        </nav>
      ) : ''}
    </>
  );
};
