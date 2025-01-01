import { ChangeEvent } from 'react';

import styles from './ProjectFilterSearchInput.module.scss';

interface Props {
  searchTerm: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const ProjectFilterSearchInput = ({ searchTerm, onChange }: Props) => {
  return (
    <input
      className={styles.input}
      type="text"
      placeholder="Search for projects..."
      value={searchTerm}
      onChange={onChange}
    />
  );
};

export default ProjectFilterSearchInput;
