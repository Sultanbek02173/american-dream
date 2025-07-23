import './loadTechers.scss';
import { UniversalTable } from '../../../entities';
import { useState } from 'react';

export const LoadTechers = () => {
  const [active, setActive] = useState(true);
  const columns = [
    { title: 'Преподаватель', dataIndex: 'teachers', key: 'teachers' },
    { title: 'Занятий в неделю', dataIndex: 'lessons', key: 'lessons' },
    { title: 'Ученики', dataIndex: 'students', key: 'students' },
    { title: 'Доход с группы', dataIndex: 'payment', key: 'payment' },
  ];

  const data = [
    {
      teachers: 'Садыков А.',
      lessons: '12',
      students: '30',
      payment: '85 000 сом',
    },
    {
      teachers: 'Алиева Д.',
      lessons: '8',
      students: '18',
      payment: '52 000 сом',
    },
    {
      teachers: 'Садыков А.',
      lessons: '12',
      students: '30',
      payment: '85 000 сом',
    },
    {
      teachers: 'Алиева Д.',
      lessons: '8',
      students: '18',
      payment: '52 000 сом',
    },
  ];
  return (
    <section className='loadTechers'>
      <h2 className='loadTechers_title'>Загрузка по преподавателям</h2>
      <div className='row'>
        <p className='loadTechers_text'>Нагрузка преподавателей</p>
        <div className='row periods'>
          <p
            className={active ? 'active' : ''}
            onClick={() => {
              setActive(true);
            }}
          >
            Неделя
          </p>
          <p
            className={!active ? 'not_active' : ''}
            onClick={() => {
              setActive(false);
            }}
          >
            Месяц
          </p>
        </div>
      </div>
      <UniversalTable columns={columns} data={data} />
    </section>
  );
};
