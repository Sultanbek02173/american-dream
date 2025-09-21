import React, { useEffect } from 'react';
import { data } from '../../pages/admin/studentsTable/StudentsTable';
import { useDispatch } from 'react-redux';
import { useStudents } from '../../app/store/admin/students/studentsSlice';
import { useParams } from 'react-router-dom';
import { getStudentHistory } from '../../app/store/admin/students/studentsThunk';

export const StudentSessionHistory = () => {
  const dispatch = useDispatch();
  const { studentHistory } = useStudents();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getStudentHistory(id));
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
          <th>Направление</th>
          <th>Посещение</th>
        </tr>
      </thead>
      <tbody className='studentsTable__table-body'>
        {studentHistory?.map(history => {
          return (
            <tr>
              <td>{history.id}</td>
              <td>{history.date}</td>
              <td>{history.subject}</td>
              <td>{history.status_display}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
