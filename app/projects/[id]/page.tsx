'use client';

import { ProjectPageProvider } from '@/app/contexts/ProjectPageContext';
import ProjectPageContent from './_components/ProjectPageContent/ProjectPageContent';

interface Props {
  params: {
    id: string;
  };
}

const ProjectPage = ({ params: { id } }: Props) => {
  return (
    <ProjectPageProvider>
      <ProjectPageContent id={id} />
    </ProjectPageProvider>
  );
};

export default ProjectPage;
