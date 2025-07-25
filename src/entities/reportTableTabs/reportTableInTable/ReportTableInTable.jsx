import React from 'react';
import { UniversalTable } from '../../universalTable/UniversalTable';

export const ReportTableInTable = () => {
  const columns = [
    {
      title: '№',
      dataIndex: 'id',
      key: 'id',
      className: 'universalTable__body-student',
    },
    {
      title: 'Cтудент',
      dataIndex: 'student',
      key: 'student',
      className: 'universalTable__body-student',
    },
    { title: 'урок №1', dataIndex: 'lesson1', key: 'lesson1' },
    { title: 'урок №2', dataIndex: 'lesson2', key: 'lesson2' },
    { title: 'урок №3', dataIndex: 'lesson3', key: 'lesson3' },
    { title: 'урок №4', dataIndex: 'lesson4', key: 'lesson4' },
    { title: 'урок №5', dataIndex: 'lesson5', key: 'lesson5' },
    { title: 'урок №6', dataIndex: 'lesson6', key: 'lesson6' },
    { title: 'урок №7', dataIndex: 'lesson7', key: 'lesson7' },
    { title: 'урок №8', dataIndex: 'lesson8', key: 'lesson8' },
    { title: 'урок №9', dataIndex: 'lesson9', key: 'lesson9' },
    { title: 'урок №10', dataIndex: 'lesson10', key: 'lesson10' },
  ];
  return (
    <div className='reportTableInTable'>
      <div className='reportTableInTable__first'>
        <table border='0' cellSpacing='0' className='universalTable'>
          <colgroup>
            <col style={{ width: '100px', position: 'sticky' }} />
            <col style={{ width: '250px', position: 'sticky' }} />
            <col style={{ width: '119px' }} />
            <col style={{ width: '119px' }} />
            <col style={{ width: '119px' }} />
            <col style={{ width: '119px' }} />
            <col style={{ width: '119px' }} />
            <col style={{ width: '119px' }} />
            <col style={{ width: '119px' }} />
            <col style={{ width: '119px' }} />
            <col style={{ width: '119px' }} />
            <col style={{ width: '119px' }} />
          </colgroup>
          <thead className='universalTable__head'>
            <tr>
              <th className='universalTable__body-student universalTable__body-head'>
                №
              </th>
              <th
                className='universalTable__body-student universalTable__body-head'
                style={{ left: '98px' }}
              >
                Студенты
              </th>
              <th>урок №1</th>
              <th>урок №2</th>
              <th>урок №3</th>
              <th>урок №4</th>
              <th>урок №5</th>
              <th>урок №6</th>
              <th>урок №7</th>
              <th>урок №8</th>
              <th>урок №9</th>
              <th>урок №10</th>
            </tr>
          </thead>
          <tbody className='universalTable__body'>
            <tr>
              <td
                className='universalTable__body-student'
                style={{ position: 'sticky' }}
              >
                1
              </td>
              <td
                style={{ width: '300px', position: 'sticky', left: '98px' }}
                className='universalTable__body-student'
              >
                Азамжанов Номанжон
              </td>
              <td className='universalTable__body-visiting'>
                <p>1</p>
              </td>
              <td className='universalTable__body-visiting'>
                <p>1</p>
              </td>
              <td className='universalTable__body-visiting'>
                <p>1</p>
              </td>
              <td className='universalTable__body-visiting'>
                <p>1</p>
              </td>
              <td className='universalTable__body-visiting'>
                <p>1</p>
              </td>
              <td className='universalTable__body-visiting'>
                <p>1</p>
              </td>
              <td className='universalTable__body-visiting'>
                <p>1</p>
              </td>
              <td className='universalTable__body-visiting'>
                <p>1</p>
              </td>
              <td className='universalTable__body-visiting'>
                <p>1</p>
              </td>
              <td className='universalTable__body-visiting'>
                <p>1</p>
              </td>
            </tr>
            <tr>
              <td
                className='universalTable__body-student'
                style={{ position: 'sticky' }}
              >
                1
              </td>
              <td
                style={{ width: '300px', position: 'sticky', left: '98px' }}
                className='universalTable__body-student'
              >
                Азамжанов Номанжон
              </td>
              <td className='universalTable__body-visiting'>
                <p>1</p>
              </td>
              <td className='universalTable__body-visiting'>
                <p>1</p>
              </td>
              <td className='universalTable__body-visiting'>
                <p>1</p>
              </td>
              <td className='universalTable__body-visiting'>
                <p>1</p>
              </td>
              <td className='universalTable__body-visiting'>
                <p>1</p>
              </td>
              <td className='universalTable__body-visiting'>
                <p>1</p>
              </td>
              <td className='universalTable__body-visiting'>
                <p>1</p>
              </td>
              <td className='universalTable__body-visiting'>
                <p>1</p>
              </td>
              <td className='universalTable__body-visiting'>
                <p>1</p>
              </td>
              <td className='universalTable__body-visiting'>
                <p>1</p>
              </td>
            </tr>
            <tr>
              <td
                className='universalTable__body-student'
                style={{ position: 'sticky' }}
              >
                1
              </td>
              <td
                style={{ width: '300px', position: 'sticky', left: '98px' }}
                className='universalTable__body-student'
              >
                Азамжанов Номанжон
              </td>
              <td className='universalTable__body-visiting'>
                <p>1</p>
              </td>
              <td className='universalTable__body-visiting'>
                <p>1</p>
              </td>
              <td className='universalTable__body-visiting'>
                <p>1</p>
              </td>
              <td className='universalTable__body-visiting'>
                <p>1</p>
              </td>
              <td className='universalTable__body-visiting'>
                <p>1</p>
              </td>
              <td className='universalTable__body-visiting'>
                <p>1</p>
              </td>
              <td className='universalTable__body-visiting'>
                <p>1</p>
              </td>
              <td className='universalTable__body-visiting'>
                <p>1</p>
              </td>
              <td className='universalTable__body-visiting'>
                <p>1</p>
              </td>
              <td className='universalTable__body-visiting'>
                <p>1</p>
              </td>
            </tr>
            <tr>
              <td
                className='universalTable__body-student'
                style={{ position: 'sticky' }}
              >
                1
              </td>
              <td
                style={{ width: '300px', position: 'sticky', left: '98px' }}
                className='universalTable__body-student'
              >
                Азамжанов Номанжон
              </td>
              <td className='universalTable__body-visiting'>
                <p>1</p>
              </td>
              <td className='universalTable__body-visiting'>
                <p>1</p>
              </td>
              <td className='universalTable__body-visiting'>
                <p>1</p>
              </td>
              <td className='universalTable__body-visiting'>
                <p>1</p>
              </td>
              <td className='universalTable__body-visiting'>
                <p>1</p>
              </td>
              <td className='universalTable__body-visiting'>
                <p>1</p>
              </td>
              <td className='universalTable__body-visiting'>
                <p>1</p>
              </td>
              <td className='universalTable__body-visiting'>
                <p>1</p>
              </td>
              <td className='universalTable__body-visiting'>
                <p>1</p>
              </td>
              <td className='universalTable__body-visiting'>
                <p>1</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='reportTableInTable__second'>
        <UniversalTable
          columns={columns}
          data={[
            {
              id: 1,
              student: 'Группа (A3)',
              lesson1: '10',
              lesson2: '0',
              lesson3: '10',
              lesson4: '10',
              lesson5: '10',
              lesson6: '10',
              lesson7: '0',
              lesson8: '10',
              lesson9: '10',
              lesson10: '-',
            },
          ]}
          // onRowClick={item => navigate(`/report-table/${item.id}`)}
        />
      </div>
    </div>
  );
};
