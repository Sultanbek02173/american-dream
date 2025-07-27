import React, { useState } from 'react';
import { VerticalProgress } from '../../../featurs';
import '../../../widgets/mainAdminSections/payment/payment.scss';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper from 'swiper';
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { UniversalTable } from '../../universalTable/UniversalTable';
import PaymentsFirstTable from './PaymentsFirstTable';
import PaymentsSecondTable from './PaymentsSecondTable';
export const PaymentsTabFinancial = () => {
  const [categories] = useState([
    {
      id: 0,
      amount: '82 000 c',
      start_date: '26.05.2025',
      end_date: '26.05.2025',
      salaries: 'Заработные платы преподавателей',
    },
    {
      id: 1,
      amount: '82 000 c',
      start_date: '26.05.2025',
      end_date: '26.05.2025',
      salaries: 'Заработные платы преподавателей',
    },
    {
      id: 2,
      amount: '82 000 c',
      start_date: '26.05.2025',
      end_date: '26.05.2025',
      salaries: 'Заработные платы преподавателей',
    },
    {
      id: 3,
      amount: '82 000 c',
      start_date: '26.05.2025',
      end_date: '26.05.2025',
      salaries: 'Заработные платы преподавателей',
    },
    {
      id: 4,
      amount: '82 000 c',
      start_date: '26.05.2025',
      end_date: '26.05.2025',
      salaries: 'Заработные платы преподавателей',
    },
  ]);

  return (
    <div className='paymentsFinancial'>
      <div className='static_section'>
        <div className='static_section_statistics flex_item'>
          <div>
            <p>Доходы по периодам</p>
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
              <p>Месяц</p>
            </div>
            <div className='flex_item'>
              <IoIosArrowBack />
              <p>Месяц</p>
            </div>
          </div>
        </div>
      </div>
      <div className='payment_statistics'>
        <p className='sum'>Сумма:</p>

        <div className='row'>
          <div className='payment_statistics_sum'>
            <h2>295 000 c</h2>
            <p>
              Общая сумма всех поступлений за день, включая наличные, переводы и
              онлайн-оплаты.
            </p>
          </div>
          <div className='payment_statistics_progress'>
            <div className='stastic'>
              <VerticalProgress progress={85} text={'Наличными'} />
            </div>
            <div className='stastic'>
              <VerticalProgress progress={70} text={'Перевод'} />
            </div>
            <div className='stastic'>
              <VerticalProgress progress={50} text={'Онлайн'} />
            </div>
          </div>
        </div>
      </div>

      <div className='row pay_user'>
        <div className='pay_user_left'>
          <div className='row pay_user_left_header'>
            <p>Сумма:</p>
            <p className='type_pay'>Перевод</p>
          </div>
          <div>
            <h2>75 000 c</h2>
          </div>
        </div>
        <div className='pay_user_right'>
          <div className='row pay_user_right_header'>
            <p>Сумма:</p>
            <p className='type_pay'>Наличные</p>
          </div>
          <div>
            <h2>195 000 c</h2>
          </div>
        </div>
      </div>
      <div className='pay_online'>
        <div className='row pay_online_header'>
          <p>Сумма:</p>
          <h2>25 000 c</h2>
        </div>
        <div>
          <p className='type_pay'>Онлайн</p>
        </div>
      </div>
      <div className='paymentsFinancial__main'>
        <div className='row pay_online_header'>
          <p>Основной вклад:</p>
          <h2>45%</h2>
        </div>
        <div className='paymentsFinancial__main-row'>
          <p className='paymentsFinancial__main-course'>
            Курс «<span>Подготовка к ОРТ</span>»
          </p>
          <p className='paymentsFinancial__main-mainAmount'>от общей суммы</p>
        </div>
      </div>
      <section className='paymentsFinancial__categories'>
        <h3 className='paymentsFinancial__categories-title'>
          Расходы по категориям
        </h3>
        <Swiper
          modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          // scrollbar={{ draggable: true }}
          autoplay={{ delay: 3000 }}
        >
          {categories.map(category => (
            <SwiperSlide key={category.id}>
              <div className='paymentsFinancial__main'>
                <div className='row pay_online_header'>
                  <p>{category.salaries}</p>
                  <h2>{category.amount}</h2>
                </div>
                <div className='paymentsFinancial__main-row'>
                  <p className='paymentsFinancial__main-course'>
                    За период -{' '}
                    <span>
                      {category.start_date} - {category.end_date}
                    </span>
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <PaymentsFirstTable />
      <PaymentsSecondTable />
      <section className='popularityCourses_reload'>
        <p>
          Все отчёты генерируются автоматически на основе внесённых данных:
          оплаты учеников, проведённых занятий, ставок и расходов.
        </p>

        <div className='row popularityCourses_reload_btns'>
          <button>Отправить на почту Бухгалтеру</button>
          <button>Скачать отчёт PDF</button>
        </div>
      </section>
    </div>
  );
};
