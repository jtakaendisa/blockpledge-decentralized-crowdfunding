import Identicon from 'react-hooks-identicons';

import { Backer } from '@/app/entities';

import styles from './ProjectComments.module.scss';

interface Props {
  backers: Backer[];
}

const ProjectComments = ({ backers }: Props) => {
  if (!backers.length) return <span>No comments posted yet.</span>;

  const filteredBackers = backers.filter((backer) => backer.comment.length);

  return (
    <section className={styles.comments}>
      <table>
        <thead>
          <tr>
            <th>Backer</th>
            <th>Comment</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredBackers.map((backerInfo, idx) => {
            const { backer, comment, timestamp } = backerInfo;
            return (
              <tr key={idx + backer}>
                <td>
                  <div className={styles.backerInfo}>
                    <Identicon string={backer} size={25} />
                    <span>{backer}</span>
                  </div>
                </td>
                <td>{comment}</td>
                <td>{timestamp}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default ProjectComments;
