import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App.tsx';
import './assets/styles/index.css';
import './i18n';

import { ErrorBoundary, ErrorThrower } from '@root/components/common';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <ErrorBoundary>
                <App />
                <ErrorThrower />
            </ErrorBoundary>
        </BrowserRouter>
    </StrictMode>
);
