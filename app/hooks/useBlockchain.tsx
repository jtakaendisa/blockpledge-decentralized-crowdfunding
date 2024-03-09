'use client';

import { ethers } from 'ethers';
import { formatDistance } from 'date-fns';

import { Project, useAccountStore, useProjectStore } from '../store';
import { truncateAccount } from '../utils';
import contractAddress from '../abis/contractAddress.json';
import contractAbi from '../abis/app/contracts/BlockPledge.sol/BlockPledge.json';
import { FormInputs } from '../components/ProjectModal/ProjectModal';
import { AddFormInputs } from '../components/modals/AddProjectModal/AddProjectModal';
import { EditFormInputs } from '../components/modals/EditProjectModal/EditProjectModal';

const address = contractAddress.address;
const abi = contractAbi.abi;

const useBlockchain = () => {
  const connectedAccount = useAccountStore((s) => s.connectedAccount);
  const setConnectedAccount = useAccountStore((s) => s.setConnectedAccount);
  const setProjects = useProjectStore((s) => s.setProjects);
  const setProject = useProjectStore((s) => s.setProject);
  const setStats = useProjectStore((s) => s.setStats);
  const setBackers = useProjectStore((s) => s.setBackers);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return alert('Please install Metamask');

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

      if (accounts.length) {
        setConnectedAccount(accounts[0]);
      }
    } catch (error) {
      console.log((error as Error).message);
      throw new Error('No ethereum object.');
    }
  };

  const getContract = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(address, abi, signer);

    return contract;
  };

  const createProject = async ({
    title,
    description,
    imageURLs,
    cost,
    expiresAt,
  }: AddFormInputs) => {
    try {
      if (!window.ethereum) return alert('Please install Metamask');

      const contract = await getContract();

      if (!contract) return;

      const convertedCost = ethers.parseEther(cost);

      const tx = await contract.createProject(
        title,
        description,
        imageURLs,
        convertedCost,
        expiresAt
      );

      await tx.wait();
      await loadProjects();
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const updateProject = async ({
    id,
    description,
    imageURLs,
  }: EditFormInputs & { id: number }) => {
    try {
      if (!window.ethereum) return alert('Please install Metamask');

      const contract = await getContract();

      if (!contract) return;

      const tx = await contract.updateProject(id, description, imageURLs);

      await tx.wait();
      await loadProject(id!);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const deleteProject = async (id: number) => {
    console.log('delete triggered!!!');
    try {
      if (!window.ethereum) return alert('Please install Metamask');

      const contract = await getContract();

      if (!contract) return;

      const tx = await contract.deleteProject(id);

      await tx.wait();
      await loadProject(id);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const backProject = async (id: number, amount: string) => {
    try {
      if (!window.ethereum) return alert('Please install Metamask');

      const contract = await getContract();

      if (!contract) return;

      const convertedAmount = ethers.parseEther(amount);

      const tx = await contract.backProject(id, {
        from: connectedAccount,
        value: convertedAmount,
      });

      await tx.wait();
      await loadProject(id);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const getBackers = async (id: number) => {
    try {
      if (!window.ethereum) return alert('Please install Metamask');

      const contract = await getContract();

      if (!contract) return;

      const backers = await contract.getBackers(id);

      const formattedBackers = formatBackers(backers);

      if (backers.length) {
        setBackers(formattedBackers);
      }
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const loadProjects = async () => {
    try {
      if (!window.ethereum) return alert('Please install Metamask');

      const contract = await getContract();

      if (!contract) return alert("Can't connect to smart contract");

      const projects = await contract.getProjects();
      const stats = await contract.stats();

      const formattedProjects = formatProjects(projects);
      const formattedStats = formatStats(stats);

      if (projects.length) {
        setProjects(formattedProjects);
        setStats(formattedStats);
      }
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const loadProject = async (id: number) => {
    try {
      if (!window.ethereum) return alert('Please install Metamask');

      const contract = await getContract();

      if (!contract) return alert("Can't connect to smart contract");

      const project = await contract.getProject(id);

      const formattedProject = formatProject(project);

      if (formattedProject) {
        setProject(formattedProject);
      }
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
    const month =
      date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const formatProject = (project: any): Project => {
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
      status: Number(project[10]) as Project['status'],
      date: formatDate(Number(project[8]) * 1000),
    };
  };

  const formatProjects = (projects: any) => {
    return projects.map((project: any) => formatProject(project)).reverse();
  };

  const formatStats = (stats: any) => {
    return {
      totalProjects: Number(stats[0]),
      totalBacking: Number(stats[1]),
      totalDonations: Number(ethers.formatEther(stats[2])),
    };
  };

  const formatBackers = (backers: any[]) => {
    return backers
      .map((backer) => ({
        backer: truncateAccount(backer[0], 4, 4),
        contribution: Number(ethers.formatEther(backer[1])),
        timestamp: formatDistance(new Date(Number(backer[2]) * 1000), Date.now(), {
          addSuffix: true,
        }),
        refunded: backer[3],
      }))
      .reverse();
  };

  return {
    connectWallet,
    getContract,
    createProject,
    updateProject,
    deleteProject,
    backProject,
    loadProjects,
    loadProject,
    getBackers,
  };
};

export default useBlockchain;

// Declaration to tell TypeScript that 'ethereum' property exists on 'window'
declare global {
  interface Window {
    ethereum?: any;
  }
}
