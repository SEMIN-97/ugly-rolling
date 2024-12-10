import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { routeTree } from './routeTree.gen';
import { queryClient } from './config/queryClient.ts';
import './styles/index.scss';

const router = createRouter({ routeTree });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={ queryClient }>
      <RouterProvider router={ router }/>
    </QueryClientProvider>
  </StrictMode>
);
