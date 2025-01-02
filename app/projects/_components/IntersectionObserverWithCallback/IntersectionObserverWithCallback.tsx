import { useEffect, useRef } from 'react';

interface Props {
  onIntersect: () => void;
}

const IntersectionObserverWithCallback = ({ onIntersect }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];

      if (entry.isIntersecting) {
        onIntersect();
      }
    });

    observer.observe(ref.current);

    return () => {
      observer?.disconnect();
    };
  }, [onIntersect]);

  return <div ref={ref} />;
};

export default IntersectionObserverWithCallback;
