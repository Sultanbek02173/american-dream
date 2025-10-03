import React, { useEffect } from 'react';
import { UniversalTable } from '../../../entities';
import { useDispatch } from 'react-redux';
import { useHistoryPayments } from '../../../app/store/admin/historyPayments/historyPaymentsSlice';
import { getIncomes } from '../../../app/store/admin/historyPayments/historyPaymentsThunks';

export const AccountingIncome = () => {
  const dispatch = useDispatch();
  const { incomes: data } = useHistoryPayments();
  console.log(data);

  const columns = [
    { title: '№', dataIndex: 'idx', key: 'idx' },
    { title: 'Источник дохода', dataIndex: 'source', key: 'source' },
    { title: 'Сумма', dataIndex: 'amount', key: 'amount' },
    { title: 'Дата', dataIndex: 'date', key: 'date' },
    { title: 'Способ оплаты', dataIndex: 'payment_type', key: 'payment_type' },
  ];
  useEffect(() => {
    dispatch(getIncomes());
  }, []);
  return (
    <section className='income'>
      <div className='container'>
        <h2 className='registration__title'>Доходы за Май 2025</h2>
        <UniversalTable columns={columns} data={data.items} />
      </div>
    </section>
  );
};
