import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UniversalTable } from '../../universalTable/UniversalTable';
import { IoIosArrowDown } from 'react-icons/io';
import { AnimatePresence, motion } from 'framer-motion';

const getPaymentsSummary = (payments = []) => {
  const toNum = v => (v == null ? 0 : Number(v)) || 0;

  console.log(payments);

  const total = payments.reduce((sum, p) => sum + toNum(p.paid_amount), 0);
  const paid = payments.reduce((sum, p) => sum + toNum(p.final_amount), 0);
  const remaining = payments.reduce((sum, p) => sum + toNum(p.balance), 0);

  return { total, paid, remaining };
};

export const ReportTableStudents = ({ students = [] }) => {
  const navigate = useNavigate();
  const [openPaymentsId, setOpenPaymentsId] = useState(null);

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
      <div className='reportTableStudents__wrapper'>
        <UniversalTable
          columns={columns}
          data={data}
          onRowClick={item => navigate(`/report-table/${item.id}`)}
        />
      </div>
      <div className='payments-accordion'>
        {data.map((row, index) => {
          const isOpen = openPaymentsId === row.id;
          return (
            <div
              key={`pay-${row.id}`}
              className={`payments-card ${isOpen ? ' open' : ''}`}
            >
              <button
                type='button'
                className='payments-card__head'
                onClick={() =>
                  setOpenPaymentsId(prev => (prev === row.id ? null : row.id))
                }
              >
                <span className='payments-card__title'>
                  {index + 1}. {row.student}
                </span>
                <IoIosArrowDown
                  className={`payments-card__icon${isOpen ? ' rotate' : ''}`}
                  size={20}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    className='payments-card__body'
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: 'easeInOut' }}
                  >
                    <div className='payments-card__row'>
                      <span className='payments-card__label'>Статус:</span>
                      <span className='payments-card__status payments-card__status--active'>
                        {row.status}
                      </span>
                    </div>
                    <div className='payments-card__divider' />
                    <div className='payments-card__row payments-card__row--column'>
                      <span className='payments-card__label'>Комментарий:</span>
                      <div className='payments-card__comment'>
                        {row.comment}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};
