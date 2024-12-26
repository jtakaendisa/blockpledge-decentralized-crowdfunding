'use client';

import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import { Backer, Project, useProjectStore } from '@/app/store';
import useBlockchain from '@/app/hooks/useBlockchain';
import useBlurDataURLs from '@/app/hooks/useBlurDataURLs';
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
  const { getProject, getBackers, getCategories, listenForEvents } = useBlockchain();
  const { getBlurDataURLs } = useBlurDataURLs();
  const [project, setProject] = useState<Project | null>(null);
  const [backers, setBackers] = useState<Backer[] | null>(null);
  const [blurDataURLs, setBlurDataURLs] = useState<string[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [selectedInfo, setSelectedInfo] = useState<Info>('donations');
  const [refreshUi, setRefreshUi] = useState(false);

  const isLoading = !project || !backers || !blurDataURLs;

  const handleSelectInfo = (selection: Info) => {
    setSelectedInfo(selection);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { project } = await getProject(+id);
        const { backers } = await getBackers(+id);
        const { blurDataURLs } = await getBlurDataURLs(project.imageURLs);

        setProject(project);
        setBackers(backers);
        setBlurDataURLs(blurDataURLs);
      } catch (error) {
        setError(error as Error);
      }
    };

    fetchData();
  }, [id, refreshUi, getProject, getBackers, getCategories, getBlurDataURLs]);

  useEffect(() => {
    const unsubscribe = listenForEvents(() => setRefreshUi((prev) => !prev));

    return () => {
      unsubscribe.then((cleanup) => cleanup());
    };
  }, [listenForEvents]);

  if (error) {
    return <ErrorFallback error={error} />;
  }

  return (
    <div className={styles.projectPage}>
      {isLoading ? (
        <ProjectDetailsSkeleton />
      ) : (
        <ProjectDetails project={project} blurDataURLs={blurDataURLs} />
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
