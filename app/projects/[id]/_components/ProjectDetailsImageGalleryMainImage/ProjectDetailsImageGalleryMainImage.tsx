import { useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import styles from './ProjectDetailsImageGalleryMainImage.module.scss';

interface Props {
  imageUrls: string[];
  selectedImageIndex: number;
  blurDataUrls: string[];
}

const revealVariants = {
  initial: {
    opacity: 0.5,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const ProjectDetailsImageGalleryMainImage = ({
  imageUrls,
  selectedImageIndex,
  blurDataUrls,
}: Props) => {
  const memoizedImageUrl = useMemo(
    () =>
      `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${imageUrls[selectedImageIndex]}`,
    [imageUrls, selectedImageIndex]
  );

  return (
    <motion.div
      className={styles.mainImage}
      initial="initial"
      animate="animate"
      variants={revealVariants}
    >
      <Image
        src={memoizedImageUrl}
        alt="main image"
        fill
        sizes="40vw"
        placeholder="blur"
        blurDataURL={blurDataUrls[selectedImageIndex]}
      />
    </motion.div>
  );
};

export default ProjectDetailsImageGalleryMainImage;
