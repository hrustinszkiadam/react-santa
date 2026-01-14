import { createFileRoute } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import ChildForm from '@/components/children/form';
import { useSantaQuery } from '@/components/santa-query-provider';
import ErrorBoundary from '@/components/error-boundary';
import Loading from '@/components/loading';

export const Route = createFileRoute('/children/new')({
  component: RouteComponent,
  pendingComponent: Loading,
  errorComponent: ErrorBoundary,
});

function RouteComponent() {
  const { createChildOptions } = useSantaQuery();
  const { mutate: createChild } = useMutation(createChildOptions);

  return (
    <div className='flex grow items-center justify-center'>
      <div className='w-full max-w-xl rounded-xl border p-4'>
        <ChildForm onSubmit={createChild} />
      </div>
    </div>
  );
}
