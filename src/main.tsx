import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {WakeLockProvider} from "./context/WakeLockContext.tsx";
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <WakeLockProvider autoEnable>
            <App/>
        </WakeLockProvider>
    </StrictMode>
);
