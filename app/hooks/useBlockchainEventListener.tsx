import { useEffect, useState } from 'react';

import useBlockchain from './useBlockchain';

const useBlockchainEventListener = () => {
  const [updates, setUpdates] = useState(0);

  const { listenForEvents } = useBlockchain();

  useEffect(() => {
    const unsubscribe = listenForEvents(() => setUpdates((prev) => prev + 1));

    return () => {
      unsubscribe.then((cleanup) => cleanup());
    };
  }, [listenForEvents]);

  return { updates };
};

export default useBlockchainEventListener;
