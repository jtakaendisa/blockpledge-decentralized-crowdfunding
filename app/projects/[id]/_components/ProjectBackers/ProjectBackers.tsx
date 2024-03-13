'use client';

import { FaEthereum } from 'react-icons/fa';
import Identicon from 'react-hooks-identicons';

import { useProjectStore } from '@/app/store';

import styles from './ProjectBackers.module.scss';

const ProjectBackers = () => {
  const backers = useProjectStore((s) => s.backers);

  if (!backers) return null;

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
                    <FaEthereum />
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
