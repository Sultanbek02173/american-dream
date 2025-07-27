import { useState } from 'react';
import { UniversalTable } from '../../../entities';
import './mainTeacher.scss';

export const MainTeacher = () => {
  const [open, setOpen] = useState(false);

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
