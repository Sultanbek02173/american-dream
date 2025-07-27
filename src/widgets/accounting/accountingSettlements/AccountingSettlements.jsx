import React from 'react';
import { UniversalTable } from '../../../entities';

export const AccountingSettlements = () => {
  const columns = [
    { title: 'Преподаватель', dataIndex: 'teacher', key: 'teacher' },
    { title: 'Занятий', dataIndex: 'classes', key: 'classes' },
    { title: 'Ставка', dataIndex: 'bet', key: 'bet' },
    { title: 'Выплата', dataIndex: 'payout', key: 'payout' },
    { title: 'Бонус', dataIndex: 'bonus', key: 'bonus' },
    { title: 'Выплачено', dataIndex: 'paid_out', key: 'paid_out' },
  ];
  const data = [
    {
      teacher: 'Асанов Тимур',
      classes: '01.06.2025',
      bet: 'Английский язык',
      payout: '3 000 с',
      bonus: 'Перевод',
      paid_out: '16 000 с',
    },
    {
      teacher: 'Асанов Тимур',
      classes: '01.06.2025',
      bet: 'Английский язык',
      payout: '3 000 с',
      bonus: 'Перевод',
      paid_out: '16 000 с',
    },
    {
      teacher: 'Асанов Тимур',
      classes: '01.06.2025',
      bet: 'Английский язык',
      payout: '3 000 с',
      bonus: 'Перевод',
      paid_out: '16 000 с',
    },
    {
      teacher: 'Асанов Тимур',
      classes: '01.06.2025',
      bet: 'Английский язык',
      payout: '3 000 с',
      bonus: 'Перевод',
      paid_out: 'Оплачено',
    },
  ];
  return (
    <section className='settlements'>
      <div className='container'>
        <h2 className='registration__title'>Расчёты с преподавателями</h2>
        <div className='settlements__head'>
          <p className='registration__subtitle'>
            Заработная плата преподавателей
          </p>
          <p className='registration__subtitle'>Выплата считая Удержание</p>
        </div>
        <UniversalTable columns={columns} data={data} />
      </div>
    </section>
  );
};
