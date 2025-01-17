import { forwardRef } from 'react';

import User from '../../icons/User';

import styles from './TopNavAuthMenuButton.module.scss';

interface Props {
  onClick: () => void;
}

const TopNavAuthMenuButton = forwardRef<HTMLDivElement, Props>(({ onClick }, ref) => {
  return (
    <div ref={ref} onClick={onClick} className={styles.authMenuButton}>
      <User />
    </div>
  );
});

TopNavAuthMenuButton.displayName = 'TopNavAuthMenuButton';

export default TopNavAuthMenuButton;
