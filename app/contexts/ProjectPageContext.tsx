'use client';

import { createContext, ReactNode, useCallback, useEffect, useState } from 'react';
import { Contract, Listener } from 'ethers';

import { Backer, Project, ProjectBackedEvent, ProjectPaidOutEvent } from '../entities';
import { StatusEnum } from '../constants';
import { useBlockchain } from '../hooks/useBlockchain';
import { usePlaiceholder } from '../hooks/usePlaiceholder';
import { useEmail } from '../hooks/useEmail';

interface ProjectPageContextType {
  project: Project;
  backers: Backer[];
  blurDataUrls: string[];
  isLoading: boolean;
  error: Error | null;
}

export const ProjectPageContext = createContext<ProjectPageContextType>({
  project: {} as Project,
  backers: [],
  blurDataUrls: [],
  isLoading: true,
  error: null,
});

interface ProjectPageProviderProps {
  children: ReactNode;
  id: string;
}

export const ProjectPageProvider = ({ children, id }: ProjectPageProviderProps) => {
  const [project, setProject] = useState<Project>({} as Project);
  const [backers, setBackers] = useState<Backer[]>([]);
  const [blurDataUrls, setBlurDataUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const {
    getContract,
    getProject,
    getBackers,
    formatProjectBackingInfo,
    formatProjectPayoutInfo,
    formatBacker,
  } = useBlockchain();
  const { getBlurDataUrls } = usePlaiceholder();
  const { sendPaymentNotification } = useEmail();

  const handleProjectUpdated = useCallback(
    (id: bigint, description: string, imageUrls: string[]) => {
      setProject((prev) => {
        if (prev.id !== Number(id)) {
          return prev;
        }

        return { ...prev, description, imageUrls };
      });
    },
    []
  );

  const handleProjectTerminated = useCallback((id: bigint) => {
    setProject((prev) => {
      if (prev.id !== Number(id)) {
        return prev;
      }

      return { ...prev, status: StatusEnum.Deleted };
    });
  }, []);

  const handleProjectBacked: Listener = useCallback(
    (...args) => {
      const event: { args: ProjectBackedEvent } = args[args.length - 1];
      const {
        projectId,
        contributionId,
        backer,
        raised,
        contribution,
        timestamp,
        comment,
        refunded,
      } = formatProjectBackingInfo(event.args);

      setProject((prev) => {
        if (prev.id !== projectId || prev.raised === raised) {
          return prev;
        }

        return {
          ...prev,
          raised,
        };
      });

      setBackers((prev) => {
        const foundContribution = prev.find(
          (contribution) => contribution.id === contributionId
        );

        if (projectId !== parseInt(id) || foundContribution) {
          return prev;
        }

        return [
          formatBacker({
            id: contributionId,
            backer,
            contribution,
            timestamp,
            comment,
            refunded,
          }),
          ...prev,
        ];
      });
    },
    [id, formatProjectBackingInfo, formatBacker]
  );

  const handleProjectPaidOut: Listener = useCallback(
    async (...args) => {
      const event: { args: ProjectPaidOutEvent } = args[args.length - 1];

      setProject((prev) => {
        if (prev.id !== Number(event.args.id) || prev.status === StatusEnum.PaidOut) {
          return prev;
        }

        const payoutInfo = formatProjectPayoutInfo(event.args);
        sendPaymentNotification(payoutInfo);

        return { ...prev, status: StatusEnum.PaidOut };
      });
    },
    [formatProjectPayoutInfo, sendPaymentNotification]
  );

  const handleProjectApproved = useCallback((id: bigint) => {
    setProject((prev) => {
      if (prev.id !== Number(id)) {
        return prev;
      }

      return { ...prev, status: StatusEnum.Open };
    });
  }, []);

  useEffect(() => {
    let contract: Contract | undefined;

    const init = async () => {
      try {
        console.log('fetching page');
        contract = await getContract();

        // Fetch initial data
        const { project } = await getProject(+id);
        const { backers } = await getBackers(+id);
        const { blurDataUrls } = await getBlurDataUrls(project.imageUrls);

        setProject(project);
        setBackers(backers);
        setBlurDataUrls(blurDataUrls);

        // Set up event listeners
        contract.on('ProjectUpdated', handleProjectUpdated);
        contract.on('ProjectDeleted', handleProjectTerminated);
        contract.on('ProjectBacked', handleProjectBacked);
        contract.on('ProjectPaidOut', handleProjectPaidOut);
        contract.on('ProjectApproved', handleProjectApproved);
        contract.on('ProjectRejected', handleProjectTerminated);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    init();

    // Clean up event listeners on unmount
    return () => {
      if (contract) {
        contract.off('ProjectUpdated', handleProjectUpdated);
        contract.off('ProjectDeleted', handleProjectTerminated);
        contract.off('ProjectBacked', handleProjectBacked);
        contract.off('ProjectPaidOut', handleProjectPaidOut);
        contract.off('ProjectApproved', handleProjectApproved);
        contract.off('ProjectRejected', handleProjectTerminated);
      }
    };
  }, [
    id,
    getContract,
    getProject,
    getBackers,
    getBlurDataUrls,
    handleProjectUpdated,
    handleProjectTerminated,
    handleProjectBacked,
    handleProjectPaidOut,
    handleProjectApproved,
  ]);

  return (
    <ProjectPageContext.Provider
      value={{
        project,
        backers,
        blurDataUrls,
        isLoading,
        error,
      }}
    >
      {children}
    </ProjectPageContext.Provider>
  );
};
