import styles from './ProjectProgressBar.module.scss';

interface Props {
  raised: number;
  cost: number;
}

const ProjectProgressBar = ({ raised, cost }: Props) => {
  const progressPercentage = (raised / cost) * 100;

  return (
    <div className={styles.progressBackground}>
      <div
        className={styles.progressForeground}
        style={{ width: `${progressPercentage}%` }}
      />
    </div>
  );
};

export default ProjectProgressBar;
