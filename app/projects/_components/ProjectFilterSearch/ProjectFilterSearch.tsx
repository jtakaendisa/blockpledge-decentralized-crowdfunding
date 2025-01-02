import { AnimatePresence } from 'framer-motion';

import { colors } from '@/app/constants';
import { useProjectsPageState } from '@/app/contexts/ProjectsPageContext';
import { useProjectFilterSearch } from '../../_hooks/useProjectFilterSearch';
import ProjectFilterSearchInput from '../ProjectFilterSearchInput/ProjectFilterSearchInput';
import ProjectFilterSearchIcon from '../ProjectFilterSearchIcon/ProjectFilterSearchIcon';
import MagnifyingGlass from '@/app/components/icons/MagnifyingGlass';
import Xmark from '@/app/components/icons/Xmark';

import styles from './ProjectFilterSearch.module.scss';

const { baseGray, red } = colors;

const ProjectFilterSearch = () => {
  const { searchQuery } = useProjectsPageState(['searchQuery']);
  const { searchTerm, handleChange, handleReset } = useProjectFilterSearch(searchQuery);

  return (
    <div className={styles.search}>
      <ProjectFilterSearchIcon align="left">
        <MagnifyingGlass fill={baseGray} />
      </ProjectFilterSearchIcon>

      <ProjectFilterSearchInput searchTerm={searchTerm} onChange={handleChange} />

      <AnimatePresence>
        {searchTerm && (
          <ProjectFilterSearchIcon align="right" onClick={handleReset}>
            <Xmark fill={red} />
          </ProjectFilterSearchIcon>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectFilterSearch;
