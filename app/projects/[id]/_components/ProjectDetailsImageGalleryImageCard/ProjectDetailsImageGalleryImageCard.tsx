import { useMemo } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import styles from './ProjectDetailsImageGalleryImageCard.module.scss';

interface Props {
  imageUrl: string;
  index: number;
  selectedImageIndex: number;
  blurDataUrl: string;
  onSelect: (index: number) => void;
}

const ProjectDetailsImageGalleryImageCard = ({
  imageUrl,
  index,
  selectedImageIndex,
  blurDataUrl,
  onSelect,
}: Props) => {
  const memoizedImageUrl = useMemo(
    () => `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${imageUrl}`,
    [imageUrl]
  );

  return (
    <div
      className={classNames({
        [styles.imageCard]: true,
        [styles.selected]: index === selectedImageIndex,
      })}
      onClick={() => onSelect(index)}
    >
      <Image
        src={memoizedImageUrl}
        alt={`thumbnail image ${index}`}
        fill
        sizes="76px"
        placeholder="blur"
        blurDataURL={blurDataUrl}
      />
    </div>
  );
};

export default ProjectDetailsImageGalleryImageCard;
