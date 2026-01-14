export default function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className='flex grow items-center justify-center'>
      <div className='text-destructive text-center'>
        <h1 className='mb-4 text-2xl font-bold'>Error</h1>
        <p>{error.message}</p>
      </div>
    </div>
  );
}
