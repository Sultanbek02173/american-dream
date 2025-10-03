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

  const initialSeconds = parseTime(initialTime);
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef(null);

  const parts = getParts(timeLeft);
  // Предыдущее состояние для сравнения цифр: берём значения на секунду раньше
  const prevParts = getParts(Math.min(timeLeft + 1, initialSeconds));

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      // чистим на всякий случай
      clearInterval(intervalRef.current);
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
  }, [isRunning, timeLeft]);

  const Digit = ({ curr, prev }) => {
    const changed = curr !== prev;
    if (!changed) {
      return (
        <span
          style={{
            display: 'block',
            fontSize: '2rem',
            minWidth: '20px',
            textAlign: 'right',
            lineHeight: 1.1,
          }}
        >
          {curr}
        </span>
      );
    }
    // Анимируем только если цифра реально изменилась
    return (
      <AnimatePresence mode='wait' initial={false}>
        <motion.span
          key={curr} // ключ по конкретной цифре
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            display: 'block',
            fontSize: '2rem',
            minWidth: '20px',
            textAlign: 'right',
            lineHeight: 1.1,
          }}
        >
          {curr}
        </motion.span>
      </AnimatePresence>
    );
  };

  const renderUnit = (valueStr, prevStr, showColon = true) => {
    // valueStr и prevStr — строки из 2 символов, напр. "09"
    const [c0, c1] = valueStr.split('');
    const [p0, p1] = prevStr.split('');
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <div
          style={{
            display: 'flex',
            gap: '0px',
            minWidth: 40,
            justifyContent: 'flex-end',
          }}
        >
          <Digit curr={c0} prev={p0} />
          <Digit curr={c1} prev={p1} />
        </div>
        {showColon && <span style={{ fontSize: '2rem' }}>:</span>}
      </div>
    );
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', gap: '0px', color: '#2DE920' }}>
        {renderUnit(parts.days, prevParts.days)}
        {renderUnit(parts.hours, prevParts.hours)}
        {renderUnit(parts.minutes, prevParts.minutes)}
        {renderUnit(parts.seconds, prevParts.seconds, false)}
      </div>
    </div>
  );
};
