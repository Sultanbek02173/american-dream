import { Box } from '@mui/material';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

export const VerticalProgress = ({ progress, text, height, width, border, color }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-300px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({
        height: `${progress}%`,
        transition: {
          duration: 0.6,
          onUpdate: latest => {},
        },
      });
    }
  }, [isInView, progress, controls]);

  return (
    <Box
      ref={ref}
      sx={{
        width: width,
        height: height,
        backgroundColor: 'none',
        borderRadius: border,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <motion.div
        initial={{ height: 0 }}
        animate={controls}
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          background: color,
          borderRadius: border,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translate(-50%, -100%)',
            fontSize: '16px',
            fontWeight: '400',
            paddingBottom: '18px',
            whiteSpace: 'nowrap',
            color: '#FFFFFF99',
          }}
        >
          {text}
        </Box>
      </motion.div>
    </Box>
  );
};
