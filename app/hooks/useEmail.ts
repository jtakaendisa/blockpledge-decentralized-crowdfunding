import { useCallback } from 'react';
import emailjs from '@emailjs/browser';

interface PaymentNotificationProps {
  id: number;
  title: string;
  recipient: string;
  amount: number;
  timestamp: string;
}

emailjs.init({
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
  blockHeadless: true,
  limitRate: {
    id: 'app',
    throttle: 10000,
  },
});

export const useEmail = () => {
  const sendPaymentNotification = useCallback(
    async (payoutInfo: PaymentNotificationProps) => {
      try {
        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
          { ...payoutInfo }
        );
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  return { sendPaymentNotification };
};
