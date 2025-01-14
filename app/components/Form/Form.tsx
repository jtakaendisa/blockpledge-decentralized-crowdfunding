import { ReactNode } from 'react';

import styles from './Form.module.scss';

interface Props {
  children: ReactNode;
  width?: number | string;
  onSubmit: () => void;
}

const Form = ({ children, width, onSubmit }: Props) => {
  return (
    <form className={styles.form} style={{ width }} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default Form;
