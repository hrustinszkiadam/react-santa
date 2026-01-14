import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';

import { Toaster } from 'sonner';
import TanStackQueryDevtools from '../integrations/tanstack-query/devtools';

import type { QueryClient } from '@tanstack/react-query';
import ErrorBoundary from '@/components/error-boundary';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/header';
import { SantaQueryProvider } from '@/components/santa-query-provider';

interface SantaRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<SantaRouterContext>()({
  component: () => (
    <SantaQueryProvider>
      <ThemeProvider
        defaultTheme='system'
        storageKey='vite-ui-theme'
      >
        <div className='flex min-h-screen w-full flex-col'>
          <Header />
          <Outlet />
          <Toaster position='bottom-right' />
        </div>
        <TanStackDevtools
          config={{
            position: 'bottom-left',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
      </ThemeProvider>
    </SantaQueryProvider>
  ),
  notFoundComponent: () => <ErrorBoundary error={new Error('Page Not Found')} />,
});
