import { useEffect, useMemo } from 'react';
import { UniversalTable } from '../../universalTable/UniversalTable';
import { useDispatch } from 'react-redux';
import { getHistoryPayments } from '../../../app/store/admin/historyPayments/historyPaymentsThunks';
import { useHistoryPayments } from '../../../app/store/admin/historyPayments/historyPaymentsSlice';

export const PaymentsTabHistory = () => {
  const dispatch = useDispatch();
  const { payments } = useHistoryPayments();

  const columns = [
    { title: 'Дата', dataIndex: 'date', key: 'date' },
    { title: 'Студент', dataIndex: 'student', key: 'student' },
    { title: 'Курс', dataIndex: 'course', key: 'course' },
    { title: 'Сумма', dataIndex: 'amount', key: 'amount' },
    { title: 'Тип', dataIndex: 'type', key: 'type' },
    { title: 'Статус', dataIndex: 'status', key: 'status' },
  ];

  const formatDate = iso => {
    if (!iso) return '-';
    const d = new Date(iso);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}.${mm}.${yyyy}`;
  };

  const formatAmount = val => {
    const num = Number(val);
    if (Number.isNaN(num)) return val ?? '-';
    return `${new Intl.NumberFormat('ru-RU').format(num)} с`;
  };

  const data = useMemo(
    () =>
      (payments || [])?.map(p => ({
        key: p.id ?? `${p.student_name}-${p.date}`, 
        date: formatDate(p.date),
        student: p.student_name ?? '-',
        course: p.course_name ?? '-', 
        amount: formatAmount(p.amount),
        type: p.payment_type_display ?? p.payment_type ?? '-',
        status: p.status_display ?? p.status ?? '-', 
      })),
    [payments]
  );

  useEffect(() => {
    dispatch(getHistoryPayments());
  }, [dispatch]);

  return (
    <div className='paymentsHistory'>
      <UniversalTable columns={columns} data={data} />
    </div>
  );
};
