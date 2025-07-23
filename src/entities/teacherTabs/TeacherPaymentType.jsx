import { Radio } from '@mui/material';
import React, { useState } from 'react';
import { FixedRate } from './TeacherPaymentTabs/FixedRate';
import { HourlyRate } from './TeacherPaymentTabs/HourlyRate';

export const TeacherPaymentType = () => {
  const [selectedValue, setSelectedValue] = useState(1);

  const handleChange = event => {
    setSelectedValue(Number(event.target.value));
  };

  const tabs = [
    { id: 1, label: 'Фиксированная ставка', content: <FixedRate /> },
    { id: 2, label: 'Почасовая ставка', content: <HourlyRate /> },
  ];

  const controlProps = item => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  const currentTab = tabs.find(tab => tab.id === selectedValue);

  return (
    <div className='paymentType'>
      <div className='paymentType__tabs'>
        <div className='paymentType__tabs-item'>
          <Radio
            {...controlProps(1)}
            sx={{
              color: '#fff',
              '&.Mui-checked': {
                color: '#2DE920',
              },
            }}
          />
          <p>Фиксированная ставка</p>
        </div>
        <div className='paymentType__tabs-item'>
          <Radio
            {...controlProps(2)}
            sx={{
              color: '#fff',
              '&.Mui-checked': {
                color: '#2DE920',
              },
            }}
          />
          <p>Почасовая ставка</p>
        </div>
      </div>
      <div>{currentTab?.content}</div>
    </div>
  );
};
