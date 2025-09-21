import reload from '../../../shared/imgs/admin/Vector_reload.svg';
import { VerticalProgress } from '../../../featurs';
import './payment.scss';
import { useAdminHome } from '../../../app/store/admin/homeAdmin/homeAdminSlice';

export const Payment = () => {
  const { dashBoard } = useAdminHome();

  return (
    <section className='payment'>
      <div className='row payment_header'>
        <p>Получено оплат сегодня</p>
        <p className='row payment_header_reload'>
          <img src={reload} alt='' />
          Обновлено: 14:20
        </p>
      </div>

      <div className='payment_statistics'>
        <p className='sum'>Сумма:</p>

        <div className='row'>
          <div className='payment_statistics_sum'>
            <h2>
              {dashBoard?.payments_today?.amount
                ? dashBoard?.payments_today?.amount
                : 0}
              c
            </h2>
            <p>
              Общая сумма всех поступлений за день, включая наличные, переводы и
              онлайн-оплаты.
            </p>
          </div>
          <div className='payment_statistics_progress'>
            <div className='stastic'>
              <VerticalProgress
                progress={
                  (dashBoard?.payments_by_method?.cash /
                    dashBoard?.payments_today?.amount) *
                  100
                }
                text={'Наличными'}
                width={'100px'}
                height={'400px'}
                border={'100px'}
                color={'#2DE920'}
              />
            </div>
            <div className='stastic'>
              <VerticalProgress
                progress={
                  (dashBoard?.payments_by_method?.transfer /
                    dashBoard?.payments_today?.amount) *
                  100
                }
                text={'Перевод'}
                width={'100px'}
                height={'400px'}
                border={'100px'}
                color={'#25b11bff'}
              />
            </div>
            <div className='stastic'>
              <VerticalProgress
                progress={
                  (dashBoard?.payments_by_method?.online /
                    dashBoard?.payments_today?.amount) *
                  100
                }
                text={'Онлайн'}
                width={'100px'}
                height={'400px'}
                border={'100px'}
                color={'#1c8014ff'}
              />
            </div>
          </div>
        </div>
      </div>

      <div className='row pay_user'>
        <div className='pay_user_left'>
          <div className='row pay_user_left_header'>
            <p>Сумма:</p>
            <p className='type_pay'>Перевод</p>
          </div>
          <div>
            <h2>
              {dashBoard?.payments_by_method?.transfer
                ? dashBoard?.payments_by_method?.transfer
                : 0}
              c
            </h2>
          </div>
        </div>
        <div className='pay_user_right'>
          <div className='row pay_user_right_header'>
            <p>Сумма:</p>
            <p className='type_pay'>Наличные</p>
          </div>
          <div>
            <h2>
              {dashBoard?.payments_by_method?.cash
                ? dashBoard?.payments_by_method?.cash
                : 0}
              c
            </h2>
          </div>
        </div>
      </div>
      <div className='pay_online'>
        <div className='row pay_online_header'>
          <p>Сумма:</p>
          <h2>
            {dashBoard?.payments_by_method?.online
              ? dashBoard?.payments_by_method?.online
              : 0}
            c
          </h2>
        </div>
        <div>
          <p className='type_pay'>Онлайн</p>
        </div>
      </div>
    </section>
  );
};
