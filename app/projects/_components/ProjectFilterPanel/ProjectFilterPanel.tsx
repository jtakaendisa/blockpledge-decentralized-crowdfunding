import classNames from 'classnames';

import { useProjectStore } from '@/app/store';
import ProjectFilterSearch from '../ProjectFilterSearch/ProjectFilterSearch';
import ProjectFilterCategories from '../ProjectFilterCategories/ProjectFilterCategories';
import ProjectFilterSearchSkeleton from '../ProjectFilterSearchSkeleton/ProjectFilterSearchSkeleton/ProjectFilterSearchSkeleton';
import ProjectFilterCategoriesSkeleton from '../ProjectFilterCategoriesSkeleton/ProjectFilterCategoriesSkeleton';

import styles from './ProjectFilterPanel.module.scss';

const ProjectFilterPanel = () => {
  const categories = useProjectStore((s) => s.categories);

  return (
    <aside
      className={classNames({
        [styles.filterPanel]: true,
        [styles.backgroundAndShadow]: categories.length,
      })}
    >
      {!categories.length ? <ProjectFilterSearchSkeleton /> : <ProjectFilterSearch />}

      {!categories.length ? (
        <ProjectFilterCategoriesSkeleton />
      ) : (
        <ProjectFilterCategories categories={categories} />
      )}
    </aside>
  );
};

export default ProjectFilterPanel;
