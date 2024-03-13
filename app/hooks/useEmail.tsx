import emailjs from '@emailjs/browser';
import { useProjectStore } from '../store';

interface PaymentNotificationProps {
  id: number;
  title?: string;
  recipient: any;
  amount: number;
  timestamp: string;
}

const useEmail = () => {
  const projects = useProjectStore((s) => s.projects);

  emailjs.init({
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
    blockHeadless: true,
    limitRate: {
      id: 'app',
      throttle: 10000,
    },
  });

  const sendPaymentNotification = async (payoutInfo: PaymentNotificationProps) => {
    const title = projects.find((project) => project.id === payoutInfo.id)?.title || '';
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
  };

  return { sendPaymentNotification };
};

export default useEmail;
