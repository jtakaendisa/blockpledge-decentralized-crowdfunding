import { useCallback } from 'react';
import { ethers } from 'ethers';
import { formatDistance } from 'date-fns';

import {
  Backer,
  ParsedCreateProjectFormData,
  Project,
  ProjectBackedEvent,
  ProjectCreatedEvent,
  ProjectPaidOutEvent,
  Status,
} from '../entities';
import { truncateAccount } from '../utils';

import contractAddress from '../abis/contractAddress.json';
import contractAbi from '../abis/app/contracts/BlockPledge.sol/BlockPledge.json';

const address = contractAddress.address;
const abi = contractAbi.abi;

export const useBlockchain = () => {
  const formatProject = useCallback((project: any): Project => {
    return {
      id: Number(project[0]),
      owner: project[1].toLowerCase(),
      title: project[2],
      description: project[3],
      imageUrls: Array.from(project[4]) as string[],
      cost: Number(project[5]) / 10 ** 18,
      raised: Number(ethers.formatEther(project[6])),
      createdAt: new Date(Number(project[7])).getTime(),
      expiresAt: new Date(Number(project[8])).getTime(),
      backers: Number(project[9]),
      categoryId: Number(project[10]),
      status: Number(project[11]) as Project['status'],
      deletionReason: project[12],
    };
  }, []);

  const formatStats = useCallback((stats: any) => {
    return {
      totalProjects: Number(stats[0]),
      totalBackings: Number(stats[1]),
      totalDonations: Number(ethers.formatEther(stats[2])),
    };
  }, []);

  const formatBacker = useCallback(
    ({ id, backer, contribution, timestamp, comment, refunded }: Backer) => ({
      id: Number(id),
      backer: truncateAccount(backer, 4, 4),
      contribution,
      timestamp: formatDistance(
        timestamp,
        Date.now() + 3 * 60 * 1000, // 3mins converted to ms
        {
          addSuffix: true,
        }
      ),
      comment,
      refunded,
    }),
    []
  );

  const formatBackers = useCallback((backers: any[]) => {
    const offset = 3 * 60 * 1000; // 3mins converted to ms

    return backers
      .map((backer) => ({
        id: Number(backer[0]),
        backer: truncateAccount(backer[1], 4, 4),
        contribution: Number(ethers.formatEther(backer[2])),
        timestamp: formatDistance(
          new Date(Number(backer[3]) * 1000),
          Date.now() + offset,
          {
            addSuffix: true,
          }
        ),
        comment: backer[4],
        refunded: backer[5],
      }))
      .reverse();
  }, []);

  const formatCategories = useCallback((categories: any[]) => {
    return categories.map((category) => ({
      id: Number(category[0]),
      name: category[1],
    }));
  }, []);

  const formatProjectCreatedInfo = useCallback(
    ({
      id,
      owner,
      title,
      description,
      imageUrls,
      categoryId,
      cost,
      raised,
      createdAt,
      expiresAt,
      backers,
      status,
    }: ProjectCreatedEvent) => ({
      id: Number(id),
      owner,
      title,
      description,
      imageUrls,
      categoryId: Number(categoryId),
      cost: Number(ethers.formatEther(cost)),
      raised: Number(ethers.formatEther(raised)),
      createdAt: new Date(Number(createdAt)).getTime(),
      expiresAt: new Date(Number(expiresAt)).getTime(),
      backers: Number(backers),
      status: Number(status) as Status,
    }),
    []
  );

  const formatProjectBackingInfo = useCallback(
    ({
      projectId,
      contributionId,
      backer,
      raised,
      contribution,
      totalBackings,
      totalDonations,
      comment,
      timestamp,
      refunded,
    }: ProjectBackedEvent) => ({
      projectId: Number(projectId),
      contributionId: Number(contributionId),
      backer,
      raised: Number(ethers.formatEther(raised)),
      contribution: Number(ethers.formatEther(contribution)),
      totalBackings: Number(totalBackings),
      totalDonations: Number(ethers.formatEther(totalDonations)),
      comment,
      timestamp: new Date(Number(timestamp) * 1000).toString(),
      refunded,
    }),
    []
  );

  const formatProjectPayoutInfo = useCallback(
    ({ id, title, recipient, amount, timestamp }: ProjectPaidOutEvent) => ({
      id: Number(id),
      title,
      recipient,
      amount: Number(ethers.formatEther(amount)),
      timestamp: new Date(Number(timestamp)).getTime().toString(),
    }),
    []
  );

  const checkForMetamask = () => {
    if (!window.ethereum) {
      throw new Error('Please install Metamask');
    }
  };

  const connectWallet = useCallback(async () => {
    try {
      checkForMetamask();

      const accounts: string[] = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      return { accounts };
    } catch (error) {
      console.log((error as Error).message);
      throw new Error('No ethereum object.');
    }
  }, []);

  const getContract = useCallback(async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(address, abi, signer);

    return contract;
  }, []);

  const getProjects = useCallback(async () => {
    try {
      checkForMetamask();

      const contract = await getContract();

      if (!contract) {
        throw new Error("Can't connect to smart contract");
      }

      const fetchedProjects = await contract.getProjects();

      const projects: Project[] = fetchedProjects
        .map((project: any) => formatProject(project))
        .reverse();

      return { projects };
    } catch (error) {
      throw new Error(`Failed to retrieve projects: ${(error as Error).message}`);
    }
  }, [formatProject, getContract]);

  const getProject = useCallback(
    async (id: number) => {
      try {
        if (!window.ethereum) {
          throw new Error('Please install Metamask');
        }

        const contract = await getContract();

        if (!contract) {
          throw new Error("Can't connect to smart contract");
        }

        const fetchedProject = await contract.getProject(id);
        const project = formatProject(fetchedProject);

        return { project };
      } catch (error) {
        console.error('Error loading project:', (error as Error).message);
        throw error;
      }
    },
    [formatProject, getContract]
  );

  const getUserProjects = useCallback(
    async (user: string) => {
      try {
        if (!window.ethereum) {
          throw new Error('Please install Metamask');
        }

        const contract = await getContract();

        if (!contract) {
          throw new Error("Can't connect to smart contract");
        }

        const fetchedUserProjects = await contract.getUserProjects(user);

        const userProjects = fetchedUserProjects
          .map((userProject: any) => formatProject(userProject))
          .reverse();

        return { userProjects };
      } catch (error) {
        console.log((error as Error).message);
        throw error;
      }
    },
    [formatProject, getContract]
  );

  const getStats = useCallback(async () => {
    try {
      checkForMetamask();

      const contract = await getContract();

      if (!contract) {
        throw new Error("Can't connect to smart contract");
      }

      const fetchedStats = await contract.stats();
      const stats = formatStats(fetchedStats);

      return { stats };
    } catch (error) {
      throw new Error(`Failed to retrieve stats: ${(error as Error).message}`);
    }
  }, [formatStats, getContract]);

  const getBackers = useCallback(
    async (id: number) => {
      try {
        if (!window.ethereum) {
          throw new Error('Please install Metamask');
        }

        const contract = await getContract();

        if (!contract) {
          throw new Error("Can't connect to smart contract");
        }

        const fetchedBackers = await contract.getBackers(id);
        const backers = formatBackers(fetchedBackers);

        return { backers };
      } catch (error) {
        console.error('Error loading backers:', (error as Error).message);
        throw error;
      }
    },
    [formatBackers, getContract]
  );

  const getCategories = useCallback(async () => {
    try {
      checkForMetamask();

      const contract = await getContract();

      if (!contract) {
        throw new Error("Can't connect to smart contract");
      }

      const fetchedCategories = await contract.getCategories();
      const categories = formatCategories(fetchedCategories);

      return { categories };
    } catch (error) {
      throw new Error(`Failed to retrieve categories: ${(error as Error).message}`);
    }
  }, [formatCategories, getContract]);

  const createProject = useCallback(
    async ({
      title,
      description,
      imageUrls,
      cost,
      categoryId,
      expiresAt,
    }: ParsedCreateProjectFormData) => {
      try {
        if (!window.ethereum) {
          throw new Error('Please install Metamask');
        }

        const contract = await getContract();

        if (!contract) {
          throw new Error("Can't connect to smart contract");
        }

        const convertedCost = ethers.parseEther(cost.toString());

        const tx = await contract.createProject(
          title,
          description,
          imageUrls,
          categoryId,
          convertedCost,
          expiresAt
        );

        await tx.wait();
        await getProjects();
      } catch (error) {
        throw new Error(
          `Failed to commit changes to blockchain: ${(error as Error).message}`
        );
      }
    },
    [getProjects, getContract]
  );

  const updateProject = useCallback(
    async (id: number, description: string, imageUrls: string[]) => {
      try {
        if (!window.ethereum) {
          throw new Error('Please install Metamask');
        }

        const contract = await getContract();

        if (!contract) {
          throw new Error("Can't connect to smart contract");
        }

        const tx = await contract.updateProject(id, description, imageUrls);

        await tx.wait();
        await getProject(id!);
      } catch (error) {
        throw new Error(`Failed to update project: ${(error as Error).message}`);
      }
    },
    [getProject, getContract]
  );

  const deleteProject = useCallback(
    async (id: number, reason: string) => {
      try {
        if (!window.ethereum) {
          throw new Error('Please install Metamask');
        }

        const contract = await getContract();

        if (!contract) {
          throw new Error("Can't connect to smart contract");
        }

        const tx = await contract.deleteProject(id, reason);

        await tx.wait();
        await getProject(id);
        await getBackers(id);
      } catch (error) {
        throw new Error(`Failed to delete project: ${(error as Error).message}`);
      }
    },
    [getBackers, getProject, getContract]
  );

  const backProject = useCallback(
    async (
      id: number,
      amount: number,
      comment: string = '',
      connectedAccount: string
    ) => {
      try {
        if (!window.ethereum) {
          throw new Error('Please install Metamask');
        }

        const contract = await getContract();

        if (!contract) {
          throw new Error("Can't connect to smart contract");
        }

        const convertedAmount = ethers.parseEther(amount.toString());

        const tx = await contract.backProject(id, comment, {
          from: connectedAccount,
          value: convertedAmount,
        });

        await tx.wait();
        await getProject(id);
        await getBackers(id);
      } catch (error) {
        throw new Error(`Failed to back project: ${(error as Error).message}`);
      }
    },
    [getBackers, getProject, getContract]
  );

  const acceptProject = useCallback(
    async (id: number) => {
      try {
        if (!window.ethereum) {
          throw new Error('Please install Metamask');
        }

        const contract = await getContract();

        if (!contract) {
          throw new Error("Can't connect to smart contract");
        }

        const tx = await contract.acceptProject(id);

        await tx.wait();
        await getProject(id);
      } catch (error) {
        throw new Error(`Failed to accept project: ${(error as Error).message}`);
      }
    },
    [getProject, getContract]
  );

  const rejectProject = useCallback(
    async (id: number, reason: string) => {
      try {
        if (!window.ethereum) {
          throw new Error('Please install Metamask');
        }

        const contract = await getContract();

        if (!contract) {
          throw new Error("Can't connect to smart contract");
        }

        const tx = await contract.rejectProject(id, reason);

        await tx.wait();
        await getProject(id);
      } catch (error) {
        throw new Error(`Failed to reject project: ${(error as Error).message}`);
      }
    },
    [getProject, getContract]
  );

  return {
    connectWallet,
    getContract,
    createProject,
    updateProject,
    deleteProject,
    backProject,
    acceptProject,
    rejectProject,
    getProjects,
    getProject,
    getUserProjects,
    getStats,
    getBackers,
    getCategories,
    formatBacker,
    formatProjectCreatedInfo,
    formatProjectBackingInfo,
    formatProjectPayoutInfo,
  };
};

// Declaration to tell TypeScript that 'ethereum' property exists on 'window'
declare global {
  interface Window {
    ethereum?: any;
  }
}
