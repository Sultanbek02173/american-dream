import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
} from 'react-icons/io';
import './applicationsAdmin.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ApplicatinModal } from '../../../entities';

export const ApplicationsAdmin = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState('new');
  const [open, setOpen] = useState(false);

  const buttons = [
    { label: 'Новые', value: 'new' },
    { label: 'В работе', value: 'now' },
    { label: 'Записан', value: 'recorded' },
    { label: 'Отказ', value: 'refusal' },
  ];

  const cardUser = [
    {
      id: 0,
      user: 'Айбек Калыков',
      number: '+996 555 111 222',
      title: 'Подготовка к ОРТ',
    },
    {
      id: 1,
      user: 'Айбек Калыков',
      number: '+996 555 111 222',
      title: 'Подготовка к ОРТ',
    },
    {
      id: 2,
      user: 'Айбек Калыков',
      number: '+996 555 111 222',
      title: 'Подготовка к ОРТ',
    },
    {
      id: 3,
      user: 'Айбек Калыков',
      number: '+996 555 111 222',
      title: 'Подготовка к ОРТ',
    },
  ];
  return (
    <div className='applicationsAdmin_cont'>
      <section>
        <div className='row applicationsAdmin_cont_header'>
          <p className='row' onClick={() => navigate(-1)}>
            <IoIosArrowBack size={24} /> Назад
          </p>

          <p className='row date'>
            <IoIosArrowBack size={35} color='#2DE920' />
            01.06.2025 <IoIosArrowForward size={35} color='#2DE920' />
          </p>
        </div>

        <div className='applicationsAdmin_cont_btns_fiter row'>
          {buttons.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setActive(value)}
              className={`filter_btn ${value === active ? 'active' : ''}`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className='applicationsAdmin_cont_cards'>
          {cardUser &&
            cardUser.map(card => (
              <div onClick={() => setOpen(!open)} key={card.id} className='row card'>
                <div className='card_user'>
                  <h3>{card.user}</h3>
                  <p className='card_user_phone'>{card.number}</p>

                  <p>{card.title}</p>
                </div>
                <p className='row card_btn'>
                  Расвернуть <IoIosArrowDown size={20} />
                </p>
              </div>
            ))}
        </div>
      </section>

      <ApplicatinModal setOpen={setOpen} open={open}/>
    </div>
  );
};
