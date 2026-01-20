import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import ToysForm from '@/components/toys/form';
import { useSantaQuery } from '@/components/santa-query-provider';
import Loading from '@/components/loading';
import ErrorBoundary from '@/components/error-boundary';

export const Route = createFileRoute('/toys/new')({
  component: RouteComponent,
  pendingComponent: Loading,
  errorComponent: ErrorBoundary,
});

function RouteComponent() {
  const { createToyOptions } = useSantaQuery();
  const { mutate: createToy } = useMutation(createToyOptions);

  return (
    <div className='flex grow items-center justify-center'>
      <div className='w-full max-w-xl rounded-xl border p-4 backdrop-blur-xl'>
        <ToysForm onSubmit={createToy} />
      </div>
    </div>
  );
}
