import React from 'react';
import { UniversalTable } from '../../universalTable/UniversalTable';

const PaymentsFirstTable = ({net_profit}) => {
  const columns = [
    { title: 'Дата', dataIndex: 'date', key: 'date' },
    { title: 'Показатель', dataIndex: 'indicator', key: 'indicator' },
    { title: 'Сумма', dataIndex: 'amount', key: 'amount' },
  ];
  const data = [
    {
      date: '01.06.2025',
      amount: `${net_profit || 0} с`,
      indicator: 'Чистая прибыль',
    },
  ];
  return (
    <section className='paymentsFinancial__table'>
      <h2 className='paymentsFinancial__categories-title'>Прибыль и убытки</h2>
      <UniversalTable columns={columns} data={data} />
    </section>
  );
};

export default PaymentsFirstTable;
