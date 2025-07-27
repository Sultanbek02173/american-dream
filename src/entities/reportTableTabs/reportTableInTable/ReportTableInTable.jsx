import React, { useState } from 'react';
// import './ReportTableInTable.scss'; // Подключи стили, если они есть

export const ReportTableInTable = () => {
  const [students] = useState([
    {
      id: 1,
      student: 'Азамжанов Номанжон',
      lesson1: 1,
      lesson2: 1,
      lesson3: 1,
      lesson4: 1,
      lesson5: 1,
      lesson6: 1,
      lesson7: 1,
      lesson8: 1,
      lesson9: 1,
      lesson10: 1,
    },
    {
      id: 2,
      student: 'Султанова Айгуль',
      lesson1: 1,
      lesson2: 1,
      lesson3: 0,
      lesson4: 1,
      lesson5: 1,
      lesson6: 0,
      lesson7: 1,
      lesson8: 1,
      lesson9: 1,
      lesson10: 1,
    },
    {
      id: 3,
      student: 'Токтосунов Азамат',
      lesson1: 0,
      lesson2: 1,
      lesson3: 1,
      lesson4: 1,
      lesson5: 1,
      lesson6: 1,
      lesson7: 1,
      lesson8: 1,
      lesson9: 0,
      lesson10: 1,
    },
  ]);

  const renderRow = (studentData, index) => (
    <tr key={index}>
      <td
        className='universalTable__body-student'
        style={{ position: 'sticky' }}
      >
        {studentData.id}
      </td>
      <td
        style={{ width: '300px', position: 'sticky', left: '98px' }}
        className='universalTable__body-student'
      >
        {studentData.student}
      </td>
      {[...Array(10)].map((_, i) => (
        <td key={i} className='universalTable__body-visiting'>
          <p>{studentData[`lesson${i + 1}`]}</p>
        </td>
      ))}
    </tr>
  );

  const renderTable = () => (
    <table border='0' cellSpacing='0' className='universalTable'>
      <colgroup>
        <col style={{ width: '100px', position: 'sticky' }} />
        <col style={{ width: '250px', position: 'sticky' }} />
        {[...Array(10)].map((_, i) => (
          <col key={i} style={{ width: '119px' }} />
        ))}
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
          {[...Array(10)].map((_, i) => (
            <th key={i}>урок №{i + 1}</th>
          ))}
        </tr>
      </thead>
      <tbody className='universalTable__body'>{students.map(renderRow)}</tbody>
    </table>
  );

  return (
    <div className='reportTableInTable'>
      <div className='reportTableInTable__first'>{renderTable()}</div>
      <div className='reportTableInTable__second'>{renderTable()}</div>
    </div>
  );
};
