import { Spinner } from './ui/spinner';

export default function Loading({ label }: { label?: string }) {
  if (label) {
    return (
      <div className='flex w-full grow items-center justify-center'>
        <span>Loading {label}...</span>
      </div>
    );
  }
  return (
    <div className='flex w-full grow items-center justify-center'>
      <Spinner className='h-32 w-32' />
    </div>
  );
}
