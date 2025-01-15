import { MouseEvent } from 'react';

import Xmark from '../../icons/Xmark';

import styles from './CloseModalButton.module.scss';

interface Props {
  disabled: boolean;
  onClose: () => void;
}

const CloseModalButton = ({ disabled, onClose }: Props) => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onClose();
  };

  return (
    <button onClick={handleClick} disabled={disabled} className={styles.closeButton}>
      <Xmark />
    </button>
  );
};

export default CloseModalButton;
