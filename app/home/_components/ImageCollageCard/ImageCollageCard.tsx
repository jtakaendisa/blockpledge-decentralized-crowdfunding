import { MouseEvent } from 'react';
import Image from 'next/image';

import styles from './ImageCollageCard.module.scss';

interface Props {
  imgSrc: string;
  onHover: (event: MouseEvent<HTMLDivElement>) => void;
  onMount: (element: HTMLDivElement) => void;
}

const ImageCollageCard = ({ imgSrc, onHover, onMount }: Props) => {
  const cardRef = (element: HTMLDivElement | null) => {
    if (element) {
      onMount(element);
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={onHover}
      onMouseLeave={onHover}
      className={styles.card}
    >
      <Image src={imgSrc} alt="" fill sizes="332px, 500px" />
    </div>
  );
};

export default ImageCollageCard;
