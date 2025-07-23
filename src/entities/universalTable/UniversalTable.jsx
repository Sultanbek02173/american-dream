import React from 'react';
import './UniversalTable.scss'; // если есть стили

export const UniversalTable = ({ columns, data, onRowClick }) => {
  return (
    <table border='0' cellSpacing='0' className='universalTable'>
      <thead className='universalTable__head'>
        <tr>
          {columns?.map(col => (
            <th key={col.key}>{col.title}</th>
          ))}
        </tr>
      </thead>
      <tbody className='universalTable__body'>
        {data?.map((item, rowIndex) => (
          <tr key={item.id || rowIndex} onClick={() => onRowClick?.(item)}>
            {columns?.map(col => (
              <td key={col.key}>{item[col.dataIndex]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
