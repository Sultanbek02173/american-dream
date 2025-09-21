import { useDispatch } from 'react-redux';
import { UniversalTable } from '../../universalTable/UniversalTable';
import { useEffect, useMemo } from 'react';
import { getPaymentTeacher } from '../../../app/store/admin/paymentsTeacher/paymentsTeacherThunks';
import { usePaymentTeacher } from '../../../app/store/admin/paymentsTeacher/paymentsTeacherSlice';

const PaymentsSecondTable = () => {
  const dispatch = useDispatch();
  const { paymentTeacher } = usePaymentTeacher();

  const columns = [
    { title: 'Преподаватель', dataIndex: 'teacher', key: 'teacher' },
    { title: 'Занятий', dataIndex: 'classes', key: 'classes' },
    { title: 'Ставка', dataIndex: 'bet', key: 'bet' },
    { title: 'Выплата', dataIndex: 'payout', key: 'payout' },
    { title: 'Бонус', dataIndex: 'bonus', key: 'bonus' },
    { title: 'Итог', dataIndex: 'result', key: 'result' },
  ];

  const data = useMemo(() => {
    if (!paymentTeacher) return [];
    return paymentTeacher.map(item => ({
      key: item?.id ?? 0,
      teacher: item?.teacher_name ?? '-',
      classes: item?.lessons_count ?? '-',
      bet: `${item?.rate ?? 0} с`,
      payout: `${item?.payment ?? 0} с`,
      bonus: `${item?.bonus ?? 0} с`,
      result: item?.is_paid ? 'Оплачено' : 'Не оплачено',
    }));
  }, [paymentTeacher]);

  useEffect(() => {
    dispatch(getPaymentTeacher());
  }, [dispatch]);

  return (
    <section className='paymentsFinancial__table'>
      <h2 className='paymentsFinancial__categories-title'>
        Отчёты по преподавателям
      </h2>
      <UniversalTable columns={columns} data={data} />
    </section>
  );
};

export default PaymentsSecondTable;
