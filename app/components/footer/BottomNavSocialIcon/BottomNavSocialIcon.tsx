import { ReactNode } from 'react';
import Link from 'next/link';

import { Social } from '@/app/entities';

import styles from './BottomNavSocialIcon.module.scss';

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
