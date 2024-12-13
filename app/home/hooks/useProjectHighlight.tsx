import { MutableRefObject, useLayoutEffect, useState } from 'react';

const useProjectHighlight = (cardRef: MutableRefObject<HTMLDivElement | null>) => {
  const [projectImageHeight, setProjectImageHeight] = useState(0);

  useLayoutEffect(() => {
    const card = cardRef.current;

    if (!card) return;

    const bounds = card.getBoundingClientRect();
    setProjectImageHeight(bounds.height / 2);
  }, [cardRef]);

  return { projectImageHeight };
};

export default useProjectHighlight;
