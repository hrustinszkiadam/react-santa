import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import ChildForm from '@/components/children/form';
import Loading from '@/components/loading';
import ErrorBoundary from '@/components/error-boundary';
import { useSantaQuery } from '@/components/santa-query-provider';

export const Route = createFileRoute('/children/$id/edit')({
  component: RouteComponent,
  pendingComponent: Loading,
  errorComponent: ErrorBoundary,
});

function RouteComponent() {
  const id = Number(Route.useParams().id);
  const { findOneChildOptions, updateChildOptions } = useSantaQuery();
  const { data: child } = useSuspenseQuery(findOneChildOptions(id));
  const { mutate: updateChild } = useMutation(updateChildOptions(id));

  return (
    <div className='flex grow items-center justify-center'>
      <div className='w-full max-w-xl rounded-xl border p-4 backdrop-blur-xl'>
        <ChildForm
          onSubmit={updateChild}
          child={child}
        />
      </div>
    </div>
  );
}
