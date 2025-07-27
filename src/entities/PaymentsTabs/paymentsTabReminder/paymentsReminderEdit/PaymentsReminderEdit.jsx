import React, { useState } from 'react';
import circleLogo from './image.png';
import editIcon from './editIcon.svg';
import { eventHandler } from '../../../../shared/utils/eventHandlers';

const initialState = {
  appeal:
    'Уважаемый Асанов Тимур,\nНапоминаем, что срок оплаты за курс\n«Английский язык» наступает через 3 дня.',
  date: '26.06.2025',
  amount: '10 000 с',
  payment_instruction:
    'Вы можете оплатить удобным для вас способом: наличными, переводом или онлайн',
};

const PaymentsReminderEdit = ({ data = initialState, onSubmit }) => {
  const [state, setState] = useState(data);
  const [isEditing, setIsEditing] = useState(false);
  const onChange = eventHandler(setState);

  return (
    <form onSubmit={e => e.preventDefault()}>
      <div className='paymentsReminder__message'>
        <img
          className='paymentsReminder__message-avatar'
          src={circleLogo}
          alt=''
        />
        <div className='paymentsReminder__message-alert'>
          {isEditing ? (
            <textarea
              name='appeal'
              value={state.appeal}
              onChange={onChange}
              className='paymentsReminder__input'
            />
          ) : (
            <p className='paymentsReminder__message-appeal'>
              {state.appeal.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
          )}
          <p className='paymentsReminder__message-date'>До - {state.date}</p>
        </div>

        <p
          className={
            isEditing
              ? 'paymentsReminder__message-amount paymentsReminder__input'
              : 'paymentsReminder__message-amount'
          }
        >
          <span>Сумма к оплате:</span>
          {isEditing ? (
            <input name='amount' value={state.amount} onChange={onChange} />
          ) : (
            state.amount
          )}
        </p>

        <div className='paymentsReminder__message-alert'>
          {isEditing ? (
            <textarea
              name='payment_instruction'
              value={state.payment_instruction}
              onChange={onChange}
              className='paymentsReminder__input'
            />
          ) : (
            <p className='paymentsReminder__message-cash'>
              {state.payment_instruction}
            </p>
          )}
          <p className='paymentsReminder__message-respect'>
            <span>С уважением,</span>
            American Dream
          </p>
        </div>
      </div>

      <div className='paymentsReminder__term'>
        <p>За 3 дня до срока оплаты Уведомления приходят по SMS</p>
        {!isEditing ? (
          <button
            type='button'
            className='paymentsReminder__term-button'
            onClick={() => setIsEditing(true)}
          >
            <img src={editIcon} alt='' /> Изменить
          </button>
        ) : (
          <button
            className='dataTeacher__row-button add'
            onClick={() => setIsEditing(false)}
            // disabled={!isAllFieldsFilled(state)}
          >
            Сохранить
          </button>
        )}
      </div>
    </form>
  );
};

export default PaymentsReminderEdit;
