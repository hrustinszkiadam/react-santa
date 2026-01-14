import { MoreHorizontal } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import SortableHeader from '../sortable-table-header';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { ConfirmDialog } from '../confirm-dialog';
import { useSantaQuery } from '../santa-query-provider';
import type { ColumnDef } from '@tanstack/react-table';
import type { Toy } from '@/lib/definitions';

export const toyTableColumns: Array<ColumnDef<Toy>> = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return <SortableHeader column={column}>ID</SortableHeader>;
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return <SortableHeader column={column}>Name</SortableHeader>;
    },
  },
  {
    accessorKey: 'material',
    header: 'Material',
  },
  {
    accessorKey: 'weight',
    header: ({ column }) => {
      return <SortableHeader column={column}>Weight (kg)</SortableHeader>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <ToyActionsCell toy={row.original} />,
  },
];

function ToyActionsCell({ toy }: { toy: Toy }) {
  const { deleteToyOptions } = useSantaQuery();
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { mutate: deleteToy } = useMutation(deleteToyOptions(toy.id));

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant='ghost'
              className='h-8 w-8 rounded-md p-0'
            />
          }
        >
          <span className='sr-only'>Open menu</span>
          <MoreHorizontal className='h-8 w-8' />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => navigate({ to: `/toys/${toy.id}` })}>
              View Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate({ to: `/toys/${toy.id}/edit` })}>
              Edit Toy
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
              Delete Toy
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmDialog
        open={isDeleteDialogOpen}
        title='Delete Toy'
        description={`Are you sure you want to delete "${toy.name}"? This action cannot be undone.`}
        actionLabel='Delete'
        actionFn={() => {
          deleteToy();
          setIsDeleteDialogOpen(false);
        }}
        cancelFn={() => setIsDeleteDialogOpen(false)}
      />
    </>
  );
}
