'use client';

import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

import useBlockchainEventListener from '@/app/hooks/useBlockchainEventListener';
import useProjectPage from './_hooks/useProjectPage';
import ProjectDetails from './_components/ProjectDetails/ProjectDetails';
import InfoSelector from './_components/InfoSelector/InfoSelector';
import ProjectBackers from './_components/ProjectBackers/ProjectBackers';
import ProjectComments from './_components/ProjectComments/ProjectComments';
import ProjectDetailsSkeleton from './_components/ProjectDetailsSkeleton/ProjectDetailsSkeleton';
import ErrorFallback from '@/app/components/ErrorFallback/ErrorFallback';

import styles from './page.module.scss';

interface Props {
  params: {
    id: string;
  };
}

export type Info = 'donations' | 'comments';

const ProjectPage = ({ params: { id } }: Props) => {
  const { updates } = useBlockchainEventListener();
  const { isLoading, project, backers, blurDataURLs, error } = useProjectPage(
    id,
    updates
  );

  const [selectedInfo, setSelectedInfo] = useState<Info>('donations');

  const handleSelectInfo = (selection: Info) => {
    setSelectedInfo(selection);
  };

  if (error) {
    return <ErrorFallback error={error} />;
  }

  return (
    <div className={styles.projectPage}>
      {isLoading ? (
        <ProjectDetailsSkeleton />
      ) : (
        <ProjectDetails project={project!} blurDataURLs={blurDataURLs!} />
      )}

      {/* <InfoSelector onSelectInfo={handleSelectInfo} selectedInfo={selectedInfo}>
            {selectedInfo === 'donations' && (
              <ProjectBackers backers={backers} project={project} />
            )}
            {selectedInfo === 'comments' && <ProjectComments backers={backers} />}
          </InfoSelector> */}

      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        theme="dark"
        hideProgressBar
      />
    </div>
  );
};

export default ProjectPage;
