import { UniversalTable } from '../../../entities';
import './popularityCourses.scss';

export const PopularityCourses = () => {
  const columns = [
    { title: '№', dataIndex: 'id', key: 'id' },
    { title: 'Курс', dataIndex: 'course', key: 'course' },
    { title: 'Ученики', dataIndex: 'students', key: 'students' },
    { title: 'Групп', dataIndex: 'group', key: 'group' },
    { title: 'Доход', dataIndex: 'income', key: 'income' },
  ];

  const data = [
    {
      id: '1',
      course: 'Английский A2',
      students: '45',
      group: '4',
      income: '125 000 с',
    },
    {
      id: '2',
      course: 'Ментальная арифметика',
      students: '30',
      group: '3',
      income: '86 000 с',
    },
    {
      id: '3',
      course: 'Подготовка к ОРТ',
      students: '20',
      group: '2',
      income: '74 000 с',
    },
  ];
  return (
    <section className='popularityCourses'>
      <h2 className='popularityCourses_title'>Популярность курсов</h2>

      <UniversalTable columns={columns} data={data} />

      <div className='popularityCourses_reload'>
        <p>
          Все показатели обновляются автоматически раз в 24 часа. Статистика по
          преподавателям и курсам формируется из данных посещаемости,
          успеваемости и платежей.
        </p>

        <div className='row popularityCourses_reload_btns'>
          <button>Обновить данные</button>
          <button>Скачать отчёт PDF</button>
        </div>
      </div>
    </section>
  );
};
