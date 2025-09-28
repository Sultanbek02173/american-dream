import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { UniversalTable } from '../../universalTable/UniversalTable';

const getPaymentsSummary = (payments = []) => {
  const toNum = v => (v == null ? 0 : Number(v)) || 0;

  const total = payments.reduce(
    (sum, p) => sum + toNum(p.total ?? p.amount ?? p.to_pay),
    0
  );
  const paid = payments.reduce(
    (sum, p) => sum + toNum(p.paid ?? p.amount_paid ?? p.paid_sum),
    0
  );
  const remaining = Math.max(total - paid, 0);

  return { total, paid, remaining };
};

export const ReportTableStudents = ({ students = [] }) => {
  const navigate = useNavigate();

  const columns = [
    { title: '№', dataIndex: 'id', key: 'id' },
    { title: 'Студенты', dataIndex: 'student', key: 'student' },
    { title: 'Статус', dataIndex: 'status', key: 'status' },
    { title: 'Комментарий', dataIndex: 'comment', key: 'comment' },
  ];

  const data = useMemo(() => {
    return students.map((s, indx) => {
      const fullName =
        [s.last_name, s.first_name].filter(Boolean).join(' ') ||
        s.username ||
        `ID ${s.id}`;

      const status = s.is_active ? 'Активен' : 'Неактивен';

      const { total, paid, remaining } = getPaymentsSummary(s.payments);

      return {
        id: indx + 1,
        student: fullName,
        status,
        comment: (
          <div className='reportTableStudents__comment'>
            <p>Сумма к оплате: {total.toFixed(2)}</p>
            <p>Оплачено: {paid.toFixed(2)}</p>
            <p>Остаток: {remaining.toFixed(2)}</p>
          </div>
        ),
      };
    });
  }, [students]);

  return (
    <div className='reportTableStudents'>
      <UniversalTable
        columns={columns}
        data={data}
        onRowClick={item => navigate(`/report-table/${item.id}`)}
      />
    </div>
  );
};
