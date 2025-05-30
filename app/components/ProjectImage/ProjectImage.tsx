import { useEffect, useMemo } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { motion, useAnimationControls } from 'framer-motion';

import styles from './ProjectImage.module.scss';

interface Props {
  imageUrls: string[];
  title: string;
  height?: number;
  sizes?: string;
  blurDataURL?: string;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  borderBottomRightRadius?: number;
  borderBottomLeftRadius?: number;
  isHovered?: boolean;
}

const transitionProps = {
  duration: 0.5,
  ease: 'easeInOut',
};

const MotionImage = motion.create(Image);

const ProjectImage = ({
  imageUrls,
  title,
  height = 256,
  sizes = '15vw',
  blurDataURL,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderBottomRightRadius,
  borderBottomLeftRadius,
  isHovered,
}: Props) => {
  const controls = useAnimationControls();

  const memoizedImageUrl = useMemo(
    () => `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${imageUrls[0]}`,
    [imageUrls]
  );

  useEffect(() => {
    if (isHovered) {
      controls.start({ scale: 1.02 });
    } else {
      controls.start({ scale: 1 });
    }
  }, [isHovered, controls]);

  return (
    <div
      style={{
        height,
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomRightRadius,
        borderBottomLeftRadius,
      }}
      className={classNames({
        [styles.imageContainer]: true,
        [styles.hovered]: isHovered,
      })}
    >
      <MotionImage
        src={memoizedImageUrl}
        alt={title}
        fill
        sizes={sizes}
        placeholder={blurDataURL ? 'blur' : 'empty'}
        blurDataURL={blurDataURL}
        className={styles.image}
        initial={{ scale: 1 }}
        animate={controls}
        transition={transitionProps}
      />
    </div>
  );
};

export default ProjectImage;
