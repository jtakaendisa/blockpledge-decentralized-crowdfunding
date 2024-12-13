import styles from './VerticalSpacer.module.scss';

interface Props {
  height?: number;
}

const VerticalSpacer = ({ height = 16 }: Props) => {
  return <div style={{ height }} className={styles.verticalSpacer} />;
};

export default VerticalSpacer;
