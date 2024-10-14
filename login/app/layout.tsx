'use client';
import Image from 'next/image';
import ClientWalletProvider from './components/ClientWalletProvider';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[url('/background.png')] bg-cover bg-center bg-no-repeat min-h-screen">
        <ClientWalletProvider>
          {' '}
          <div className="flex flex-col items-center mb-6">
            <Image
              src="/red-runner.svg"
              alt="Red Runner"
              width={200}
              height={80}
            />
            <Image
              src="/gameshift-edition.svg"
              alt="Gameshift Edition"
              width={150}
              height={30}
              className="mt-2"
            />
          </div>
          {children}
        </ClientWalletProvider>
      </body>
    </html>
  );
}
