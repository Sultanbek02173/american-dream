import React, { useState } from 'react';
import { Column } from '@ant-design/plots';
export const ReportTableStatistic = () => {
  const dataMonth = [
    { type: 'Успеваемость', value: 58.45 },
    { type: 'Посещаемость', value: 39.05 },
  ];

  const dataOverall = [
    { type: 'Успеваемость', value: 6.04 },
    { type: 'Посещаемость', value: 3.12 },
  ];

  const getConfig = data => ({
    data,
    xField: 'type',
    yField: 'value',
    color: ({ type }) => (type === 'Успеваемость' ? '#32CD32' : '#7CFC00'),
    label: {
      position: 'middle',
      style: {
        fill: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
      },
      formatter: val => `${val.toFixed(2)}%`,
    },
    columnWidthRatio: 0.4,
    height: 300,
  });
  return (
    <div style={{ backgroundColor: '#2e2e2e', padding: 20, color: '#fff' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 30 }}>Статистика</h2>

      {/* Статистика за месяц */}
      <div style={{ marginBottom: 50 }}>
        <h3 style={{ marginBottom: 10 }}>За месяц</h3>
        <Column {...getConfig(dataMonth)} />
      </div>

      {/* Общая статистика */}
      <div style={{ marginBottom: 50 }}>
        <h3 style={{ marginBottom: 10 }}>Общая</h3>
        <Column {...getConfig(dataOverall)} />
      </div>

      {/* Легенда */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 30 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 20, height: 20, background: '#32CD32' }}></div>
          <span>Успеваемость</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 20, height: 20, background: '#7CFC00' }}></div>
          <span>Посещаемость</span>
        </div>
      </div>
    </div>
  );
};
