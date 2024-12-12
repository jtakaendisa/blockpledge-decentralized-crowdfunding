import { useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimationControls } from 'framer-motion';

import styles from './ProjectImage.module.scss';
import classNames from 'classnames';

interface Props {
  imageURLs: string[];
  title: string;
  height?: number;
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
  imageURLs,
  title,
  height = 16,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderBottomRightRadius,
  borderBottomLeftRadius,
  isHovered,
}: Props) => {
  const controls = useAnimationControls();

  useEffect(() => {
    if (isHovered) {
      controls.start({ scale: 1.03 });
    } else {
      controls.start({ scale: 1 });
    }
  }, [isHovered, controls]);

  return (
    <div
      style={{
        height: `${height}rem`,
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomRightRadius,
        borderBottomLeftRadius,
      }}
      className={classNames({ [styles.image]: true, [styles.hovered]: isHovered })}
    >
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
