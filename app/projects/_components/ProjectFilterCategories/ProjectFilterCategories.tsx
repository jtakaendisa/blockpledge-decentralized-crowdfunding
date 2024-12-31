import { categoryImageMap, useProjectStore } from '@/app/store';
import ProjectFilterCategory from '../ProjectFilterCategory/ProjectFilterCategory';

interface Props {
  selectedCategoryId: number | null;
}

const ProjectFilterCategories = ({ selectedCategoryId }: Props) => {
  const categories = useProjectStore((s) => s.categories);

  return (
    <>
      <ProjectFilterCategory selectedCategoryId={selectedCategoryId} />

      {categories.map((category) => (
        <ProjectFilterCategory
          key={category.id}
          category={category}
          icon={categoryImageMap[category.id]}
          selectedCategoryId={selectedCategoryId}
        />
      ))}
    </>
  );
};

export default ProjectFilterCategories;
