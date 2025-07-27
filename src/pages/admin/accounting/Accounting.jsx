import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Checkbox, TextField } from '@mui/material';
import { useState } from 'react';
import { inputStyle } from '../../../shared/utils/MuiStyles';
import { eventHandler } from '../../../shared/utils/eventHandlers';
import {
  AccountingExpenses,
  AccountingIncome,
  AccountingSettlements,
} from '../../../widgets';
import { AccountingFinancialResult } from '../../../widgets/accounting/accountingFinancialResult/AccountingFinancialResult';
import './accounting.scss';

export const Accounting = () => {
  const [state, setState] = useState({
    id: 1,
    student: 'Алина',
    direction: '@alin1244',
    amount: '+996 500 123 456',
    cash: '',
    transfer: '',
    online: '',
    comment: 'mentalArithmetic',
    discount: '',
  });
  const onChange = eventHandler(setState);
  const isAllFieldsFilled = obj =>
    Object.entries(obj).every(([key, value]) => {
      if (key === 'image' || key === 'id') return true;
      return value !== '' && value !== null && value !== undefined;
    });
  return (
    <main className='accounting'>
      <section className='registration'>
        <div className='container'>
          <h2 className='registration__title'>Регистрация оплат</h2>
          <p className='registration__subtitle'>Регистрация новых оплат</p>
          <form onSubmit={e => e.preventDefault()}>
            <div className='studentsDetail__form-inputs'>
              <TextField
                label='Студент'
                name='student'
                onChange={onChange}
                value={state.student}
                variant='outlined'
                sx={{ ...inputStyle, width: '100%' }}
              />
            </div>
            <div className='studentsDetail__form-inputs'>
              <TextField
                label='Направление'
                name='direction'
                onChange={onChange}
                value={state.direction}
                variant='outlined'
                sx={{ ...inputStyle, width: '55%' }}
              />
              <TextField
                label='Сумма'
                name='amount'
                onChange={onChange}
                value={state.amount}
                variant='outlined'
                sx={{ ...inputStyle, width: '45%' }}
              />
            </div>
            <div className='studentsDetail__form-inputs'>
              <TextField
                id='outlined-basic'
                label='Наличные'
                name='cash'
                onChange={onChange}
                value={state.cash}
                variant='outlined'
                sx={{ ...inputStyle, width: '33.3%' }}
              />
              <TextField
                id='outlined-basic'
                label='Перевод'
                name='transfer'
                onChange={onChange}
                value={state.transfer}
                variant='outlined'
                sx={{ ...inputStyle, width: '33.3%' }}
              />
              <TextField
                id='outlined-basic'
                label='Онлайн'
                name='online'
                onChange={onChange}
                value={state.online}
                variant='outlined'
                sx={{ ...inputStyle, width: '33.3%' }}
              />
            </div>
            <div className='studentsDetail__form-inputs'>
              <TextField
                label='Комментарий'
                name='comment'
                onChange={onChange}
                value={state.comment}
                variant='outlined'
                sx={{ ...inputStyle, width: '45%' }}
              />
              <TextField
                label='Скидка'
                name='discount'
                onChange={onChange}
                value={state.discount}
                variant='outlined'
                sx={{ ...inputStyle, width: '55%' }}
              />
            </div>
            <div className='paymentType__tabs'>
              <div className='paymentType__tabs-item'>
                <Checkbox
                  icon={
                    <CheckBoxOutlineBlankIcon sx={{ fontSize: 32 }} /> // размер неактивного чекбокса
                  }
                  checkedIcon={
                    <CheckBoxIcon sx={{ fontSize: 32 }} /> // размер активного чекбокса
                  }
                  // checked={selectedStudents.includes(student.id)}
                  onChange={() => {}}
                  sx={{
                    color: '#fff',
                    '&.Mui-checked': {
                      color: '#2DE920',
                    },
                  }}
                />
                <p>Частичная оплата</p>
              </div>
              <div className='paymentType__tabs-item'>
                <Checkbox
                  icon={
                    <CheckBoxOutlineBlankIcon sx={{ fontSize: 32 }} /> // размер неактивного чекбокса
                  }
                  checkedIcon={
                    <CheckBoxIcon sx={{ fontSize: 32 }} /> // размер активного чекбокса
                  }
                  // checked={selectedStudents.includes(student.id)}
                  onChange={() => {}}
                  sx={{
                    color: '#fff',
                    '&.Mui-checked': {
                      color: '#2DE920',
                    },
                  }}
                />
                <p>Полная оплата</p>
              </div>
            </div>
            <div className='dataTeacher__row'>
              <button
                className='dataTeacher__row-button'
                type='button'
                // onClick={() => navigate('/teacher-table')}
              >
                Сбросить
              </button>
              <button
                className='dataTeacher__row-button add'
                disabled={!isAllFieldsFilled(state)}
              >
                Зарегистрировать оплату
              </button>
            </div>
          </form>
        </div>
      </section>
      <AccountingSettlements />
      <AccountingIncome />
      <AccountingExpenses />
      <AccountingFinancialResult />
      <section className='container'>
        <div className='popularityCourses_reload'>
          <p>
            Все отчёты генерируются автоматически на основе внесённых данных:
            оплаты учеников, проведённых занятий, ставок и расходов.
          </p>

          <div className='row popularityCourses_reload_btns'>
            <button>Отправить на почту Руководителя</button>
            <button>Скачать отчёт PDF</button>
          </div>
        </div>
      </section>
    </main>
  );
};
