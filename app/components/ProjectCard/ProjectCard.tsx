import Link from 'next/link';
import Image from 'next/image';
import Identicon from 'react-hooks-identicons';

import { Project, statusMap } from '@/app/store';
import { truncateAccount, findDaysRemaining } from '@/app/utils';
import { statusColorMap } from '../ProjectsGrid/ProjectsGrid';
import ProgressBar from '../ProgressBar/ProgressBar';
import ethereumSVG from '@/public/icons/ethereum.svg';

import styles from './ProjectCard.module.scss';

interface Props {
  project: Project;
}

const ProjectCard = ({ project }: Props) => {
  const { id, owner, title, imageURLs, backers, expiresAt, raised, cost, status } =
    project;

  return (
    <div className={styles.card}>
      <Link href={`/projects/${id}`} className={styles.link}>
        <div className={styles.image}>
          <Image
            src={`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${imageURLs[0]}`}
            alt={title}
            fill
            sizes="15vw"
          />
        </div>
        <div className={styles.info}>
          <h5>{title}</h5>
          <div className={styles.ownerDetails}>
            <Identicon string={owner} size={15} />
            <small>{truncateAccount(owner, 4, 4)}</small>
          </div>
          <small className={styles.remainingTime}>{findDaysRemaining(expiresAt)}</small>
          <ProgressBar progress={(raised / cost) * 100} />
          <div className={styles.row}>
            <small>{raised} ETH Raised</small>
            <small className={styles.cost}>
              <Image src={ethereumSVG} alt="ethereum" width={18} height={18} />
              <span>{cost} ETH</span>
            </small>
          </div>
          <div className={styles.backingInfo}>
            <small>
              {backers} {backers === 1 ? 'Backer' : 'Backers'}
            </small>
            <small className={styles[statusColorMap[status]]}>
              {statusMap[status]}
            </small>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProjectCard;
