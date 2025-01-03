import Image from 'next/image';
import classNames from 'classnames';

import styles from './ProjectDetailsImageGalleryImageCard.module.scss';

interface Props {
  imageURL: string;
  index: number;
  selectedImageIndex: number;
  blurDataURL: string;
  onSelect: (index: number) => void;
}

const ProjectDetailsImageGalleryImageCard = ({
  imageURL,
  index,
  selectedImageIndex,
  blurDataURL,
  onSelect,
}: Props) => {
  return (
    <div
      className={classNames({
        [styles.imageCard]: true,
        [styles.selected]: index === selectedImageIndex,
      })}
      onClick={() => onSelect(index)}
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${imageURL}`}
        alt={`thumbnail image ${index}`}
        fill
        sizes="76px"
        placeholder="blur"
        blurDataURL={blurDataURL}
      />
    </div>
  );
};

export default ProjectDetailsImageGalleryImageCard;
