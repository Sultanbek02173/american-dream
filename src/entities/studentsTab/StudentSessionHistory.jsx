import React from 'react';
import { data } from '../../pages/admin/studentsTable/StudentsTable';

export const StudentSessionHistory = () => {
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
          <th>Направление</th>
          <th>Посещение</th>
        </tr>
      </thead>
      <tbody className='studentsTable__table-body'>
        <tr>
          <td>1</td>
          <td>21.05.2025</td>
          <td>Логика</td>
          <td>Присутствовал</td>
        </tr>
      </tbody>
    </table>
  );
};
