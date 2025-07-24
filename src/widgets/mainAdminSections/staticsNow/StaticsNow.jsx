import message from '../../../shared/imgs/sidebar/message.svg';
import shedule from '../../../shared/imgs/sidebar/curces.svg';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import './staticsNow.scss';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { CircleProgress, ProgressBar } from '../../../featurs';
import { NavLink } from 'react-router-dom';

export const StaticsNow = () => {
  const percentage = 75;
  const radius = 60;
  const stroke = 20;

  return (
    <section className='static_section'>
      <p className='static_section_hi'>Hi, Админ!</p>
      <div className='static_section_header flex_item'>
        <h2>Ключевые показатели за сегодня</h2>
        <div className='static_section_header_btn'>
          <NavLink to={'/applications'}>
            <button>
              <img src={message} alt='' /> Заявки
            </button>
          </NavLink>
          <button>
            <img src={shedule} alt='' />
            Расписание
          </button>
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
          <div className='user_card'>
            <div className='user_card_description'>
              <h2>Тимур.Х</h2>
              <p className='date'>24 мая, 09:45</p>
            </div>
            <div className='user_card_description'>
              <h3>Курс:</h3>
              <p>Математика 5 класс</p>
            </div>
            <div className='user_card_description'>
              <h3>Статус:</h3>
              <p>
                <MdKeyboardArrowDown /> Без оплаты
              </p>
            </div>
            <p className='user_card_note'>
              <span>Примечание:</span> Ученик записан после бесплатного пробного
              урока, ожидается подтверждение родителя.
            </p>
            <p className='user_card_served'>
              <span>Обслуживал(а):</span> Бексултан.Г
            </p>
          </div>
          <div className='user_card statist_students'>
            <div className='statist_students_year'>
              <h3>За 1 год</h3>
              <h2>874</h2>
              <div>
                <ProgressBar progress={100} />
              </div>
            </div>
            <div className='statist_students_month'>
              <h3>За этот месяц</h3>
              <h2>58</h2>
              <div>
                <ProgressBar progress={80} />
              </div>
            </div>
          </div>
        </div>
        <div className='left_card'>
          <div className='user_card count_students'>
            <h2>Колчевство студентов</h2>

            <div className='count_students_circle'>
              <h2>12</h2>
              <CircleProgress
                percentage={percentage}
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

          <div className='user_card last_info'>
            <div className='flex_item last_info_description'>
              <h3>Тимур.Х</h3>
              <p>24 мая, 09:45</p>
            </div>
            <div className='flex_item last_info_description'>
              <p>Курс:</p>
              <p>Математика 5 класс</p>
            </div>
            <div className='flex_item last_info_description'>
              <p>Статус:</p>
              <p>
                <MdKeyboardArrowDown />
                Ожидает
              </p>
            </div>
            <p className='user_card_note'>
              <span>Примечание:</span> Ученик записан после бесплатного пробного
              урока, ожидается подтверждение родителя.
            </p>
            <p className='user_card_served'>
              <span>Обслуживал(а):</span> Бексултан.Г
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
