import { ChangeEvent } from 'react';

import styles from './ProjectFilterSearchInput.module.scss';

interface Props {
  searchQuery: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const ProjectFilterSearchInput = ({ searchQuery, onChange }: Props) => {
  return (
    <input
      className={styles.input}
      type="text"
      placeholder="Search for projects..."
      value={searchQuery}
      onChange={onChange}
    />
  );
};

export default ProjectFilterSearchInput;
