import { ReactNode } from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';

interface Props {
  children: ReactNode;
  color?: 'green' | 'gray' | 'red' | 'orange';
  inverted?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({ color = 'green', inverted, children, onClick, disabled }: Props) => {
  return (
    <button
      className={classNames({
        [styles.button]: true,
        [styles[color]]: color,
        [styles.inverted]: inverted,
      })}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
