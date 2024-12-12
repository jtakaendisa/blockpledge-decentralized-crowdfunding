import { useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimationControls } from 'framer-motion';

import styles from './ProjectImage.module.scss';

interface Props {
  imageURLs: string[];
  title: string;
  isHovered: boolean;
}

const transitionProps = {
  duration: 0.5,
  ease: 'easeInOut',
};

const MotionImage = motion.create(Image);

const ProjectImage = ({ imageURLs, title, isHovered }: Props) => {
  const controls = useAnimationControls();

  useEffect(() => {
    if (isHovered) {
      controls.start({ scale: 1.05 });
    } else {
      controls.start({ scale: 1 });
    }
  }, [isHovered, controls]);

  return (
    <div className={styles.image}>
      <MotionImage
        src={`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${imageURLs[0]}`}
        alt={title}
        fill
        sizes="15vw"
        initial={{ scale: 1 }}
        animate={controls}
        transition={transitionProps}
      />
    </div>
  );
};

export default ProjectImage;
