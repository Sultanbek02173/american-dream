import React from 'react';
import { UniversalTable } from '../../universalTable/UniversalTable';

const PaymentsSecondTable = () => {
  const columns = [
    { title: 'Преподаватель', dataIndex: 'teacher', key: 'teacher' },
    { title: 'Занятий', dataIndex: 'classes', key: 'classes' },
    { title: 'Ставка', dataIndex: 'bet', key: 'bet' },
    { title: 'Выплата', dataIndex: 'payout', key: 'payout' },
    { title: 'Бонус', dataIndex: 'bonus', key: 'bonus' },
    { title: 'Итог', dataIndex: 'result', key: 'result' },
  ];
  const data = [
    {
      teacher: 'Асанов Тимур',
      classes: '01.06.2025',
      bet: 'Английский язык',
      payout: '3 000 с',
      bonus: 'Перевод',
      result: 'Оплачено',
    },
    {
      teacher: 'Асанов Тимур',
      classes: '01.06.2025',
      bet: 'Английский язык',
      payout: '3 000 с',
      bonus: 'Перевод',
      result: 'Оплачено',
    },
    {
      teacher: 'Асанов Тимур',
      classes: '01.06.2025',
      bet: 'Английский язык',
      payout: '3 000 с',
      bonus: 'Перевод',
      result: 'Оплачено',
    },
    {
      teacher: 'Асанов Тимур',
      classes: '01.06.2025',
      bet: 'Английский язык',
      payout: '3 000 с',
      bonus: 'Перевод',
      result: 'Оплачено',
    },
  ];
  return (
    <section className='paymentsFinancial__table'>
      <h2 className='paymentsFinancial__categories-title'>
        Отчёты по преподавателям
      </h2>
      <UniversalTable columns={columns} data={data} />
    </section>
  );
};

export default PaymentsSecondTable;
