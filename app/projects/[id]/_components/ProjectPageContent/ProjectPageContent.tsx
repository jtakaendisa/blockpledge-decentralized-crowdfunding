'use client';

import { ToastContainer } from 'react-toastify';

import { useProjectPageContext } from '@/app/hooks/useProjectPageContext';
import ProjectDetails from '../ProjectDetails/ProjectDetails';
import DonationLedger from '../DonationLedger/DonationLedger';
import ErrorFallback from '@/app/components/ErrorFallback/ErrorFallback';
import ProjectDetailsSkeleton from '../ProjectDetailsSkeleton/ProjectDetailsSkeleton';

import styles from './ProjectPageContent.module.scss';

const ProjectPageContent = () => {
  const { isLoading, error } = useProjectPageContext();

  if (error) {
    return <ErrorFallback error={error} />;
  }

  return (
    <div className={styles.projectPage}>
      {isLoading ? <ProjectDetailsSkeleton /> : <ProjectDetails />}

      {!isLoading && <DonationLedger />}

      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        theme="dark"
        hideProgressBar
      />
    </div>
  );
};

export default ProjectPageContent;
