import React from 'react';

export const StudentPaymentHistory = () => {
  return (
    <table
      border='0'
      cellSpacing='0'
      style={{ borderRadius: '6px' }}
      className='studentsTable__table'
    >
      <thead className='studentsTable__table-head'>
        <tr>
          <th>№</th>
          <th>Дата</th>
          <th>Сумма оплаты</th>
          <th>Способ оплаты</th>
          <th>Месяц оплаты</th>
        </tr>
      </thead>
      <tbody className='studentsTable__table-body'>
        <tr>
          <td>1</td>
          <td>21.05.2025</td>
          <td>3000 с</td>
          <td>Наличные</td>
          <td>Оплата за Май</td>
        </tr>
      </tbody>
    </table>
  );
};
