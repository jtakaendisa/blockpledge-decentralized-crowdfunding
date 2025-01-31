'use client';

import { useState } from 'react';
import classNames from 'classnames';

import ChainLink from '../icons/ChainLink';

import styles from './ProjectLinkShareButton.module.scss';

const ProjectLinkShareButton = () => {
  const [urlCopied, setUrlCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setUrlCopied(true);
      setTimeout(() => setUrlCopied(false), 1500);
    } catch (error) {
      console.error('Failed to copy:', (error as Error).message);
    }
  };

  return (
    <button
      className={classNames(styles.socialButton, styles.linkButton)}
      onClick={copyToClipboard}
    >
      <ChainLink />
      <span
        className={classNames({
          [styles.tooltip]: true,
          [styles.show]: urlCopied,
        })}
      >
        link copied
      </span>
    </button>
  );
};

export default ProjectLinkShareButton;
