import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useStudents } from '../../app/store/admin/students/studentsSlice';
import { useParams } from 'react-router-dom';
import { getStudentPayments } from '../../app/store/admin/students/studentsThunk';

export const StudentPaymentHistory = () => {
  const dispatch = useDispatch();
  const { studentPayments } = useStudents();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getStudentPayments(id));
  }, []);
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
        {studentPayments?.map(history => {
          return (
            <tr>
              <td>{history.id}</td>
              <td>{history.date}</td>
              <td>{history.amount} с</td>
              <td>{history.payment_type}</td>
              <td>{history.comment}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
