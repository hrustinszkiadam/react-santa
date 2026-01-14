import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import Loading from '@/components/loading';
import ToysTable from '@/components/toys/toys-table';
import { useSantaQuery } from '@/components/santa-query-provider';
import ErrorBoundary from '@/components/error-boundary';

export const Route = createFileRoute('/toys/')({
  component: RouteComponent,
  pendingComponent: Loading,
  errorComponent: ErrorBoundary,
});

function RouteComponent() {
  const { findAllToysOptions } = useSantaQuery();
  const { data: toys } = useSuspenseQuery(findAllToysOptions);

  return (
    <div className='flex w-full grow items-center justify-center'>
      <div className='container max-w-7xl'>
        <ToysTable toys={toys} />
      </div>
    </div>
  );
}
