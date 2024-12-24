import styles from './ProjectMetric.module.scss';

interface Props {
  value: string | number;
  unit: string;
}

const ProjectMetric = ({ value, unit }: Props) => {
  return (
    <div className={styles.metric}>
      <span className={styles.value}>{value}</span>
      <span className={styles.unit}>{unit}</span>
    </div>
  );
};

export default ProjectMetric;
