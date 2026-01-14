import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import ToysForm from '@/components/toys/form';
import { useSantaQuery } from '@/components/santa-query-provider';

export const Route = createFileRoute('/toys/new')({
  component: RouteComponent,
});

function RouteComponent() {
  const { createToyOptions } = useSantaQuery();
  const { mutate: createToy } = useMutation(createToyOptions);

  return (
    <div className='flex grow items-center justify-center'>
      <div className='w-full max-w-xl rounded-xl border p-4'>
        <ToysForm onSubmit={createToy} />
      </div>
    </div>
  );
}
