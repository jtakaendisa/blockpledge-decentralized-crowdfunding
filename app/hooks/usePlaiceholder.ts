import { useCallback } from 'react';

export const usePlaiceholder = () => {
  const getBlurDataURLs = useCallback(async (imageUrls: string[]) => {
    let blurDataURLs: string[] = [];

    try {
      const response = await fetch('/api/plaiceholder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(imageUrls),
      });

      const data = await response.json();

      blurDataURLs = data.blurDataURLs;
    } catch (error) {
      console.error('Error fetching blurDataURL:', error);
    }

    return { blurDataURLs };
  }, []);

  return {
    getBlurDataURLs,
  };
};
