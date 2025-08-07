import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
} from 'react-icons/io';
import './applicationSection.scss';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { ApplicatinModal } from '../../entities';
import dayjs from 'dayjs';

export const ApplicationSection = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState('new');
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const inputRef = useRef(null);

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

  const handleDateChange = e => {
    setSelectedDate(dayjs(e.target.value));
  };
  return (
    <section className='applicationsAdmin_cont'>
      <section>
        <div className='row applicationsAdmin_cont_header'>
          <p className='row' onClick={() => navigate(-1)}>
            <IoIosArrowBack size={24} /> Назад
          </p>

          <div className='row date' style={{ position: 'relative' }}>
            <IoIosArrowBack
              size={35}
              color='#2DE920'
              onClick={() => setSelectedDate(selectedDate.subtract(1, 'day'))}
              style={{ cursor: 'pointer' }}
            />

            <p
              onClick={() => inputRef.current && inputRef.current.showPicker()}
            >
              {selectedDate.format('DD.MM.YYYY')}
            </p>

            <IoIosArrowForward
              size={35}
              color='#2DE920'
              onClick={() => setSelectedDate(selectedDate.add(1, 'day'))}
              style={{ cursor: 'pointer' }}
            />

            <input
              ref={inputRef}
              type='date'
              value={selectedDate.format('YYYY-MM-DD')}
              onChange={handleDateChange}
              style={{
                position: 'absolute',
                opacity: 0,
                pointerEvents: 'none',
                width: 0,
                height: 0,
              }}
            />
          </div>
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
              <div
                onClick={() => setOpen(!open)}
                key={card.id}
                className='row card'
              >
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

      <ApplicatinModal setOpen={setOpen} open={open}>
        <>
          <div className='modal_container_user'>
            <h3>Айбек Калыков</h3>
            <p>+996 555 111 222</p>
            <p>ayibek45676@gmail.com</p>
            <p>Источник: Форма на сайте</p>
            <p>Подготовка к ОРТ</p>
          </div>
          <div className='modal_container_message'>
            <p>"Хотел бы узнать расписание и формат занятий"</p>
            <input type='text' name='user' placeholder='Аслан Караев' />
            <p>03.06.2025 — 12:42</p>
          </div>
        </>
      </ApplicatinModal>
    </section>
  );
};
