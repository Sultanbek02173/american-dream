import './income.scss';
import download from '../../../shared/imgs/admin/download.svg';

export const Income = () => {
  const incomes = [
    {
      id: 0,
      money: '180 000',
      period: 'Январь',
    },
    {
      id: 1,
      money: '235 000',
      period: 'Февраль',
    },
    {
      id: 2,
      money: '294 000',
      period: 'Март',
    },
    {
      id: 3,
      money: '180000',
      period: 'Апрель',
    },
    {
      id: 4,
      money: '235 000',
      period: 'Май',
    },
  ];
  return (
    <section className='income'>
      <h2 className='income_title'>Доходы по периодам</h2>
      <p className='income_text'>Доходы по месяцам (2025)</p>

      <div className='income_analiz'>
        <div className='row income_analiz_header'>
          <p className='main_text'>Суммы учитываются в сомах</p>
          <p className='row'>
            <img src={download} alt='' /> Скачать отчёт PDF
          </p>
        </div>
        <div className='row income_analiz_table'>
          {incomes.map(item => (
            <div key={item.id}>
              <p>{item.money}</p>
              <div className='line'></div>
              <p>{item.period}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
