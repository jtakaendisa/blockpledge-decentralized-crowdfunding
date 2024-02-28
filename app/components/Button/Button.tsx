import { ReactNode } from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';

interface Props {
  color?: string;
  inverted?: boolean;
  children: ReactNode;
}

const Button = ({ color = 'green', inverted, children }: Props) => {
  return (
    <button
      className={classNames({
        [styles.button]: true,
        [styles[color]]: color,
        [styles.inverted]: inverted,
      })}
    >
      {children}
    </button>
  );
};

export default Button;
