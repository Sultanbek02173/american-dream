import React from 'react';
import { UniversalTable } from '../../../entities';

export const AccountingFinancialResult = () => {
  const columns = [
    { title: '№', dataIndex: 'id', key: 'id' },
    { title: 'Показатель', dataIndex: 'indicator', key: 'indicator' },
    { title: 'Сумма', dataIndex: 'amount', key: 'amount' },
  ];
  const data = [
    {
      id: '1',
      amount: '3 000 с',
      indicator: 'Чистая прибыль',
    },
  ];
  return (
    <section className='financialResult'>
      <div className='container'>
        <h2 className='registration__title'>Финансовый результат:</h2>
        <UniversalTable columns={columns} data={data} />
      </div>
    </section>
  );
};
