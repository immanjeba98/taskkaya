import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { JobProvider } from '@/contexts/JobContext';
import Navbar from '@/components/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Job Board - Find Your Dream Job',
  description: 'Browse and apply for the latest job opportunities',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <JobProvider>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main>
              {children}
            </main>
          </div>
        </JobProvider>
      </body>
    </html>
  );
}