'use client';

import { useRef } from 'react';

import { useImageCollage } from '@/app/home/_hooks/useImageCollage';
import ImageCollageCard from '../ImageCollageCard/ImageCollageCard';

import styles from './ImageCollage.module.scss';

interface Props {
  delay?: number;
}

const cardImages = [
  // Middle Inner
  require('../../../../public/images/collage_1.gif'),
  require('../../../../public/images/collage_2.webp'),
  require('../../../../public/images/collage_3.webp'),

  // Middle Outer
  require('../../../../public/images/collage_4.webp'),
  require('../../../../public/images/collage_5.webp'),

  // Left Side
  require('../../../../public/images/collage_6.webp'),
  require('../../../../public/images/collage_7.webp'),
  require('../../../../public/images/collage_8.webp'),

  // Right Side
  require('../../../../public/images/collage_9.webp'),
  require('../../../../public/images/collage_10.gif'),
  require('../../../../public/images/collage_11.webp'),
];

const ImageCollage = ({ delay = 0 }: Props) => {
  const cardElementsRef = useRef<Set<HTMLDivElement>>(new Set());
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isIntroCompleteRef = useRef(false);

  const { handleHover, handleCardMount } = useImageCollage(
    cardElementsRef,
    containerRef,
    isIntroCompleteRef,
    delay
  );

  return (
    <div className={styles.imageCollage}>
      <div ref={containerRef} className={styles.container}>
        <div className={styles.imageCollage}>
          {cardImages.map((cardImage, index) => (
            <ImageCollageCard
              key={index}
              imgSrc={cardImage}
              onHover={handleHover}
              onMount={handleCardMount}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCollage;
