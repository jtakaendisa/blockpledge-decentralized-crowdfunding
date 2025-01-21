'use client';

import { createContext, PropsWithChildren, useCallback, useState } from 'react';

interface FeaturedProjectsContextType {
  blurDataUrls: string[];
  updateBlurDataUrls: (blurDataUrls: string[]) => void;
}

export const FeaturedProjectsContext = createContext<FeaturedProjectsContextType>({
  blurDataUrls: [],
  updateBlurDataUrls: () => {},
});

export const FeaturedProjectsProvider = ({ children }: PropsWithChildren) => {
  const [blurDataUrls, setBlurDataUrls] = useState<string[]>([]);

  const updateBlurDataUrls = useCallback((blurDataUrls: string[]) => {
    setBlurDataUrls(blurDataUrls);
  }, []);

  return (
    <FeaturedProjectsContext.Provider value={{ blurDataUrls, updateBlurDataUrls }}>
      {children}
    </FeaturedProjectsContext.Provider>
  );
};
