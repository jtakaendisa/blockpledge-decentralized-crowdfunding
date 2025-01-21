import { useCallback } from 'react';

export const usePlaiceholder = () => {
  const getBlurDataUrls = useCallback(async (imageUrls: string[]) => {
    let blurDataUrls: string[] = [];

    try {
      const response = await fetch('/api/plaiceholder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(imageUrls),
      });

      const data = await response.json();

      blurDataUrls = data.blurDataUrls;
    } catch (error) {
      console.error('Error fetching blurDataURL:', error);
    }

    return { blurDataUrls };
  }, []);

  return {
    getBlurDataUrls,
  };
};
