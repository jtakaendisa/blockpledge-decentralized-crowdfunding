'use client';

import { useState } from 'react';

export const useHeadingReveal = () => {
  const [hasEntered, setHasEntered] = useState(false);
  const [playAnimation, setPlayAnimation] = useState(false);

  const handleViewportEnter = () => {
    if (hasEntered) return;

    setPlayAnimation(true);
    setHasEntered(true);
  };

  return { playAnimation, handleViewportEnter };
};
