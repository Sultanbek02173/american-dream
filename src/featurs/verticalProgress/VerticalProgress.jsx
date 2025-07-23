import { Box } from '@mui/material';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export const VerticalProgress = ({ progress, text }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-300px' });
  const controls = useAnimation();
  const [currentHeight, setCurrentHeight] = useState(0);

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
        width: '100px',
        height: '400px',
        backgroundColor: 'none',
        borderRadius: '100px',
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
          background: '#2DE920',
          borderRadius: '100px',
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
