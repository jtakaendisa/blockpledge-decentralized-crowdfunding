import { ReactNode } from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';

interface Props {
  color?: 'green' | 'gray' | 'red' | 'orange';
  inverted?: boolean;
  children: ReactNode;
  onClick?: () => void;
}

const Button = ({ color = 'green', inverted, children, onClick }: Props) => {
  return (
    <button
      className={classNames({
        [styles.button]: true,
        [styles[color]]: color,
        [styles.inverted]: inverted,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
