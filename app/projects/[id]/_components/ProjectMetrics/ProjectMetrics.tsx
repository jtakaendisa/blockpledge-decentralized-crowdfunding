import { findRemainingTime } from '@/app/utils';
import ProjectMetric from '../ProjectMetric/ProjectMetric';

import styles from './ProjectMetrics.module.scss';

interface Props {
  backers: number;
  expiresAt: number;
}

const ProjectMetrics = ({ backers, expiresAt }: Props) => {
  const [remainingTimeValue, remainingTimeUnit] = findRemainingTime(expiresAt);

  return (
    <div className={styles.metrics}>
      <ProjectMetric value={backers} unit={backers !== 1 ? 'backers' : 'backer'} />
      <ProjectMetric value={remainingTimeValue} unit={remainingTimeUnit} />
    </div>
  );
};

export default ProjectMetrics;
