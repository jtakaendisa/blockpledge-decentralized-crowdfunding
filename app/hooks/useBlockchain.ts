import { useCallback } from 'react';
import { ethers } from 'ethers';
import { formatDistance } from 'date-fns';

import { ParsedCreateProjectFormData, Project } from '../entities';
import { truncateAccount } from '../utils';
import { useEmail } from './useEmail';
import { EditFormInputs } from '../components/modals/EditProjectModal/EditProjectModal';

import contractAddress from '../abis/contractAddress.json';
import contractAbi from '../abis/app/contracts/BlockPledge.sol/BlockPledge.json';

const address = contractAddress.address;
const abi = contractAbi.abi;

export const useBlockchain = () => {
  const { sendPaymentNotification } = useEmail();

  const formatDate = useCallback((timestamp: number) => {
    const date = new Date(timestamp);
    const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
    const month =
      date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }, []);

  const formatProject = useCallback(
    (project: any): Project => {
      return {
        id: Number(project[0]),
        owner: project[1].toLowerCase(),
        title: project[2],
        description: project[3],
        imageURLs: Array.from(project[4]) as string[],
        cost: Number(project[5]) / 10 ** 18,
        raised: Number(ethers.formatEther(project[6])),
        timestamp: new Date(Number(project[7])).getTime(),
        expiresAt: new Date(Number(project[8])).getTime(),
        backers: Number(project[9]),
        categoryId: Number(project[10]),
        status: Number(project[11]) as Project['status'],
        deletionReason: project[12],
        date: formatDate(Number(project[8]) * 1000),
      };
    },
    [formatDate]
  );

  const formatStats = useCallback((stats: any) => {
    return {
      totalProjects: Number(stats[0]),
      totalBackings: Number(stats[1]),
      totalDonations: Number(ethers.formatEther(stats[2])),
    };
  }, []);

  const formatBackers = useCallback((backers: any[]) => {
    return backers
      .map((backer) => ({
        backer: truncateAccount(backer[0], 4, 4),
        contribution: Number(ethers.formatEther(backer[1])),
        timestamp: formatDistance(new Date(Number(backer[2]) * 1000), Date.now(), {
          addSuffix: true,
        }),
        comment: backer[3],
        refunded: backer[4],
      }))
      .reverse();
  }, []);

  const formatCategories = useCallback((categories: any[]) => {
    return categories.map((category) => ({
      id: Number(category[0]),
      name: category[1],
    }));
  }, []);

  const formatPayoutInfo = useCallback(
    (id: any, recipient: any, amount: any, timestamp: any) => {
      return {
        id: Number(id),
        recipient,
        amount: Number(ethers.formatEther(amount)),
        timestamp: new Date(Number(timestamp) * 1000).toString(),
      };
    },
    []
  );

  const connectWallet = useCallback(async () => {
    try {
      if (!window.ethereum) {
        throw new Error('Please install Metamask');
      }

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
      if (!window.ethereum) {
        throw new Error('Please install Metamask');
      }

      const contract = await getContract();

      if (!contract) {
        throw new Error("Can't connect to smart contract");
      }

      const fetchedProjects = await contract.getProjects();
      const fetchedStats = await contract.stats();

      const projects: Project[] = fetchedProjects
        .map((project: any) => formatProject(project))
        .reverse();
      const stats = formatStats(fetchedStats);

      return { projects, stats };
    } catch (error) {
      console.error('Error loading projects:', (error as Error).message);
      throw error;
    }
  }, [formatProject, formatStats, getContract]);

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
      if (!window.ethereum) {
        throw new Error('Please install Metamask');
      }

      const contract = await getContract();

      if (!contract) {
        throw new Error("Can't connect to smart contract");
      }

      const fetchedCategories = await contract.getCategories();
      const categories = formatCategories(fetchedCategories);

      return { categories };
    } catch (error) {
      console.error('Error loading categories:', (error as Error).message);
      throw error;
    }
  }, [formatCategories, getContract]);

  const createProject = useCallback(
    async ({
      title,
      description,
      images,
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
          images,
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
    async ({ id, description, imageURLs }: EditFormInputs & { id: number }) => {
      try {
        if (!window.ethereum) {
          throw new Error('Please install Metamask');
        }

        const contract = await getContract();

        if (!contract) {
          throw new Error("Can't connect to smart contract");
        }

        const tx = await contract.updateProject(id, description, imageURLs);

        await tx.wait();
        await getProject(id!);
      } catch (error) {
        console.log((error as Error).message);
        throw error;
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
        console.log((error as Error).message);
        throw error;
      }
    },
    [getBackers, getProject, getContract]
  );

  const backProject = useCallback(
    async (id: number, amount: string, comment: string, connectedAccount: string) => {
      try {
        if (!window.ethereum) {
          throw new Error('Please install Metamask');
        }

        const contract = await getContract();

        if (!contract) {
          throw new Error("Can't connect to smart contract");
        }

        const convertedAmount = ethers.parseEther(amount);

        const tx = await contract.backProject(id, comment, {
          from: connectedAccount,
          value: convertedAmount,
        });

        await tx.wait();
        await getProject(id);
        await getBackers(id);
      } catch (error) {
        console.log((error as Error).message);
        throw error;
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
        console.log((error as Error).message);
        throw error;
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
        console.log((error as Error).message);
        throw error;
      }
    },
    [getProject, getContract]
  );

  const listenForEvents = useCallback(
    async (refreshUi: () => void) => {
      try {
        if (!window.ethereum) {
          throw new Error('Please install Metamask');
        }

        const contract = await getContract();

        if (!contract) {
          throw new Error("Can't connect to smart contract");
        }

        contract.on('ProjectPaidOut', async (id, recipient, amount, timestamp) => {
          const formattedPayoutInfo = formatPayoutInfo(
            id,
            recipient,
            amount,
            timestamp
          );

          // await sendPaymentNotification(formattedPayoutInfo);
          refreshUi();
        });

        contract.on('ProjectCreated', refreshUi);
        contract.on('ProjectUpdated', refreshUi);
        contract.on('ProjectDeleted', refreshUi);
        contract.on('ProjectBacked', refreshUi);
        contract.on('ProjectApproved', refreshUi);
        contract.on('ProjectRejected', refreshUi);

        return () => {
          contract.removeAllListeners();
        };
      } catch (error) {
        console.error('Error listening for payout:', (error as Error).message);
        throw error;
      }
    },
    [formatPayoutInfo, getContract]
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
    getBackers,
    getCategories,
    listenForEvents,
  };
};

// Declaration to tell TypeScript that 'ethereum' property exists on 'window'
declare global {
  interface Window {
    ethereum?: any;
  }
}
