import { useState } from 'react';
import { ApplicatinModal, UniversalTable } from '../../../entities';
import './mainTeacher.scss';
import { IoIosArrowDown } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

export const MainTeacher = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const columns = [
    { title: '№', dataIndex: 'id', key: 'id' },
    { title: 'Направление', dataIndex: 'direction', key: 'direction' },
    { title: 'Группа', dataIndex: 'group', key: 'group' },
    { title: 'Курс', dataIndex: 'course', key: 'course' },
    { title: 'Урок', dataIndex: 'lesson', key: 'lesson' },
  ];
  const cardUser = [
    {
      id: 0,
      user: 'Айбек Калыков',
      number: '+996 555 111 222',
      title: 'Подготовка к ОРТ',
      status: 'retake',
    },
    {
      id: 1,
      user: 'Айбек Калыков',
      number: '+996 555 111 222',
      title: 'Подготовка к ОРТ',
      status: 'verified',
    },
    {
      id: 2,
      user: 'Айбек Калыков',
      number: '+996 555 111 222',
      title: 'Подготовка к ОРТ',
      status: 'failed',
    },
    {
      id: 3,
      user: 'Айбек Калыков',
      number: '+996 555 111 222',
      title: 'Подготовка к ОРТ',
      status: 'verified',
    },
  ];
  return (
    <main>
      <section className='groups'>
        <div className='container'>
          <p className='groups__subtitle'>Hi, Аслан!</p>
          <h3 className='groups__title'>Мои группы</h3>
          <UniversalTable
            columns={columns}
            data={[
              {
                id: 1,
                direction: 'Английский язык',
                group: 'ENG-04',
                course: '1',
                lesson: '1',
              },
            ]}
            onRowClick={item => navigate(`/table/${item.id}`)}
          />
        </div>
      </section>
      <section className='students'>
        <div className='container'>
          <div className='applicationsAdmin_cont_cards'>
            {cardUser &&
              cardUser.map(card => (
                <div
                  onClick={() => setOpen(!open)}
                  key={card.id}
                  className={`row card ${card.status}`} // retake, verified, failed
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
          <ApplicatinModal setOpen={setOpen} open={open}>
            <div className='modal__content'>
              <div className='modal__content-head'>
                <div>
                  <h3>Айбек Калыков</h3>
                  <p>ENG-04</p>
                </div>
                <p className='modal__content-text modal__content-tex1'>
                  Комментарий: Можно, пожалуйста, до завтра проверить? :)
                </p>
                <p className='modal__content-text'>03.06.2025 — 23:59</p>
              </div>
              <div className='modal__content-body'>
                <div className='modal__content-row'>
                  <p className='modal__content-text'>
                    Ссылка на ДЗ: <a href='#'>ССЫЛКА</a>
                  </p>
                  <p className='modal__content-text'>
                    Файл ДЗ: <a href='#'>ССЫЛКА</a>
                  </p>
                </div>
                <div className='modal__content-row1'>
                  <input
                    type='text'
                    placeholder='Балы:'
                    className='modal__content-input width'
                  />
                  <input
                    type='text'
                    placeholder='Комментарий:'
                    className='modal__content-input'
                  />
                </div>
              </div>
              <div className='dataTeacher__row'>
                <button
                  className='dataTeacher__row-button'
                  type='button'
                  onClick={() => setOpen(false)}
                >
                  Отказатся
                </button>
                <button
                  className='dataTeacher__row-button add'
                  // disabled={!isAllFieldsFilled(state)}
                >
                  Отправить
                </button>
              </div>
            </div>
          </ApplicatinModal>

          {/* <div className='row1'>
            <div className='col-4'>
                <div className="students__card">

                </div>
            </div>
          </div> */}
        </div>
      </section>
    </main>
  );
};
