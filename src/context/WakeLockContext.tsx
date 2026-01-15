import { createContext, useContext, useEffect, ReactNode } from 'react';
import useWakeLock from '../hooks/useWakeLock';

interface WakeLockContextType {
  isSupported: boolean;
  isActive: boolean;
  isEnabled: boolean;
  error: Error | null;
  enable: () => void;
  disable: () => void;
}

const WakeLockContext = createContext<WakeLockContextType | null>(null);

interface WakeLockProviderProps {
  children: ReactNode;
  autoEnable?: boolean;
}

export const WakeLockProvider = ({ children, autoEnable = true }: WakeLockProviderProps) => {
  const wakeLock = useWakeLock();

  useEffect(() => {
    if (autoEnable && wakeLock.isSupported) {
      wakeLock.enable();
    }

    return () => {
      wakeLock.disable();
    };
  }, [autoEnable, wakeLock.isSupported]);

  return (
      <WakeLockContext.Provider value={wakeLock}>
        {children}
      </WakeLockContext.Provider>
  );
};

export const useWakeLockContext = () => {
  const ctx = useContext(WakeLockContext);
  if (!ctx) {
    throw new Error('useWakeLockContext must be used within WakeLockProvider');
  }
  return ctx;
};
