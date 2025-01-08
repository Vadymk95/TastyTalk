import { QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App.tsx';
import './assets/styles/index.css';
import './i18n';

import { queryClient } from '@root/api';
import { ErrorBoundary } from '@root/components/common';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <ErrorBoundary>
                    <App />
                </ErrorBoundary>
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>
);
