import styles from './ProgressBar.module.scss';

interface Props {
  progress: number;
}

const ProgressBar = ({ progress }: Props) => {
  return (
    <div className={styles.progressBackground}>
      <div className={styles.progressForeground} style={{ width: `${progress}%` }} />
    </div>
  );
};

export default ProgressBar;
