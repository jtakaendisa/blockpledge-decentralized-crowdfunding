import { MutableRefObject, MouseEvent, useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';

const ROTATION_INTENSITY = 8;

export const useImageCollage = (
  cardElementsRef: MutableRefObject<Set<HTMLDivElement>>,
  containerRef: MutableRefObject<HTMLDivElement | null>,
  isIntroCompleteRef: MutableRefObject<boolean>,
  delay: number
) => {
  // Function to update the cardElements array when a card is mounted to the DOM
  const handleCardMount = (element: HTMLDivElement) => {
    cardElementsRef.current.add(element);
  };

  // Function to handle hover interaction on individual cards
  const handleHover = (event: MouseEvent<HTMLDivElement>) => {
    gsap.to(event.currentTarget, {
      duration: 1.2,
      z: event.type === 'mouseenter' ? 30 : 0,
      ease: 'expo.out',
    });
  };

  useLayoutEffect(() => {
    const container = containerRef.current;
    const cards = Array.from(cardElementsRef.current);

    const setCSSProperties = () => {
      if (!container) return;

      const { width, height } = container.getBoundingClientRect();

      container.style.setProperty('--container-width', `${width}px`);
      container.style.setProperty('--container-height', `${height}px`);
    };

    const init = () => {
      // Iterate over each card to set initial styles.
      cards.forEach((card, index) => {
        gsap.set(card, {
          zIndex: -index,
          clipPath: 'inset(100%)',
        });
      });

      // Apply specific depth and stacking order to certain cards.
      gsap.set([cards[3], cards[4]], { z: -2, zIndex: -15 });
      gsap.set([cards[5], cards[7], cards[8], cards[10]], {
        z: -10,
        zIndex: -10,
      });
      gsap.set([cards[6], cards[9]], { z: -10, zIndex: -5 });
    };

    // Main animation sequence for revealing cards on page load
    const introAnimation = () => {
      const tl = gsap.timeline({
        defaults: { duration: 2.4, ease: 'power4.inOut' },
        onComplete: () => {
          isIntroCompleteRef.current = true;
        },
      });

      tl.to(cards, {
        z: 0,
        clipPath: 'inset(10% round 8px)',
        stagger: {
          each: 0.08,
          grid: 'auto',
          from: 'center',
        },
      });
    };

    setCSSProperties();
    init();

    setTimeout(() => {
      introAnimation();
    }, delay * 1000); // Converting delay to milliseconds
  }, [delay, cardElementsRef, containerRef, isIntroCompleteRef]);

  useEffect(() => {
    const container = containerRef.current;

    const handleResize = () => {
      if (!container) return;

      const scaleFactor = (window.innerWidth / 1920) * 1.2;
      const { width, height } = container.getBoundingClientRect();

      container.style.setProperty('--scale-factor', scaleFactor.toString());
      container.style.setProperty('--container-width', `${width}px`);
      container.style.setProperty('--container-height', `${height}px`);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [containerRef]);

  useEffect(() => {
    // Function to handle card movement based on mouse or touch input
    const handleMouseMove = (event: globalThis.MouseEvent) => {
      if (cardElementsRef.current.size !== 11 || !isIntroCompleteRef.current) return;

      // Calculate normalized X and Y positions relative to the viewport.
      const xPos = (event.clientX / window.innerWidth - 0.5) * 2;
      const yPos = (event.clientY / window.innerHeight - 0.5) * 2;

      gsap.to(Array.from(cardElementsRef.current), {
        duration: 0.64,
        rotationY: xPos * ROTATION_INTENSITY,
        rotationX: -yPos * ROTATION_INTENSITY,
        stagger: 0.08,
      });
    };

    const heroSection = document.getElementById('hero');

    heroSection?.addEventListener('mousemove', handleMouseMove);

    return () => {
      heroSection?.removeEventListener('mousemove', handleMouseMove);
    };
  }, [cardElementsRef, isIntroCompleteRef]);

  return { handleHover, handleCardMount };
};
