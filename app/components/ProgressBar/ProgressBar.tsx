import styles from './ProgressBar.module.scss';

interface Props {
  progress: number;
}

const ProgressBar = ({ progress }: Props) => {
  return (
    <div className={styles.progressOut}>
      <div className={styles.progressIn} style={{ width: `${progress}%` }} />
    </div>
  );
};

export default ProgressBar;
