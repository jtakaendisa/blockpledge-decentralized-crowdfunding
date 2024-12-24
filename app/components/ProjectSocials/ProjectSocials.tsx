import { EmailShareButton, FacebookShareButton, TwitterShareButton } from 'react-share';

import ProjectLinkShareButton from '../ProjectLinkShareButton/ProjectLinkShareButton';
import Facebook from '../icons/Facebook';
import Twitter from '../icons/Twitter';
import Email from '../icons/Email';

import styles from './ProjectSocials.module.scss';

const GITHUB_URL = 'https://github.com/jtakaendisa';

const ProjectSocials = () => {
  return (
    <div className={styles.socials}>
      <FacebookShareButton url={GITHUB_URL}>
        <div className={styles.socialButton}>
          <Facebook />
        </div>
      </FacebookShareButton>

      <TwitterShareButton url={GITHUB_URL}>
        <div className={styles.socialButton}>
          <Twitter />
        </div>
      </TwitterShareButton>

      <EmailShareButton url={GITHUB_URL}>
        <div className={styles.socialButton}>
          <Email />
        </div>
      </EmailShareButton>

      <ProjectLinkShareButton />
    </div>
  );
};

export default ProjectSocials;
