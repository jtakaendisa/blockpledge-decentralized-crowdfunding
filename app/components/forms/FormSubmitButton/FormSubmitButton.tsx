import { ReactNode } from 'react';
import classNames from 'classnames';

import styles from './FormSubmitButton.module.scss';

interface Props {
  children: ReactNode;
  color?: 'gray' | 'green' | 'orange' | 'red';
  disabled?: boolean;
}

const FormSubmitButton = ({ children, color = 'green', disabled }: Props) => {
  return (
    <button
      disabled={disabled}
      className={classNames(styles.submitButton, styles[color])}
    >
      {children}
    </button>
  );
};

export default FormSubmitButton;
