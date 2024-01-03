import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '../components/basic/Sidebar';
import Header from '@/components/basic/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Petrol test',
  description: 'Just a simple user dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Sidebar>
          <Header />
          {children}
        </Sidebar>
      </body>
    </html>
  );
}
