import { ProjectPageProvider } from '@/app/contexts/ProjectPageContext';
import ProjectPageContent from './_components/ProjectPageContent/ProjectPageContent';

interface Props {
  params: {
    id: string;
  };
}

const ProjectPage = ({ params: { id } }: Props) => {
  return (
    <ProjectPageProvider id={id}>
      <ProjectPageContent />
    </ProjectPageProvider>
  );
};

export default ProjectPage;
