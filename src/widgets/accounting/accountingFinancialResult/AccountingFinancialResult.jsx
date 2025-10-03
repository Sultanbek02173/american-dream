import React, { useEffect } from 'react';
import { UniversalTable } from '../../../entities';
import { useDispatch } from 'react-redux';
import { useHistoryPayments } from '../../../app/store/admin/historyPayments/historyPaymentsSlice';
import { getFinancialReports } from '../../../app/store/admin/historyPayments/historyPaymentsThunks';

export const AccountingFinancialResult = () => {
  const dispatch = useDispatch();
  const { financialReports: data } = useHistoryPayments();
  const dataResult = data?.map(item => ({
    ...item,
    total_expenses: `${item.total_expenses} сом`,
    total_income: `${item.total_income} сом`,
    net_profit: `${item.net_profit} сом`,
  }));
  const columns = [
    { title: '№', dataIndex: 'id', key: 'id' },
    {
      title: 'Показатель',
      dataIndex: 'net_profit',
      key: 'net_profit',
    },
    { title: 'Сумма прихода', dataIndex: 'total_income', key: 'total_income' },
    {
      title: 'Сумма расходов',
      dataIndex: 'total_expenses',
      key: 'total_expenses',
    },
  ];
  console.log(dataResult);

  // const data = [
  //   {
  //     id: '1',
  //     amount: '3 000 с',
  //     indicator: 'Чистая прибыль',
  //   },
  // ];

  useEffect(() => {
    dispatch(getFinancialReports());
  }, []);
  return (
    <section className='financialResult'>
      <div className='container'>
        <h2 className='registration__title'>Финансовый результат:</h2>
        <UniversalTable columns={columns} data={dataResult} />
      </div>
    </section>
  );
};
