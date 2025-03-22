import './globals.css';
import { Inter, Orbitron } from 'next/font/google';
import { AppShell } from '@/components/layout/AppShell';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-orbitron',
});

export const metadata = {
  title: 'Dubai to the Stars | Space Travel Booking Platform',
  description: 'Book your journey to space from Dubai, the world\'s first hub for consumer space travel.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
      <body className="bg-space-gradient min-h-screen text-white">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
} 