import type { Metadata } from 'next';
import localFont from 'next/font/local';

import 'react-toastify/dist/ReactToastify.css';
import './globals.scss';

const inter = localFont({ src: '../public/fonts/inter-variable.ttf' });

export const metadata: Metadata = {
  title: 'BlockPledge',
  description: 'A crowdfunding platform powered by blockchain',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
