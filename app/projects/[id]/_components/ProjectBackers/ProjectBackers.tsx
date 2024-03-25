'use client';

import Image from 'next/image';
import Identicon from 'react-hooks-identicons';

import { Backer } from '@/app/store';
import ethereumSVG from '@/public/icons/ethereum.svg';

import styles from './ProjectBackers.module.scss';

interface Props {
  backers: Backer[];
}

const ProjectBackers = ({ backers }: Props) => {
  return (
    <section className={styles.backers}>
      <table>
        <thead>
          <tr>
            <th>Backer</th>
            <th>Donation (ETH)</th>
            <th>Time</th>
            <th>Comment</th>
            <th>Refunded</th>
          </tr>
        </thead>
        <tbody>
          {backers.map((backerInfo, idx) => {
            const { backer, contribution, timestamp, comment, refunded } = backerInfo;
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
                <td>{comment}</td>
                <td>{refunded ? 'Yes' : 'No'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default ProjectBackers;
