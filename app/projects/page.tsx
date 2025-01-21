import { ProjectsPageProvider } from '../contexts/ProjectsPageContext';
import ProjectsPageContent from './_components/ProjectsPageContent/ProjectsPageContent';

interface Props {
  searchParams: {
    categoryId: string;
  };
}

const ProjectsPage = ({ searchParams: { categoryId } }: Props) => {
  return (
    <ProjectsPageProvider>
      <ProjectsPageContent categoryId={categoryId ? +categoryId : null} />
    </ProjectsPageProvider>
  );
};

export default ProjectsPage;
