import message from '../../../shared/imgs/sidebar/message.svg';
import shedule from '../../../shared/imgs/sidebar/curces.svg';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import './staticsNow.scss';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { CircleProgress, ProgressBar } from '../../../featurs';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { dashBoardGet } from '../../../app/store/admin/homeAdmin/homeAdminThunks';
import { useAdminHome } from '../../../app/store/admin/homeAdmin/homeAdminSlice';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru'); // русский язык для дат

export const StaticsNow = () => {
  const radius = 60;
  const stroke = 20;

  const role = Cookies.get('role');
  const dispatch = useDispatch();
  const { dashBoard } = useAdminHome();

  useEffect(() => {
    dispatch(dashBoardGet(role));
  }, [dispatch, role]);

  const payment = {
    in_progress: 'В работе',
    rejected: 'Отказ',
    registered: 'Записан',
    new: 'Новые',
  };

  return (
    <section className='static_section'>
      <p className='static_section_hi'>
        Hi, {role === 'Manager' ? 'Менеджер' : 'Админ'}!
      </p>
      <div className='static_section_header flex_item'>
        <h2>Ключевые показатели за сегодня</h2>
        <div className='static_section_header_btn'>
          <NavLink to={'/applications'}>
            <button>
              <img src={message} alt='' /> Заявки
            </button>
          </NavLink>
          <NavLink to={'/schedule'}>
            <button>
              <img src={shedule} alt='' />
              Расписание
            </button>
          </NavLink>
        </div>
      </div>

      <div className='static_section_statistics flex_item'>
        <div>
          <p>Новые ученики</p>
        </div>
        <div className='static_section_statistics_period flex_item'>
          <div className='static_section_statistics_period_date flex_item'>
            <p>24 часа</p>
            <p>Неделя</p>
            <p>Месяц</p>
            <p>Год</p>
          </div>
          <div className='flex_item'>
            <IoIosArrowForward />
            <p>24 часа</p>
          </div>
          <div className='flex_item'>
            <IoIosArrowBack />
            <p>24 часа</p>
          </div>
        </div>
      </div>

      <div className='static_section_cards'>
        <div className='right_card'>
          {dashBoard.recent_invoices &&
            dashBoard.recent_invoices.slice(0, 1).map((student, indx) => (
              <div key={indx} className='user_card'>
                <div className='user_card_description'>
                  <h2>{student.student__first_name}</h2>
                  <p className='date'>
                    {dayjs(student.created_at).format('D MMMM, HH:mm')}
                  </p>
                </div>
                <div className='user_card_description'>
                  <h3>Курс:</h3>
                  <p>{student.course}</p>
                </div>
                <div className='user_card_description'>
                  <h3>Статус:</h3>
                  <p>
                    <MdKeyboardArrowDown />{' '}
                    {payment[student.status] || student.status}
                  </p>
                </div>
                <p className='user_card_note'>
                  <span>Примечание:</span> {student.comment}
                </p>
                <p className='user_card_served'>
                  <span>Обслуживал(а):</span> {student.name}
                </p>
              </div>
            ))}
          <div className='user_card statist_students'>
            <div className='statist_students_year'>
              <h3>За 1 год</h3>
              <h2>
                {dashBoard.new_students_year ? dashBoard.new_students_year : 0}
              </h2>
              <div>
                <ProgressBar progress={dashBoard.new_students_year ? 100 : 0} />
              </div>
            </div>
            <div className='statist_students_month'>
              <h3>За этот месяц</h3>
              <h2>
                {dashBoard.new_students_month
                  ? dashBoard.new_students_month
                  : 0}
              </h2>
              <div>
                <ProgressBar
                  progress={
                    (dashBoard.new_students_month /
                      dashBoard.new_students_year) *
                    100
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className='left_card'>
          <div className='user_card count_students'>
            <h2>Количество студентов</h2>

            <div className='count_students_circle'>
              <h2>
                {dashBoard.new_students_24h ? dashBoard.new_students_24h : 0}
              </h2>
              <CircleProgress
                percentage={
                  dashBoard.new_students_24h
                    ? (dashBoard.new_students_24h /
                        dashBoard.new_students_year) *
                      100
                    : 0
                }
                radius={radius}
                stroke={stroke}
                color={'#2DE920'}
              />
            </div>
            <div className='flex_item count_students_indicators'>
              <p>За 24 часа</p>
              <p>Показатели выше</p>
            </div>
          </div>

          {dashBoard.recent_invoices &&
            dashBoard.recent_invoices.slice(1, 2).map((student, indx) => (
              <div key={indx} className='user_card last_info'>
                <div className='flex_item last_info_description'>
                  <h3>{student.name}</h3>
                  <p>{dayjs(student.created_at).format('D MMMM, HH:mm')}</p>
                </div>
                <div className='flex_item last_info_description'>
                  <p>Курс:</p>
                  <p>{student.course}</p>
                </div>
                <div className='flex_item last_info_description'>
                  <p>Статус:</p>
                  <p>
                    <MdKeyboardArrowDown />
                    {payment[student.status] || student.status}
                  </p>
                </div>
                <p className='user_card_note'>
                  <span>Примечание:</span> {student.comment}
                </p>
                <p className='user_card_served'>
                  <span>Обслуживал(а):</span> {student.name}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};
