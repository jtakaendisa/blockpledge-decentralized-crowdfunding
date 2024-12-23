import Image from 'next/image';
import classNames from 'classnames';

import styles from './ProjectDetailsImageGalleryImageCard.module.scss';

interface Props {
  imageURL: string;
  index: number;
  selectedImageIndex: number;
  title: string;
  onSelect: (index: number) => void;
}

const ProjectDetailsImageGalleryImageCard = ({
  imageURL,
  index,
  selectedImageIndex,
  title,
  onSelect,
}: Props) => {
  return (
    <div
      key={imageURL}
      className={classNames({
        [styles.imageCard]: true,
        [styles.selected]: index === selectedImageIndex,
      })}
      onClick={() => onSelect(index)}
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${imageURL}`}
        alt={title}
        fill
        sizes="5vw"
        priority
      />
    </div>
  );
};

export default ProjectDetailsImageGalleryImageCard;
