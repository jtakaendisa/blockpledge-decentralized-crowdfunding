import { useGlobalStateContext } from '@/app/hooks/useGlobalStateContext';

import styles from './ProjectCategory.module.scss';

interface Props {
  categoryId: number;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
}

const ProjectCategory = ({ categoryId, fontSize, fontWeight, color }: Props) => {
  const { categories } = useGlobalStateContext();

  return (
    <span style={{ fontSize, fontWeight, color }} className={styles.category}>
      {categories.find((category) => category.id === categoryId)?.name}
    </span>
  );
};

export default ProjectCategory;
