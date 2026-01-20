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
import FloatingLines from '@/components/FloatingLines';

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
        <div className='relative flex min-h-screen w-full flex-col'>
          <div className='fixed inset-0 -z-10 hidden overflow-hidden opacity-25 dark:block'>
            <FloatingLines
              enabledWaves={['top', 'middle', 'bottom']}
              // Array - specify line count per wave; Number - same count for all waves
              lineCount={10}
              // Array - specify line distance per wave; Number - same distance for all waves
              lineDistance={5}
              bendRadius={5}
              bendStrength={-0.5}
              interactive={false}
              parallax={true}
            />
          </div>
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
