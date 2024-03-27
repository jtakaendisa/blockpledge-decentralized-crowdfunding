import { ReactNode } from 'react';
import classNames from 'classnames';

import { Info } from '../../page';

import styles from './InfoSelector.module.scss';

interface Props {
  onSelectInfo: (selection: Info) => void;
  selectedInfo: Info;
  children: ReactNode;
}

const InfoSelector = ({ onSelectInfo, selectedInfo, children }: Props) => {
  return (
    <div className={styles.infoSelector}>
      <ul className={styles.options}>
        <li
          className={classNames({
            [styles.option]: true,
            [styles.selected]: selectedInfo === 'donations',
          })}
          onClick={() => onSelectInfo('donations')}
        >
          Donations
        </li>
        <li
          className={classNames({
            [styles.option]: true,
            [styles.selected]: selectedInfo === 'comments',
          })}
          onClick={() => onSelectInfo('comments')}
        >
          Comments
        </li>
      </ul>
      {children}
    </div>
  );
};

export default InfoSelector;
