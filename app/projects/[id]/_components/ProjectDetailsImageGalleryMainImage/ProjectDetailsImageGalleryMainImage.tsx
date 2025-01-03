import Image from 'next/image';
import { motion } from 'framer-motion';

import styles from './ProjectDetailsImageGalleryMainImage.module.scss';

interface Props {
  imageURLs: string[];
  selectedImageIndex: number;
  blurDataURLs: string[];
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
  imageURLs,
  selectedImageIndex,
  blurDataURLs,
}: Props) => {
  const mainImageUrl = `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${imageURLs[selectedImageIndex]}`;

  return (
    <motion.div
      className={styles.mainImage}
      initial="initial"
      animate="animate"
      variants={revealVariants}
    >
      <Image
        src={mainImageUrl}
        alt="main image"
        fill
        sizes="40vw"
        placeholder="blur"
        blurDataURL={blurDataURLs[selectedImageIndex]}
      />
    </motion.div>
  );
};

export default ProjectDetailsImageGalleryMainImage;
