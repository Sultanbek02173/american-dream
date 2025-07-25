import { useAnimation, motion, useInView } from 'framer-motion';
import React, { useEffect, useRef } from 'react';

export const CircleProgress = ({ percentage, radius, stroke, color }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '100px' });

  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;

  useEffect(() => {
    if (isInView) {
      const offset = circumference - (percentage / 100) * circumference;
      controls.start({
        strokeDashoffset: offset,
        transition: { duration: 0.8 },
      });
    }
  }, [percentage, circumference, controls, isInView]);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <svg width={radius * 2} height={radius * 2}>
        <circle
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          stroke='#444'
          strokeWidth={stroke}
          fill='transparent'
        />
        <motion.circle
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          stroke={color}
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
    </div>
  );
};
