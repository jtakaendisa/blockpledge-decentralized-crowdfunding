import Image from 'next/image';

import styles from './ProjectDetailsImageGalleryMainImage.module.scss';

interface Props {
  imageURLs: string[];
  selectedImageIndex: number;
  title: string;
}

const ProjectDetailsImageGalleryMainImage = ({
  imageURLs,
  selectedImageIndex,
  title,
}: Props) => {
  const mainImageUrl = `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${imageURLs[selectedImageIndex]}`;

  return (
    <div className={styles.mainImage}>
      <Image src={mainImageUrl} alt={title} fill sizes="35vw" priority />
    </div>
  );
};

export default ProjectDetailsImageGalleryMainImage;
