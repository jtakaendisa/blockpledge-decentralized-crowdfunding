import { socials } from '@/app/constants';
import Envelope from '../categories/icons/Envelope';
import LinkedIn from '../categories/icons/LinkedIn';
import Github from '../categories/icons/Github';
import BottomNavSocialIcon from '../BottomNavSocialIcon/BottomNavSocialIcon';

import styles from './BottomNavSocials.module.scss';

const iconMap = {
  nav_email: <Envelope />,
  nav_linkedin: <LinkedIn />,
  nav_github: <Github />,
};

const BottomNavSocials = () => {
  return (
    <div className={styles.socials}>
      {socials.map((social) => (
        <BottomNavSocialIcon
          key={social.slug}
          social={social}
          icon={iconMap[social.slug as keyof typeof iconMap]}
        />
      ))}
    </div>
  );
};

export default BottomNavSocials;
