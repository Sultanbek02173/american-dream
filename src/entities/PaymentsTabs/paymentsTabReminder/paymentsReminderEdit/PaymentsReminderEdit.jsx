import React, { useState } from 'react';
import circleLogo from './image.png';
import editIcon from './editIcon.svg';
import { eventHandler } from '../../../../shared/utils/eventHandlers';
const initialState = {
  appeal: '',
  date: '',
  amount: '',
  payment_instruction: '',
};
const PaymentsReminderEdit = ({ data = initialState, onSubmit }) => {
  const { 0: state, 1: setState } = useState(data);
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
          <p className='paymentsReminder__message-appeal'>
            Уважаемый Асанов Тимур,
            <br />
            Напоминаем, что срок оплаты за курс
            <br />
            «Английский язык» наступает через 3 дня.
          </p>
          <p className='paymentsReminder__message-date'>До - 26.06.2025</p>
        </div>
        <p className='paymentsReminder__message-amount'>
          <span>Сумма к оплате:</span> 10 000 с
        </p>
        <div className='paymentsReminder__message-alert'>
          <p className='paymentsReminder__message-cash'>
            Вы можете оплатить удобным для вас способом: наличными, переводом
            или онлайн
          </p>
          <p className='paymentsReminder__message-respect'>
            <span>С уважением,</span>
            American Dream
          </p>
        </div>
      </div>
      <div className='paymentsReminder__term'>
        <p>За 3 дня до срока оплаты Уведомления приходят по SMS</p>
        <button className='paymentsReminder__term-button'>
          <img src={editIcon} alt='' /> Изменить
        </button>
      </div>
    </form>
  );
};

export default PaymentsReminderEdit;
