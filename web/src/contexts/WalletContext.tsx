'use client';

import { createContext, useContext, useEffect, ReactNode } from 'react';
import {
  useCurrentAccount,
  useConnectWallet,
  useDisconnectWallet,
  useSignAndExecuteTransaction,
  useWallets,
} from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { setSignAndExecuteFunction } from '@/lib/wallet';

interface WalletContextType {
  connected: boolean;
  address: string | null;
  isLoading: boolean;
  error: string | null;
  connect: (walletName?: string) => Promise<void>;
  disconnect: () => Promise<void>;
  isInstalled: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

function WalletBridge({ children }: { children: ReactNode }) {
  const account = useCurrentAccount();
  const wallets = useWallets();
  const { mutateAsync: connectAsync, isPending: isConnecting, error: connectError } = useConnectWallet();
  const { mutateAsync: disconnectAsync } = useDisconnectWallet();
  const { mutateAsync: signAndExecuteAsync } = useSignAndExecuteTransaction();

  // Keep module-level sign function in sync with current account
  useEffect(() => {
    if (account) {
      setSignAndExecuteFunction(async (tx: Transaction) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await signAndExecuteAsync({ transaction: tx as any });
        return { digest: result.digest };
      });
    } else {
      setSignAndExecuteFunction(null);
    }
  }, [account?.address, signAndExecuteAsync]);

  const connect = async (walletName?: string) => {
    if (wallets.length === 0) return;
    const target = walletName
      ? wallets.find(w => w.name === walletName)
      : wallets[0];
    if (!target) return;
    await connectAsync({ wallet: target });
  };

  const disconnect = async () => {
    await disconnectAsync();
  };

  const errorMessage = connectError instanceof Error ? connectError.message : null;

  return (
    <WalletContext.Provider
      value={{
        connected: !!account,
        address: account?.address ?? null,
        isLoading: isConnecting,
        error: errorMessage,
        connect,
        disconnect,
        isInstalled: wallets.length > 0,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function WalletProvider({ children }: { children: ReactNode }) {
  return <WalletBridge>{children}</WalletBridge>;
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
