import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from './_components/footer';
import AuthProvider from './_providers/auth';
import { Toaster } from './_components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FSW Barber',
  description: 'Uma barbearia sem igual!'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark`}>
        <AuthProvider>
          {children}
          <Toaster />
          <footer>
            <Footer />
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
