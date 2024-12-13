import { ReactNode } from 'react';
import Image from 'next/image';

import styles from './ProjectText.module.scss';

interface Props {
  children: ReactNode;
  icon?: string;
  iconSize?: number;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
}

const ProjectText = ({
  children,
  icon,
  iconSize = 18,
  fontSize,
  fontWeight,
  color,
}: Props) => {
  return (
    <div className={styles.textContainer}>
      {icon && (
        <Image
          src={require(`@/public/icons/${icon}.svg`)}
          alt={icon}
          width={iconSize}
          height={iconSize}
        />
      )}
      <span style={{ fontSize, fontWeight, color }} className={styles.text}>
        {children}
      </span>
    </div>
  );
};

export default ProjectText;
