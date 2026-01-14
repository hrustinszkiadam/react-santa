import { Activity, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { CheckIcon, MoreHorizontal, XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import SortableHeader from '../sortable-table-header';
import { ConfirmDialog } from '../confirm-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import ChooseItemDialog from '../choose-item-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { useSantaQuery } from '../santa-query-provider';
import type { Child, Toy } from '@/lib/definitions';
import type { ColumnDef } from '@tanstack/react-table';

export const childrenTableColumns: Array<ColumnDef<Child>> = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return <SortableHeader column={column}>ID</SortableHeader>;
    },
    sortingFn: 'alphanumeric',
    enableSorting: true,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return <SortableHeader column={column}>Name</SortableHeader>;
    },
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'wasGood',
    header: 'Was good?',
    cell: ({ row }) => <CheckOrCrossIcon condition={row.original.wasGood} />,
  },
  {
    id: 'doesHaveToy',
    header: 'Has a toy?',
    cell: ({ row }) => <CheckOrCrossIcon condition={!!row.original.toyId} />,
  },
  {
    id: 'actions',
    cell: ({ row }) => <ChildActionsCell child={row.original} />,
  },
];

function ChildActionsCell({ child }: { child: Child }) {
  const { findAllToysOptions, deleteChildOptions, removeToyFromChildOptions } = useSantaQuery();
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isRemoveToyDialogOpen, setIsRemoveToyDialogOpen] = useState(false);
  const [isAssignToyDialogOpen, setIsAssignToyDialogOpen] = useState(false);

  const { data: toys } = useQuery(findAllToysOptions);
  const { mutateAsync: deleteChild } = useMutation(deleteChildOptions(child.id));
  const { mutateAsync: removeToy } = useMutation(removeToyFromChildOptions(child.id));

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
            <DropdownMenuItem onClick={() => navigate({ to: `/children/${child.id}` })}>
              View Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Activity mode={child.toyId ? 'hidden' : 'visible'}>
              <DropdownMenuItem
                disabled={!child.wasGood}
                onClick={() => setIsAssignToyDialogOpen(true)}
              >
                Assign Toy
              </DropdownMenuItem>
            </Activity>
            <Activity mode={child.toyId ? 'visible' : 'hidden'}>
              <DropdownMenuItem onClick={() => setIsRemoveToyDialogOpen(true)}>
                Remove Toy
              </DropdownMenuItem>
            </Activity>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate({ to: `/children/${child.id}/edit` })}>
              Edit Child
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
              Delete Child
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <ChooseItemDialog
        open={isAssignToyDialogOpen}
        onClose={() => setIsAssignToyDialogOpen(false)}
        itemName='toy'
        description={`This toy will be assigned to "${child.name}"`}
        notFoundText="Cannot find the toy you're looking for? Click here to add it."
        notFoundLink='/toys/new'
        table={
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Material</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {toys?.map((toy) => (
                <ChooseToyRow
                  key={toy.id}
                  closeTable={setIsAssignToyDialogOpen}
                  childId={child.id}
                  toy={toy}
                />
              ))}
            </TableBody>
          </Table>
        }
      />
      <ConfirmDialog
        open={isRemoveToyDialogOpen}
        title='Remove Toy'
        description={`Are you sure you want to remove the toy assigned to "${child.name}"?`}
        actionLabel='Remove'
        actionFn={async () => {
          await removeToy();
          setIsRemoveToyDialogOpen(false);
        }}
        cancelFn={() => setIsRemoveToyDialogOpen(false)}
      />
      <ConfirmDialog
        open={isDeleteDialogOpen}
        title='Delete Child'
        description={`Are you sure you want to delete "${child.name}"? This action cannot be undone.`}
        actionLabel='Delete'
        actionFn={async () => {
          await deleteChild();
          setIsDeleteDialogOpen(false);
        }}
        cancelFn={() => setIsDeleteDialogOpen(false)}
      />
    </>
  );
}

function ChooseToyRow({
  closeTable,
  childId,
  toy,
}: {
  closeTable: (openState: boolean) => void;
  childId: Child['id'];
  toy: Toy;
}) {
  const { assignToyToChildOptions } = useSantaQuery();
  const { mutateAsync: assignToy } = useMutation(assignToyToChildOptions(childId, toy.id));

  return (
    <TableRow
      key={toy.id}
      className='hover:bg-accent cursor-pointer'
      onClick={async () => {
        await assignToy();
        closeTable(false);
      }}
    >
      <TableCell>{toy.id}</TableCell>
      <TableCell>{toy.name}</TableCell>
      <TableCell>{toy.material}</TableCell>
    </TableRow>
  );
}

function CheckOrCrossIcon({ condition }: { condition: boolean }) {
  return condition ? (
    <CheckIcon className='text-primary h-5 w-5' />
  ) : (
    <XIcon className='text-destructive h-5 w-5' />
  );
}
