import React, { useEffect } from 'react';
import { UniversalTable } from '../../../entities';
import { useDispatch } from 'react-redux';
import { useHistoryPayments } from '../../../app/store/admin/historyPayments/historyPaymentsSlice';
import { getExpenses } from '../../../app/store/admin/historyPayments/historyPaymentsThunks';

export const AccountingExpenses = () => {
  const dispatch = useDispatch();
  const { expenses: data } = useHistoryPayments();
  const columns = [
    { title: '№', dataIndex: 'id', key: 'id' },
    { title: 'Статья расхода', dataIndex: 'description', key: 'description' },
    { title: 'Сумма', dataIndex: 'amount', key: 'amount' },
    { title: 'Дата', dataIndex: 'date', key: 'date' },
    {
      title: 'Категория',
      dataIndex: 'category_display',
      key: 'category_display',
    },
  ];
  // const data = [
  //   {
  //     id: '1',
  //     expense_item: 'Зарплата Асанбеку',
  //     amount: '22 000 сом',
  //     date: '02.05.2025',
  //     category: 'Зарплата',
  //   },
  //   {
  //     id: '2',
  //     expense_item: 'Зарплата Асанбеку',
  //     amount: '22 000 сом',
  //     date: '02.05.2025',
  //     category: 'Зарплата',
  //   },
  //   {
  //     id: '3',
  //     expense_item: 'Зарплата Асанбеку',
  //     amount: '22 000 сом',
  //     date: '02.05.2025',
  //     category: 'Зарплата',
  //   },
  // ];
  useEffect(() => {
    dispatch(getExpenses());
  }, []);
  return (
    <section className='expenses'>
      <div className='container'>
        <h2 className='registration__title'>Расходы за Май 2025</h2>
        <UniversalTable columns={columns} data={data} />
      </div>
    </section>
  );
};
