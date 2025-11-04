import React, { useEffect, useState } from 'react';
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
  const [dimensions, setDimensions] = useState({
    width: '56px',
    height: '395px',
  });

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      if (width <= 576) {
        setDimensions({ width: '40px', height: '250px' });
      } else if (width <= 768) {
        setDimensions({ width: '48px', height: '320px' });
      } else if (width <= 992) {
        setDimensions({ width: '52px', height: '350px' });
      } else {
        setDimensions({ width: '56px', height: '395px' });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

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
              width={dimensions.width}
              height={dimensions.height}
              border='0px'
              color='#32CD32'
            />
            <VerticalProgress
              progress={monthAttend}
              text={formatPct(monthAttend)}
              width={dimensions.width}
              height={dimensions.height}
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
              width={dimensions.width}
              height={dimensions.height}
              border='0px'
              color='#32CD32'
            />
            <VerticalProgress
              progress={allAttend}
              text={formatPct(allAttend)}
              width={dimensions.width}
              height={dimensions.height}
              border='0px'
              color='#7CFC00'
            />
          </div>
        </div>
      </div>

      <div className='reportTable__legend'>
        <div className='reportTable__legend-item'>
          <div
            className='reportTable__legend-item-color'
            style={{ background: '#32CD32' }}
          />
          <span>Успеваемость</span>
        </div>
        <div className='reportTable__legend-item'>
          <div
            className='reportTable__legend-item-color'
            style={{ background: '#7CFC00' }}
          />
          <span>Посещаемость</span>
        </div>
      </div>
    </div>
  );
};
