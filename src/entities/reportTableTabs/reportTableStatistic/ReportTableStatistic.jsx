import React from 'react';
import './reportTableStatistic.scss';
import { VerticalProgress } from '../../../featurs';

const formatPct = (v, digits = 2) =>
  `${(Math.round(v * 10 ** digits) / 10 ** digits).toFixed(digits)}%`;

export const ReportTableStatistic = ({
  monthPerf = 0,
  monthAttend = 0,
  monthCount = 0,
  allPerf = 0,
  allAttend = 0,
  allCount = 0,
}) => {
  const ticks = ['100', '80', '60', '40', '20', '0'];

  return (
    <div className='reportTable'>
      <div className='row reportTable_header'>
        <p>За месяц {monthCount ? `(${monthCount})` : ''}</p>
        <p>Общая {allCount ? `(${allCount})` : ''}</p>
      </div>

      <div className='row table_static'>
        <div className='row month'>
          <div className='list'>
            {ticks.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
          </div>
          <div className='row month_indicator'>
            <VerticalProgress
              progress={monthPerf}
              text={formatPct(monthPerf)}
              width='56px'
              height='395px'
              border='0px'
              color='#32CD32'
            />
            <VerticalProgress
              progress={monthAttend}
              text={formatPct(monthAttend)}
              width='56px'
              height='395px'
              border='0px'
              color='#7CFC00'
            />
          </div>
        </div>

        <div className='row all'>
          <div className='list'>
            {ticks.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
          </div>
          <div className='row all_indicator'>
            <VerticalProgress
              progress={allPerf}
              text={formatPct(allPerf)}
              width='56px'
              height='395px'
              border='0px'
              color='#32CD32'
            />
            <VerticalProgress
              progress={allAttend}
              text={formatPct(allAttend)}
              width='56px'
              height='395px'
              border='0px'
              color='#7CFC00'
            />
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 30,
          color: '#FFFFFF',
          marginBottom: 50,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 20, height: 20, background: '#32CD32' }} />
          <span>Успеваемость</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 20, height: 20, background: '#7CFC00' }} />
          <span>Посещаемость</span>
        </div>
      </div>
    </div>
  );
};
