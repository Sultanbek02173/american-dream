import { Radio } from '@mui/material';
import React, { useState } from 'react';
import { FixedRate } from './TeacherPaymentTabs/FixedRate';
import { HourlyRate } from './TeacherPaymentTabs/HourlyRate';

export const TeacherPaymentType = ({ formData, setFormData }) => {
  const handleChangeType = event => {
    const type = event.target.value;
    setFormData(prev => ({
      ...prev,
      payment_type: type,
      payment_period: type === 'fixed' ? 'month' : 'per_lesson',
      payment_amount: '',
    }));
  };

  const tabs = {
    fixed: (
      <FixedRate
        amount={formData.payment_amount}
        onChange={val =>
          setFormData(prev => ({ ...prev, payment_amount: val }))
        }
      />
    ),
    hourly: (
      <HourlyRate
        amount={formData.payment_amount}
        onChange={val =>
          setFormData(prev => ({ ...prev, payment_amount: val }))
        }
      />
    ),
  };

  return (
    <div className='paymentType'>
      <div className='paymentType__tabs'>
        <div className='paymentType__tabs-item'>
          <Radio
            checked={formData.payment_type === 'fixed'}
            onChange={handleChangeType}
            value='fixed'
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
            checked={formData.payment_type === 'hourly'}
            onChange={handleChangeType}
            value='hourly'
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
      <div>{tabs[formData.payment_type]}</div>
    </div>
  );
};
