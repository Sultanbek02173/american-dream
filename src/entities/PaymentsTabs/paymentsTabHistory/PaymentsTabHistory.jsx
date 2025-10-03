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

  // Перевод статусов из бэка
  const statusRu = code => {
    switch (code) {
      case 'pending':
        return 'Ожидает оплаты';
      case 'partial':
        return 'Частично оплачено';
      case 'paid':
        return 'Оплачено';
      default:
        return '-';
    }
  };

  // Определяем наибольшую сумму и её тип оплаты
  const pickMaxMethod = p => {
    const methods = [
      {
        key: 'cash_amount',
        label: 'Наличные',
        value: Number(p?.cash_amount ?? 0),
      },
      {
        key: 'transfer_amount',
        label: 'Перевод',
        value: Number(p?.transfer_amount ?? 0),
      },
      {
        key: 'online_amount',
        label: 'Онлайн',
        value: Number(p?.online_amount ?? 0),
      },
    ];

    // Если равные значения — берём первый по порядку (нал/перевод/онлайн)
    const max = methods.reduce((acc, m) => (m.value > acc.value ? m : acc), {
      key: '',
      label: '-',
      value: 0,
    });

    return { amount: max.value, typeLabel: max.label };
  };

  const data = useMemo(
    () =>
      (payments || []).map(p => {
        const { amount, typeLabel } = pickMaxMethod(p);

        return {
          key: p.id ?? `${p.student_name}-${p.date}`,
          date: formatDate(p.date),
          student: p.student_name ?? '-',
          course: p.month_name ?? '-',
          amount: formatAmount(amount),
          type: typeLabel, 
          status: statusRu(p.invoice_status),
        };
      }),
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
