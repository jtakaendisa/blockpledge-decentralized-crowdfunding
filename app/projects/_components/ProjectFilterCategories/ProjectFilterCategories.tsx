import { Category } from '@/app/entities';
import ProjectFilterCategory from '../ProjectFilterCategory/ProjectFilterCategory';

interface Props {
  categories: Category[];
}

const ProjectFilterCategories = ({ categories }: Props) => {
  return (
    <>
      <ProjectFilterCategory />

      {categories.map((category) => (
        <ProjectFilterCategory key={category.id} category={category} />
      ))}
    </>
  );
};

export default ProjectFilterCategories;
