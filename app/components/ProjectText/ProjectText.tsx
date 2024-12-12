import { ReactNode } from 'react';
import Image from 'next/image';

import styles from './ProjectText.module.scss';

interface Props {
  icon?: string;
  children: ReactNode;
}

const ProjectText = ({ icon, children }: Props) => {
  return (
    <div className={styles.textContainer}>
      {icon && (
        <Image
          src={require(`@/public/icons/${icon}.svg`)}
          alt={icon}
          width={18}
          height={18}
        />
      )}
      <span>{children}</span>
    </div>
  );
};

export default ProjectText;
