import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import Loading from '@/components/loading';
import ChildrenTable from '@/components/children/children-table';
import { useSantaQuery } from '@/components/santa-query-provider';
import ErrorBoundary from '@/components/error-boundary';

export const Route = createFileRoute('/children/')({
  component: RouteComponent,
  pendingComponent: Loading,
  errorComponent: ErrorBoundary,
});

function RouteComponent() {
  const { findAllChildrenOptions } = useSantaQuery();
  const { data: children } = useSuspenseQuery(findAllChildrenOptions);

  return (
    <div className='flex w-full grow items-center justify-center'>
      <div className='container max-w-7xl'>
        <ChildrenTable children={children} />
      </div>
    </div>
  );
}
