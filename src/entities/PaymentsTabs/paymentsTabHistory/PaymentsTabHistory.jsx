import React from 'react';
import { UniversalTable } from '../../universalTable/UniversalTable';

export const PaymentsTabHistory = () => {
  const columns = [
    { title: 'Дата', dataIndex: 'date', key: 'date' },
    { title: 'Студент', dataIndex: 'student', key: 'student' },
    { title: 'Курс', dataIndex: 'course', key: 'course' },
    { title: 'Сумма', dataIndex: 'amount', key: 'amount' },
    { title: 'Тип', dataIndex: 'type', key: 'type' },
    { title: 'Статус', dataIndex: 'status', key: 'status' },
  ];
  const data = [
    {
      date: '01.06.2025',
      student: 'Асанов Тимур',
      course: 'Английский язык',
      amount: '3 000 с',
      type: 'Перевод',
      status: 'Оплачено',
    },
  ];
  return (
    <div className='paymentsHistory'>
      <UniversalTable columns={columns} data={data} />
    </div>
  );
};
