import { ChangeEvent } from 'react';
import { AnimatePresence } from 'framer-motion';

import { colors } from '@/app/constants';
import { useProjectsPageState } from '@/app/contexts/ProjectsPageContext';
import ProjectFilterSearchInput from '../ProjectFilterSearchInput/ProjectFilterSearchInput';
import ProjectFilterSearchIcon from '../ProjectFilterSearchIcon/ProjectFilterSearchIcon';
import MagnifyingGlass from '@/app/components/icons/MagnifyingGlass';
import Xmark from '@/app/components/icons/Xmark';

import styles from './ProjectFilterSearch.module.scss';

const { gray, red } = colors;

const ProjectFilterSearch = () => {
  const { searchQuery } = useProjectsPageState(['searchQuery']);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    searchQuery.set(event.target.value);

  const handleReset = () => searchQuery.set('');

  return (
    <div className={styles.search}>
      <ProjectFilterSearchIcon align="left">
        <MagnifyingGlass fill={gray} />
      </ProjectFilterSearchIcon>

      <ProjectFilterSearchInput searchQuery={searchQuery.get} onChange={handleChange} />

      <AnimatePresence>
        {searchQuery.get && (
          <ProjectFilterSearchIcon align="right" onClick={handleReset}>
            <Xmark fill={red} />
          </ProjectFilterSearchIcon>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectFilterSearch;
