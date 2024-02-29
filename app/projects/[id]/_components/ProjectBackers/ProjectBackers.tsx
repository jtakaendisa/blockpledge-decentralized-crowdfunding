'use client';

import { FaEthereum } from 'react-icons/fa';
import Identicon from 'react-hooks-identicons';

import styles from './ProjectBackers.module.scss';

const ProjectBackers = () => {
  return (
    <section className={styles.backers}>
      <table>
        <thead>
          <tr>
            <th>Backer</th>
            <th>Donation</th>
            <th>Time</th>
            <th>Refunded</th>
          </tr>
        </thead>
        <tbody>
          {Array(10)
            .fill(null)
            .map((_, i) => (
              <tr key={i}>
                <td>
                  <div className={styles.backerInfo}>
                    <Identicon string={`0x2e...042${i}`} size={25} />
                    <span>0x2e...042{i}</span>
                  </div>
                </td>
                <td>
                  <div className={styles.donations}>
                    <FaEthereum />
                    <span>{3} ETH</span>
                  </div>
                </td>
                <td>{new Date().getTime()}</td>
                <td>{false ? 'Yes' : 'No'}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
};

export default ProjectBackers;
