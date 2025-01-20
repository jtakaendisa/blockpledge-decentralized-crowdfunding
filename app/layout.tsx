import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { mediaStyles } from './media';
import { TransitionProvider } from './transitionProvider';
import TopNav from './components/header/TopNav/TopNav';
import BottomNav from './components/footer/BottomNav/BottomNav';

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
        <TransitionProvider>
          <TopNav />
          <div id="pt-page">{children}</div>
          <BottomNav />
        </TransitionProvider>

        {/* Page Transition Blocks */}
        <div id="pt-blocks" className="pt-blocks">
          {Array.from({ length: 10 }).map((_, rowIndex) => (
            <div key={rowIndex} className="pt-blocks-row">
              {Array.from({ length: 11 }).map((_, columnIndex) => (
                <div
                  key={columnIndex}
                  id={`row-${rowIndex}-column-${columnIndex}`}
                  className="pt-blocks-row-column"
                />
              ))}
            </div>
          ))}
        </div>

        {/* Animated Route Name */}
        <span id="pt-route" className="pt-route" />
      </body>
    </html>
  );
}
