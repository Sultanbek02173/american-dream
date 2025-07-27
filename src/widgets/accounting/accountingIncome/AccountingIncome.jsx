import React from 'react';
import { UniversalTable } from '../../../entities';

export const AccountingIncome = () => {
  const columns = [
    { title: '№', dataIndex: 'id', key: 'id' },
    { title: 'Источник дохода', dataIndex: 'source', key: 'source' },
    { title: 'Сумма', dataIndex: 'amount', key: 'amount' },
    { title: 'Дата', dataIndex: 'date', key: 'date' },
    { title: 'Способ оплаты', dataIndex: 'payment', key: 'payment' },
  ];
  const data = [
    {
      id: '1',
      source: 'Английский',
      amount: '22 000 сом',
      date: '02.05.2025',
      payment: 'Перевод',
    },
    {
      id: '2',
      source: 'Английский',
      amount: '22 000 сом',
      date: '02.05.2025',
      payment: 'Перевод',
    },
    {
      id: '3',
      source: 'Английский',
      amount: '22 000 сом',
      date: '02.05.2025',
      payment: 'Перевод',
    },
  ];
  return (
    <section className='income'>
      <div className='container'>
        <h2 className='registration__title'>Доходы за Май 2025</h2>
        <UniversalTable columns={columns} data={data} />
      </div>
    </section>
  );
};
