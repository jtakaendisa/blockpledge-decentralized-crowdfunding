import { ReactNode } from 'react';

import { Social } from '@/app/entities';

import styles from './BottomNavSocialIcon.module.scss';
import Link from 'next/link';

interface Props {
  social: Social;
  icon: ReactNode;
}

const BottomNavSocialIcon = ({ social, icon }: Props) => {
  return (
    <Link href={social.href} target="_blank" className={styles.socialIcon}>
      {icon}
    </Link>
  );
};

export default BottomNavSocialIcon;
