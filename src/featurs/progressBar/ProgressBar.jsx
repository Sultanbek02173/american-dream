import { Box } from '@mui/material';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

export const ProgressBar = ({ progress }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({ width: `${progress}%` });
    }
  }, [isInView, progress, controls]);
  return (
    <Box
      ref={ref}
      sx={{
        width: "100%",
        height: 60,
        backgroundColor: '#2c2c2c',
        borderRadius: '100px',
        overflow: 'hidden',
        padding: '2px',
      }}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={controls}
        transition={{ duration: 0.6 }}
        style={{
          height: '100%',
          borderRadius: '100px',
          background: 'linear-gradient(to right, white, limegreen)',
        }}
      />
    </Box>
  );
};
