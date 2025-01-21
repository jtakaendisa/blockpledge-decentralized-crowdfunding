import { useCallback } from 'react';
import emailjs from '@emailjs/browser';

import { useGlobalStateContext } from './useGlobalStateContext';

interface PaymentNotificationProps {
  id: number;
  title?: string;
  recipient: any;
  amount: number;
  timestamp: string;
}

export const useEmail = () => {
  const { projects } = useGlobalStateContext();

  emailjs.init({
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
    blockHeadless: true,
    limitRate: {
      id: 'app',
      throttle: 10000,
    },
  });

  const sendPaymentNotification = useCallback(
    async (payoutInfo: PaymentNotificationProps) => {
      const title =
        projects.find((project) => project.id === payoutInfo.id)?.title || '';
      payoutInfo.title = title;

      try {
        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
          payoutInfo as any
        );
      } catch (error) {
        console.log(error);
      }
    },
    [projects]
  );

  return { sendPaymentNotification };
};
