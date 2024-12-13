import classNames from 'classnames';
import styles from './ProjectProgressBar.module.scss';

interface Props {
  raised: number;
  cost: number;
  height?: number;
  flatEdge?: boolean;
}

const ProjectProgressBar = ({ raised, cost, height = 4, flatEdge }: Props) => {
  const progressPercentage = (raised / cost) * 100;

  return (
    <div
      style={{ height }}
      className={classNames({
        [styles.progressBackground]: true,
        [styles.flatEdge]: flatEdge,
      })}
    >
      <div
        className={styles.progressForeground}
        style={{ width: `${progressPercentage}%` }}
      />
    </div>
  );
};

export default ProjectProgressBar;
