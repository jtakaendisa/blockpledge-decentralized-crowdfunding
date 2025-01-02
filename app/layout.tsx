import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { mediaStyles } from './media';
import TopNav from './components/TopNav/TopNav';
import BottomNav from './components/BottomNav/BottomNav';

import './globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';

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
      <head>
        <style type="text/css" dangerouslySetInnerHTML={{ __html: mediaStyles }} />
      </head>
      <body className={inter.className}>
        <TopNav />
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
