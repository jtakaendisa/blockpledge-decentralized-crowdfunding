import { useProjectStore } from '@/app/store';

import styles from './ProjectCategory.module.scss';

interface Props {
  categoryId: number;
  color?: string;
  fontWeight?: string;
}

const ProjectCategory = ({ categoryId, color, fontWeight }: Props) => {
  const categories = useProjectStore((s) => s.categories);

  return (
    <span style={{ color, fontWeight }} className={styles.category}>
      {categories.find((category) => category.id === categoryId)?.name}
    </span>
  );
};

export default ProjectCategory;
