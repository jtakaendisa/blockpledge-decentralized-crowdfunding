import Image from 'next/image';
import { motion } from 'framer-motion';

import defaultBlurDataUrl from '@/public/images/defaultBlurDataURL.png';

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
  const mainImageUrl = `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${imageUrls[selectedImageIndex]}`;

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
        blurDataURL={
          blurDataUrls
            ? blurDataUrls[selectedImageIndex]
            : defaultBlurDataUrl.blurDataURL!
        }
      />
    </motion.div>
  );
};

export default ProjectDetailsImageGalleryMainImage;
