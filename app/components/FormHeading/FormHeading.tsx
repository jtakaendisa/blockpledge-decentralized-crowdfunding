import { ReactNode } from 'react';

import styles from './FormHeading.module.scss';

interface Props {
  children: ReactNode;
}

const FormHeading = ({ children }: Props) => {
  return <h5 className={styles.heading}>{children}</h5>;
};

export default FormHeading;
