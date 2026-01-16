import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { queryClient } from './lib/queryClient';
import { WakeLockProvider } from './context/WakeLockContext';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <WakeLockProvider autoEnable>
        <App />
        <Toaster
          position="top-right"
          expand={false}
          richColors
          closeButton
          toastOptions={{
            style: {
              fontFamily: 'Nunito Sans, sans-serif',
            },
          }}
        />
      </WakeLockProvider>
    </QueryClientProvider>
  </StrictMode>
);
