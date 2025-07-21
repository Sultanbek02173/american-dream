import message from '../../../shared/imgs/sidebar/message.svg';
import shedule from '../../../shared/imgs/sidebar/curces.svg';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

export const StaticsNow = () => {
  const percentage = 75;
  const radius = 50;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;

  const controls = useAnimation();

  useEffect(() => {
    const offset = circumference - (percentage / 100) * circumference;
    controls.start({ strokeDashoffset: offset });
  }, [percentage, circumference, controls]);
  return (
    <section>
      <p>Hi, Админ!</p>
      <div>
        <h2>Ключевые показатели за сегодня</h2>
        <div>
          <button>
            <img src={message} alt='' /> Заявки
          </button>
          <button>
            <img src={shedule} alt='' />
            Расписание
          </button>
        </div>
      </div>

      <div>
        <div>
          <p>Новые ученики</p>
        </div>
        <div>
          <div>
            <p>24 часа</p>
            <p>Неделя</p>
            <p>Месяц</p>
            <p>Год</p>
          </div>
          <div>
            <IoIosArrowForward />
            <p>24 часа</p>
          </div>
          <div>
            <IoIosArrowBack />
            <p>24 часа</p>
          </div>
        </div>
      </div>

      <div style={{ position: 'relative' }}>
        <svg width={120} height={120}>
          <circle
            r={normalizedRadius}
            cx={60}
            cy={60}
            stroke='#444'
            strokeWidth={stroke}
            fill='transparent'
          />
          <motion.circle
            r={normalizedRadius}
            cx={60}
            cy={60}
            stroke='lime'
            strokeWidth={stroke}
            fill='transparent'
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            strokeLinecap='butt'
            animate={controls}
            initial={false}
            style={{ rotate: '-90deg', transformOrigin: '50% 50%' }}
          />
          <text
            x='50%'
            y='50%'
            dominantBaseline='middle'
            textAnchor='middle'
            fontSize='20'
            fill='white'
          >
            {percentage}%
          </text>
        </svg>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          {percentage}%
        </div>
      </div>
    </section>
  );
};
