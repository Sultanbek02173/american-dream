import React, { useEffect } from 'react';
import { UniversalTable } from '../../../entities';
import { useDispatch } from 'react-redux';
import { useHistoryPayments } from '../../../app/store/admin/historyPayments/historyPaymentsSlice';
import { getTeachersSalaries } from '../../../app/store/admin/historyPayments/historyPaymentsThunks';

export const AccountingSettlements = () => {
  const dispatch = useDispatch();
  const { teachersSalaries: data } = useHistoryPayments();
  const columns = [
    { title: 'Преподаватель', dataIndex: 'teacher_name', key: 'teacher_name' },
    { title: 'Занятий', dataIndex: 'lessons_count', key: 'lessons_count' },
    { title: 'Ставка', dataIndex: 'rate', key: 'rate' },
    { title: 'Выплата', dataIndex: 'payment', key: 'payment' },
    { title: 'Бонус', dataIndex: 'bonus', key: 'bonus' },
    { title: 'Выплачено', dataIndex: 'paid_amount', key: 'paid_amount' },
  ];
  // const data = [
  //   {
  //     teacher: 'Асанов Тимур',
  //     classes: '01.06.2025',
  //     bet: 'Английский язык',
  //     payout: '3 000 с',
  //     bonus: 'Перевод',
  //     paid_out: '16 000 с',
  //   },
  //   {
  //     teacher: 'Асанов Тимур',
  //     classes: '01.06.2025',
  //     bet: 'Английский язык',
  //     payout: '3 000 с',
  //     bonus: 'Перевод',
  //     paid_out: '16 000 с',
  //   },
  //   {
  //     teacher: 'Асанов Тимур',
  //     classes: '01.06.2025',
  //     bet: 'Английский язык',
  //     payout: '3 000 с',
  //     bonus: 'Перевод',
  //     paid_out: '16 000 с',
  //   },
  //   {
  //     teacher: 'Асанов Тимур',
  //     classes: '01.06.2025',
  //     bet: 'Английский язык',
  //     payout: '3 000 с',
  //     bonus: 'Перевод',
  //     paid_out: 'Оплачено',
  //   },
  // ];

  useEffect(() => {
    dispatch(getTeachersSalaries());
  }, []);

  return (
    <section className='settlements'>
      <div className='container'>
        <h2 className='registration__title'>Расчёты с преподавателями</h2>
        <div className='settlements__head'>
          <p className='registration__subtitle'>
            Заработная плата преподавателей
          </p>
          <p className='registration__subtitle'>Выплата считая Удержание</p>
        </div>
        <UniversalTable columns={columns} data={data} />
      </div>
    </section>
  );
};
