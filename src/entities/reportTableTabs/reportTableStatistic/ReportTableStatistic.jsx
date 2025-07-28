import React, { useState } from 'react';
import { Column } from '@ant-design/plots';
import './reportTableStatistic.scss';
import { VerticalProgress } from '../../../featurs';

export const ReportTableStatistic = () => {
  const statices = ['100', '80', '60', '40', '20', '0'];
  return (
    <div className='reportTable'>
      <div className='row reportTable_header'>
        <p>За месяц</p>
        <p>Общая</p>
      </div>

      <div className='row table_static'>
        <div className='row month'>
          <div className='list'>
            {statices && statices.map((stat, indx) => <p key={indx}>{stat}</p>)}
          </div>
          <div className='row month_indicator'>
            <VerticalProgress
              progress={60}
              text={'58.45%'}
              width={'56px'}
              height={'395px'}
              border={'0px'}
              color={'#32CD32'}
            />
            <VerticalProgress
              progress={40}
              text={'39.05%'}
              width={'56px'}
              height={'395px'}
              border={'0px'}
              color={'#2DE920'}
            />
          </div>
        </div>
        <div className='row all'>
          <div className='list'>
            {statices && statices.map((stat, indx) => <p key={indx}>{stat}</p>)}
          </div>
          <div className='row all_indicator'>
            <VerticalProgress
              progress={6}
              text={'6.04%'}
              width={'56px'}
              height={'395px'}
              border={'0px'}
              color={'#32CD32'}
            />
            <VerticalProgress
              progress={4}
              text={'3.12%'}
              width={'56px'}
              height={'395px'}
              border={'0px'}
              color={'#2DE920'}
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
          marginBottom: '50px'
        }}
      >
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
