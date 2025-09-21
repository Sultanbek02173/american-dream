import { useEffect, useState, useMemo } from 'react';
import { VerticalProgress } from '../../../featurs';
import '../../../widgets/mainAdminSections/payment/payment.scss';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Swiper, SwiperSlide } from 'swiper/react';
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
import PaymentsFirstTable from './PaymentsFirstTable';
import PaymentsSecondTable from './PaymentsSecondTable';
import { useDispatch } from 'react-redux';
import { getPayments } from '../../../app/store/admin/payments/paymentsThunks';
import { usePayments } from '../../../app/store/admin/payments/paymentsSlice';
import { axiosApi } from '../../../app/services/axiosApi';

export const PaymentsTabFinancial = () => {
  const dispatch = useDispatch();
  const { payments = [] } = usePayments();
  const [activeReportType, setActiveReportType] = useState('daily');

  useEffect(() => {
    dispatch(getPayments());
  }, [dispatch]);

  const activeReport = payments?.find(r => r.report_type === activeReportType);
  console.log(activeReport);
  
  const { bestCourse, bestIncome, percent } = useMemo(() => {
    if (!activeReport?.top_courses || !activeReport?.total_income) {
      return { bestCourse: null, bestIncome: 0, percent: 0 };
    }
    const entries = Object.entries(activeReport.top_courses);
    if (entries.length === 0)
      return { bestCourse: null, bestIncome: 0, percent: 0 };
    const [course, income] = entries.reduce((max, current) =>
      current[1] > max[1] ? current : max
    );
    const percentCalc = ((income / activeReport.total_income) * 100).toFixed(0);
    return { bestCourse: course, bestIncome: income, percent: percentCalc };
  }, [activeReport]);

  const categories = useMemo(() => {
    if (!activeReport?.expenses_by_category) return [];
    return Object.entries(activeReport.expenses_by_category).map(
      ([key, value], idx) => ({
        id: idx,
        salaries: key.charAt(0).toUpperCase() + key.slice(1),
        amount: `${value} c`,
      })
    );
  }, [activeReport]);

  const sendReport = () => {
    axiosApi.post('/administration/send-reports/')
  }

  return (
    <div className='paymentsFinancial'>
      <div className='static_section'>
        <div className='static_section_statistics flex_item'>
          <div>
            <p>Доходы по периодам</p>
          </div>
          <div className='static_section_statistics_period flex_item'>
            <div className='static_section_statistics_period_date flex_item'>
              <p onClick={() => setActiveReportType('daily')}>24 часа</p>
              <p onClick={() => setActiveReportType('weekly')}>Неделя</p>
              <p onClick={() => setActiveReportType('monthly')}>Месяц</p>
              <p onClick={() => setActiveReportType('yearly')}>Год</p>
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
            <h2>{activeReport?.total_income || 0} c</h2>
            <p>
              Общая сумма всех поступлений за день, включая наличные, переводы и
              онлайн-оплаты.
            </p>
          </div>
          <div className='payment_statistics_progress'>
            {['cash', 'transfer', 'online'].map(type => (
              <div className='stastic' key={type}>
                <VerticalProgress
                  progress={
                    ((activeReport?.income_by_type?.[type] || 0) /
                      (activeReport?.total_income || 1)) *
                    100
                  }
                  text={
                    type === 'cash'
                      ? 'Наличными'
                      : type === 'transfer'
                      ? 'Перевод'
                      : 'Онлайн'
                  }
                  height='380px'
                  width='102px'
                  border='100px'
                  color={
                    type === 'cash'
                      ? '#2DE920'
                      : type === 'transfer'
                      ? '#23a919ff'
                      : '#1d8e15ff'
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {bestCourse && (
        <div className='paymentsFinancial__main'>
          <div className='row pay_online_header'>
            <p>Основной вклад:</p>
            <h2>{percent}%</h2>
          </div>
          <div className='paymentsFinancial__main-row'>
            <p className='paymentsFinancial__main-course'>
              Курс «<span>{bestCourse}</span>»
            </p>
            <p className='paymentsFinancial__main-mainAmount'>от общей суммы</p>
          </div>
        </div>
      )}

      <section className='paymentsFinancial__categories'>
        <h3 className='paymentsFinancial__categories-title'>
          Расходы по категориям
        </h3>
        <Swiper
          modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
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
                      {activeReport?.start_date} - {activeReport?.end_date}
                    </span>
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <PaymentsFirstTable net_profit={activeReport?.net_profit || 0} />
      <PaymentsSecondTable />

      <section className='popularityCourses_reload'>
        <p>
          Все отчёты генерируются автоматически на основе внесённых данных:
          оплаты учеников, проведённых занятий, ставок и расходов.
        </p>
        <div className='row popularityCourses_reload_btns'>
          <button onClick={sendReport}>Отправить на почту Бухгалтеру</button>
          <button>Скачать отчёт PDF</button>
        </div>
      </section>
    </div>
  );
};
