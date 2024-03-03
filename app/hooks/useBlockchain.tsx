'use client';

import { useAccountStore } from '../store';
import contractAddress from '../abis/contractAddress.json';
import contractAbi from '../abis/app/contracts/BlockPledge.sol/BlockPledge.json';

const address = contractAddress.address;
const abi = contractAbi.abi;

const useBlockchain = () => {
  const connectedAccount = useAccountStore((s) => s.connectedAccount);
  const setConnectedAccount = useAccountStore((s) => s.setConnectedAccount);

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

  const checkConnection = () => {
    connectWallet();

    window.ethereum.on('chainChanged', () => {
      window.location.reload();
    });

    window.ethereum.on('accountsChanged', async () => {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setConnectedAccount(accounts[0]);
    });
  };

  return { connectWallet, checkConnection };
};

export default useBlockchain;

// Declaration to tell TypeScript that 'ethereum' property exists on 'window'
declare global {
  interface Window {
    ethereum?: any;
  }
}
