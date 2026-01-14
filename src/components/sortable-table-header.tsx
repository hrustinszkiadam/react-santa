import { ArrowUpDown } from 'lucide-react';
import { Button } from './ui/button';
import type { Column } from '@tanstack/react-table';
import type { PropsWithChildren } from 'react';

export default function SortableHeader({
  column,
  children,
}: { column: Column<any, unknown> } & PropsWithChildren) {
  return (
    <Button
      variant='ghost'
      className='p-0 text-lg'
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {children}
      <ArrowUpDown className='text-primary ml-2 h-4 w-4' />
    </Button>
  );
}
