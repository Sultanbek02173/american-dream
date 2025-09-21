import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
} from 'react-icons/io';
import './applicationsAdmin.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { ApplicatinModal } from '../../../entities';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useDispatch } from 'react-redux';
import { applicationGet } from '../../../app/store/admin/application/applicationThunks';
import { useApplicationAdmin } from '../../../app/store/admin/application/applicationSlice';

dayjs.extend(customParseFormat);

export const ApplicationsAdmin = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState('new');
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const inputRef = useRef(null);
  const [modalData, setModalData] = useState();

  const dispatch = useDispatch();
  const { application } = useApplicationAdmin();
  console.log(application);

  const handleDateChange = e => {
    setSelectedDate(dayjs(e.target.value));
  };

  const filteredApplications = Array.isArray(application)
    ? application.filter(card => {
        if (!card || !card.status || !card.updated_at) return false;
        const statusMatch = active ? card.status === active : true;
        const parsedDate = dayjs(card.updated_at, 'DD.MM.YYYY HH:mm', true);
        if (!parsedDate.isValid()) return false;
        const cardDate = parsedDate.format('YYYY-MM-DD');
        const selected = selectedDate.format('YYYY-MM-DD');
        const dateMatch = cardDate === selected;
        return statusMatch && dateMatch;
      })
    : [];

  const buttons = [
    { label: 'Новые', value: 'new' },
    { label: 'В работе', value: 'in_progress' },
    { label: 'Записан', value: 'registered' },
    { label: 'Отказ', value: 'rejected' },
  ];

  useEffect(() => {
    dispatch(applicationGet());
  }, [dispatch]);

  console.log(modalData);

  return (
    <div className='applicationsAdmin_cont'>
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
          {filteredApplications.length > 0 ? (
            filteredApplications.map(card => (
              <div
                onClick={() => {
                  setOpen(!open);
                  setModalData(card);
                }}
                key={card.id}
                className='row card'
              >
                <div className='card_user'>
                  <h3>{card.name || 'Без имени'}</h3>
                  <p className='card_user_phone'>{card.phone || '—'}</p>
                  <p>
                    {card.comment
                      ? card.comment.length > 20
                        ? `${card.comment.slice(0, 20)}...`
                        : card.comment
                      : 'Нет комментария'}
                  </p>
                </div>
                <p className='row card_btn'>
                  Расвернуть <IoIosArrowDown size={20} />
                </p>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', marginTop: 20 }}>Заявок нет</p>
          )}
        </div>
      </section>

      <ApplicatinModal setOpen={setOpen} open={open}>
        {modalData && (
          <>
            <div className='modal_container_user'>
              <h3>{modalData.name}</h3>
              <p>{modalData.phone}</p>
              <p>{modalData.email}</p>
              <p>Источник: Форма на сайте</p>
              <p>{modalData.course}</p>
            </div>
            <div className='modal_container_message'>
              <p>{modalData.comment}</p>
              <input type='text' name='user' placeholder='Аслан Караев' />
              <p>{modalData.updated_at}</p>
            </div>
          </>
        )}
      </ApplicatinModal>
    </div>
  );
};
