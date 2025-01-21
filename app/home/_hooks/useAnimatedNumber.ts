'use client';

import { useEffect } from 'react';
import { MotionValue } from 'framer-motion';

export const useAnimatedNumber = (
  value: number,
  index: number,
  delay: number,
  displayValue: MotionValue<number>
) => {
  useEffect(() => {
    const controls = {
      start: 0,
      end: value,
      duration: 2,
      delay: delay + index * 0.2,
    };

    let startTime: number;

    const animateValue = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = (currentTime - startTime) / 1000 - controls.delay;
      if (elapsed < 0) {
        requestAnimationFrame(animateValue);
        return;
      }

      const progress = Math.min(elapsed / controls.duration, 1);
      const animatedValue = Math.floor(
        progress * (controls.end - controls.start) + controls.start
      );

      displayValue.set(animatedValue);

      if (progress < 1) {
        requestAnimationFrame(animateValue);
      }
    };

    requestAnimationFrame(animateValue);
  }, [value, index, delay, displayValue]);
};
