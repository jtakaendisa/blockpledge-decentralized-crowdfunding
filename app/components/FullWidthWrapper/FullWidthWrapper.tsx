import { ReactNode } from 'react';

import styles from './FullWidthWrapper.module.scss';

interface Props {
  children: ReactNode;
}

const FullWidthWrapper = ({ children }: Props) => {
  return <div className={styles.fullWidthWrapper}>{children}</div>;
};

export default FullWidthWrapper;
