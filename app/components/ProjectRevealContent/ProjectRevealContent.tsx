import { ReactNode } from 'react';
import classNames from 'classnames';

import styles from './ProjectRevealContent.module.scss';

interface Props {
  children: ReactNode;
  isHovered: boolean;
}

const ProjectRevealContent = ({ children, isHovered }: Props) => {
  const revealContentRef = (element: HTMLDivElement | null) => {
    if (!element) return;

    const bounds = element.getBoundingClientRect();
    element.style.setProperty('--reveal-content-height', `${bounds.height}px`);
  };

  if (!isHovered) return null;

  return (
    <div
      ref={revealContentRef}
      className={classNames({
        [styles.revealContent]: true,
        [styles.hovered]: isHovered,
      })}
    >
      <div className={styles.contentContainer}>{children}</div>
    </div>
  );
};

export default ProjectRevealContent;
