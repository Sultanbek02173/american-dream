import './income.scss';
import download from '../../../shared/imgs/admin/download.svg';
import { useDispatch } from 'react-redux';
import { useEffect, useMemo, useRef } from 'react';
import { incomeGet } from '../../../app/store/admin/reportAnalytic/reportAnalyticThunks';
import { useReportAnalytic } from '../../../app/store/admin/reportAnalytic/reportAnalyticSlice';
import { axiosApi } from '../../../app/services/axiosApi';

const TTL_MS = 15 * 60 * 1000;

export const Income = () => {
  const dispatch = useDispatch();
  const { income, incomeLoaded, incomeLastFetched, loading } =
    useReportAnalytic();

  const calledRef = useRef(false);
  useEffect(() => {
    const stale = !incomeLastFetched || Date.now() - incomeLastFetched > TTL_MS;
    if (calledRef.current) return;
    if (!incomeLoaded || stale) {
      calledRef.current = true;
      dispatch(incomeGet());
    }
  }, [dispatch, incomeLoaded, incomeLastFetched]);

  const last6 = useMemo(() => {
    if (!income || income.length === 0) return [];

    const now = new Date();
    const curMonth = now.getMonth() + 1;
    const curYear = now.getFullYear();

    const months = [];
    for (let i = 0; i < 6; i++) {
      let m = curMonth - i;
      let y = curYear;
      if (m <= 0) {
        m += 12;
        y -= 1;
      }
      months.push({ y, m });
    }

    const want = new Set(months.map(({ y, m }) => `${y}-${m}`));

    const filtered = income
      .filter(item => want.has(`${item.year}-${item.month_number}`))
      .map(item => ({
        id: `${item.year}-${item.month_number}`,
        money: item.income ?? '0',
        period: item.month,
      }));

    const order = new Map(
      months.reverse().map(({ y, m }, idx) => [`${y}-${m}`, idx])
    );
    filtered.sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0));

    return filtered;
  }, [income]);

  const downloadPdf = async () => {
    try {
      const response = await axiosApi.get(
        '/administration/monthly-income-pdf/',
        { responseType: 'blob' }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'monthly-income.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Ошибка при скачивании PDF:', error);
    }
  };

  return (
    <section className='income'>
      <h2 className='income_title'>Доходы по периодам</h2>
      <p className='income_text'>
        Доходы по месяцам ({new Date().getFullYear()})
      </p>

      <div className='income_analiz'>
        <div className='row income_analiz_header'>
          <p className='main_text'>Суммы учитываются в сомах</p>
          <p className='row' onClick={downloadPdf}>
            <img src={download} alt='' /> Скачать отчёт PDF
          </p>
        </div>

        {loading && !incomeLoaded ? (
          <div className='row'>
            <p>Загрузка…</p>
          </div>
        ) : last6.length === 0 ? (
          <div className='row'>
            <p>Нет данных для отображения.</p>
          </div>
        ) : (
          <div className='row income_analiz_table'>
            {last6.map(item => (
              <div key={item.id}>
                <p>{item.money}</p>
                <div className='line'></div>
                <p>{item.period}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
