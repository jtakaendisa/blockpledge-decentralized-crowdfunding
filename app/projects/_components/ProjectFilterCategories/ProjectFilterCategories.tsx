import { Category } from '@/app/entities';
import ProjectFilterCategory from '../ProjectFilterCategory/ProjectFilterCategory';

interface Props {
  selectedCategoryId: number | null;
  categories: Category[];
}

const ProjectFilterCategories = ({ selectedCategoryId, categories }: Props) => {
  return (
    <>
      <ProjectFilterCategory selectedCategoryId={selectedCategoryId} />

      {categories.map((category) => (
        <ProjectFilterCategory
          key={category.id}
          category={category}
          selectedCategoryId={selectedCategoryId}
        />
      ))}
    </>
  );
};

export default ProjectFilterCategories;
