import styles from './VerticalSpacer.module.scss';

interface Props {
  height?: number;
}

const VerticalSpacer = ({ height = 1 }: Props) => {
  return <div style={{ height: `${height}rem` }} className={styles.verticalSpacer} />;
};

export default VerticalSpacer;
