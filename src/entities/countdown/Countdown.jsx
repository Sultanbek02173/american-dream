import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Countdown = ({ initialTime }) => {
  const parseTime = timeStr => {
    const [d, h, m, s] = timeStr.split(':').map(Number);
    return (d || 0) * 86400 + (h || 0) * 3600 + (m || 0) * 60 + (s || 0);
  };

  const getParts = seconds => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return {
      days: days.toString().padStart(2, '0'),
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: secs.toString().padStart(2, '0'),
    };
  };

  const [timeLeft, setTimeLeft] = useState(parseTime(initialTime));
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef(null);
  const [parts, setParts] = useState(getParts(timeLeft));

  useEffect(() => {
    setParts(getParts(timeLeft));
  }, [timeLeft]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const renderUnit = (value, showColon = true) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      <AnimatePresence mode='wait'>
        <motion.span
          key={value}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            display: 'block',
            fontSize: '2rem',
            minWidth: '40px',
            textAlign: 'right',
          }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
      {showColon && <span style={{ fontSize: '2rem'}}>:</span>}
    </div>
  );

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', gap: '0px', color: '#2DE920' }}>
        {renderUnit(parts.days)}
        {renderUnit(parts.hours)}
        {renderUnit(parts.minutes)}
        {renderUnit(parts.seconds, false)}
      </div>
    </div>
  );
};
