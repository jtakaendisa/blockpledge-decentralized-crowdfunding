'use client';

import Image from 'next/image';
import Identicon from 'react-hooks-identicons';

import { Backer, Project } from '@/app/store';
import ethereumSVG from '@/public/icons/ethereum.svg';

import styles from './ProjectBackers.module.scss';

interface Props {
  backers: Backer[];
  project: Project | null;
}

const ProjectBackers = ({ backers, project }: Props) => {
  const isReverted = project?.status === 2;
  const isDeleted = project?.status === 3;

  if (!backers.length) return <span>No donations received yet.</span>;

  return (
    <section className={styles.backers}>
      <table>
        <thead>
          <tr>
            <th>Backer</th>
            <th>Donation (ETH)</th>
            <th>Time</th>
            {(isReverted || isDeleted) && <th>Refunded</th>}
          </tr>
        </thead>
        <tbody>
          {backers.map((backerInfo, idx) => {
            const { backer, contribution, timestamp, refunded } = backerInfo;
            return (
              <tr key={idx + backer}>
                <td>
                  <div className={styles.backerInfo}>
                    <Identicon string={backer} size={25} />
                    <span>{backer}</span>
                  </div>
                </td>
                <td>
                  <div className={styles.donations}>
                    <Image src={ethereumSVG} alt="ethereum" width={18} height={18} />
                    <span>{contribution}</span>
                  </div>
                </td>
                <td>{timestamp}</td>
                {(isReverted || isDeleted) && <td>{refunded ? 'Yes' : 'No'}</td>}
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default ProjectBackers;
