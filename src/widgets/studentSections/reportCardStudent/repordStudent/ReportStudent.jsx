import { UniversalTable } from '../../../../entities';
import './reportStudent.scss';

export const ReportStudent = () => {
  const columns = [
    { title: '', dataIndex: 'course', key: 'course' },
    { title: 'Урок №1', dataIndex: 'lesson1', key: 'lesson1' },
    { title: 'Урок №2', dataIndex: 'lesson2', key: 'lesson2' },
    { title: 'Урок №3', dataIndex: 'lesson3', key: 'lesson3' },
    { title: 'Урок №4', dataIndex: 'lesson4', key: 'lesson4' },
    { title: 'Урок №5', dataIndex: 'lesson5', key: 'lesson5' },
    { title: 'Урок №6', dataIndex: 'lesson6', key: 'lesson6' },
    { title: 'Урок №7', dataIndex: 'lesson7', key: 'lesson7' },
    { title: 'Урок №8', dataIndex: 'lesson8', key: 'lesson8' },
    { title: 'Урок №9', dataIndex: 'lesson9', key: 'lesson9' },
    { title: 'Урок №10', dataIndex: 'lesson10', key: 'lesson10' },
    { title: 'Урок №11', dataIndex: 'lesson11', key: 'lesson11' },
    { title: 'Урок №12', dataIndex: 'lesson12', key: 'lesson12' },
    { title: '=', dataIndex: 'result', key: 'result' },
  ];

  const data = [
    {
      course: 'Курс 1',
      lesson1: '1',
      lesson2: '1',
      lesson3: '1',
      lesson4: '0',
      lesson5: '1',
      lesson6: '2',
      lesson7: '2',
      lesson8: '0',
      lesson9: '1',
      lesson10: '0',
      lesson11: '1',
      lesson12: '0',
      result: '10',
    },
    {
      course: 'Курс 2',
      lesson1: '1',
      lesson2: '1',
      lesson3: '1',
      lesson4: '0',
      lesson5: '1',
      lesson6: '2',
      lesson7: '2',
      lesson8: '0',
      lesson9: '1',
      lesson10: '0',
      lesson11: '1',
      lesson12: '0',
      result: '8',
    },
    {
      course: 'Курс 3',
      lesson1: '-',
      lesson2: '-',
      lesson3: '-',
      lesson4: '-',
      lesson5: '-',
      lesson6: '-',
      lesson7: '-',
      lesson8: '-',
      lesson9: '-',
      lesson10: '-',
      lesson11: '-',
      lesson12: '-',
      result: '-',
    },
    {
      course: 'Курс 4',
      lesson1: '-',
      lesson2: '-',
      lesson3: '-',
      lesson4: '-',
      lesson5: '-',
      lesson6: '-',
      lesson7: '-',
      lesson8: '-',
      lesson9: '-',
      lesson10: '-',
      lesson11: '-',
      lesson12: '-',
      result: '-',
    },
  ];

  const score = [
    {
      course: 'Курс 1',
      lesson1: '10',
      lesson2: '10',
      lesson3: '10',
      lesson4: '0',
      lesson5: '10',
      lesson6: '0',
      lesson7: '10',
      lesson8: '0',
      lesson9: '10',
      lesson10: '0',
      lesson11: '10',
      lesson12: '0',
      result: '10',
    },
    {
      course: 'Курс 2',
      lesson1: '10',
      lesson2: '10',
      lesson3: '10',
      lesson4: '0',
      lesson5: '10',
      lesson6: '20',
      lesson7: '20',
      lesson8: '0',
      lesson9: '10',
      lesson10: '0',
      lesson11: '10',
      lesson12: '0',
      result: '80',
    },
    {
      course: 'Курс 3',
      lesson1: '-',
      lesson2: '-',
      lesson3: '-',
      lesson4: '-',
      lesson5: '-',
      lesson6: '-',
      lesson7: '-',
      lesson8: '-',
      lesson9: '-',
      lesson10: '-',
      lesson11: '-',
      lesson12: '-',
      result: '-',
    },
    {
      course: 'Курс 4',
      lesson1: '-',
      lesson2: '-',
      lesson3: '-',
      lesson4: '-',
      lesson5: '-',
      lesson6: '-',
      lesson7: '-',
      lesson8: '-',
      lesson9: '-',
      lesson10: '-',
      lesson11: '-',
      lesson12: '-',
      result: '-',
    },
  ];

  const columnsDiscount = [
    { title: 'Сумма скидки(сом)', dataIndex: 'discount', key: 'discount' },
    { title: 'Баллы за ДЗ', dataIndex: 'score', key: 'score' },
    { title: 'Минимальное кол-во посещений', dataIndex: 'visit', key: 'visit' },
  ];

  const dataDiscount = [
    {
      discount: '2000',
      score: '70-80',
      visit: '8',
    },
  ];
  return (
    <section className='report_student'>
      <h2 className='report_student_title'>Посещение</h2>

      <div className='report_student_table'>
        <UniversalTable columns={columns} data={data} />
      </div>

      <h2 className='report_student_title'>Баллы за домашние задания</h2>
      <div className='report_student_table'>
        <UniversalTable columns={columns} data={score} />
      </div>

      <h2 className='report_student_title'>Регламент скидок</h2>
      <div className='report_student_discount_table'>
        <UniversalTable columns={columnsDiscount} data={dataDiscount} />
      </div>
    </section>
  );
};
