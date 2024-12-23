import Image from 'next/image';
import { motion } from 'framer-motion';

import styles from './ProjectDetailsImageGalleryMainImage.module.scss';

interface Props {
  imageURLs: string[];
  selectedImageIndex: number;
  title: string;
}

const revealVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.85,
    },
  },
};

const ProjectDetailsImageGalleryMainImage = ({
  imageURLs,
  selectedImageIndex,
  title,
}: Props) => {
  const mainImageUrl = `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${imageURLs[selectedImageIndex]}`;

  return (
    <motion.div
      className={styles.mainImage}
      initial="initial"
      animate="animate"
      variants={revealVariants}
    >
      <Image src={mainImageUrl} alt={title} fill sizes="35vw" priority />
    </motion.div>
  );
};

export default ProjectDetailsImageGalleryMainImage;
