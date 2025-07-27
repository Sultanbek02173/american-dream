import React from 'react';
import { UniversalTable } from '../../../entities';

export const AccountingExpenses = () => {
  const columns = [
    { title: '№', dataIndex: 'id', key: 'id' },
    { title: 'Статья расхода', dataIndex: 'expense_item', key: 'expense_item' },
    { title: 'Сумма', dataIndex: 'amount', key: 'amount' },
    { title: 'Дата', dataIndex: 'date', key: 'date' },
    { title: 'Категория', dataIndex: 'category', key: 'category' },
  ];
  const data = [
    {
      id: '1',
      expense_item: 'Зарплата Асанбеку',
      amount: '22 000 сом',
      date: '02.05.2025',
      category: 'Зарплата',
    },
    {
      id: '2',
      expense_item: 'Зарплата Асанбеку',
      amount: '22 000 сом',
      date: '02.05.2025',
      category: 'Зарплата',
    },
    {
      id: '3',
      expense_item: 'Зарплата Асанбеку',
      amount: '22 000 сом',
      date: '02.05.2025',
      category: 'Зарплата',
    },
  ];
  return (
    <section className='expenses'>
      <div className='container'>
        <h2 className='registration__title'>Расходы за Май 2025</h2>
        <UniversalTable columns={columns} data={data} />
      </div>
    </section>
  );
};
