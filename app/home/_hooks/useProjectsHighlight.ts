import { MutableRefObject, useLayoutEffect, useState } from 'react';

export const useProjectsHighlight = (
  cardRef: MutableRefObject<HTMLDivElement | null>
) => {
  const [projectImageHeight, setProjectImageHeight] = useState(0);

  useLayoutEffect(() => {
    const card = cardRef.current;

    if (!card) return;

    const bounds = card.getBoundingClientRect();
    setProjectImageHeight(bounds.height / 2.25);
  }, [cardRef]);

  return { projectImageHeight };
};
