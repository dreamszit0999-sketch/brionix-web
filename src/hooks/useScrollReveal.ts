import { useEffect, useRef } from 'react';
import { useAnimation, useInView } from 'framer-motion';

/**
 * Hook to trigger animations on scroll
 */
export const useScrollReveal = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return { ref, controls };
};
