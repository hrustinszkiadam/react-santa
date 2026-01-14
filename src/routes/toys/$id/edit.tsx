import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import ToysForm from '@/components/toys/form';
import Loading from '@/components/loading';
import ErrorBoundary from '@/components/error-boundary';
import { useSantaQuery } from '@/components/santa-query-provider';

export const Route = createFileRoute('/toys/$id/edit')({
  component: RouteComponent,
  pendingComponent: Loading,
  errorComponent: ErrorBoundary,
});

function RouteComponent() {
  const { findOneToyOptions, updateToyOptions } = useSantaQuery();
  const id = Number(Route.useParams().id);

  const { data: toy } = useSuspenseQuery(findOneToyOptions(id));

  const { mutate: updateToy } = useMutation(updateToyOptions(id));

  return (
    <div className='flex grow items-center justify-center'>
      <div className='w-full max-w-xl rounded-xl border p-4'>
        <ToysForm
          onSubmit={updateToy}
          toy={toy}
        />
      </div>
    </div>
  );
}
