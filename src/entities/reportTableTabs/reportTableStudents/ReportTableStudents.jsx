import React from 'react';
import { UniversalTable } from '../../universalTable/UniversalTable';

export const ReportTableStudents = () => {
  const columns = [
    { title: '№', dataIndex: 'id', key: 'id' },
    { title: 'Студенты', dataIndex: 'student', key: 'student' },
    { title: 'Статус', dataIndex: 'status', key: 'status' },
    { title: 'Комментарий', dataIndex: 'comment', key: 'comment' },
  ];
  return (
    <div className='reportTableStudents'>
      <UniversalTable
        columns={columns}
        data={[
          {
            id: 1,
            student: 'Группа (A3)',
            status: 'Английский',
            comment: (
              <div className='reportTableStudents__comment'>
                <p>Сумма к оплате: 10000.00</p> <p>Оплачено: 10000.00</p>
                <p>Остаток: 0</p>
              </div>
            ),
          },
        ]}
        onRowClick={item => navigate(`/report-table/${item.id}`)}
      />
    </div>
  );
};
