import { ToastContainer } from 'react-toastify';

import { useProjectPageState } from '@/app/contexts/ProjectPageContext';
import { useBlockchainEventListener } from '@/app/hooks/useBlockchainEventListener';
import { useProjectPage } from '../../_hooks/useProjectPage';
import ProjectDetails from '../ProjectDetails/ProjectDetails';
import DonationLedger from '../DonationLedger/DonationLedger';
import ErrorFallback from '@/app/components/ErrorFallback/ErrorFallback';
import ProjectDetailsSkeleton from '../ProjectDetailsSkeleton/ProjectDetailsSkeleton';

import styles from './ProjectPageContent.module.scss';

interface Props {
  id: string;
}

const ProjectPageContent = ({ id }: Props) => {
  const { project, backers, blurDataURLs } = useProjectPageState([
    'project',
    'backers',
    'blurDataURLs',
  ]);

  const { updates } = useBlockchainEventListener();
  const { isLoading, error } = useProjectPage(
    id,
    project,
    backers,
    blurDataURLs,
    updates
  );

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
