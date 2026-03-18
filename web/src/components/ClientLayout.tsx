'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SuiClientProvider, WalletProvider as DappKitWalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import { WalletProvider } from '@/contexts/WalletContext';
import { SplashScreen } from './SplashScreen';

const queryClient = new QueryClient();

const networks = {
  testnet: { url: process.env.NEXT_PUBLIC_SUI_RPC_URL || getFullnodeUrl('testnet') },
};

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networks} defaultNetwork="testnet">
        <DappKitWalletProvider autoConnect preferredWallets={['Phantom', 'Sui Wallet', 'Suiet']}>
          <WalletProvider>
            <SplashScreen />
            {children}
          </WalletProvider>
        </DappKitWalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}
