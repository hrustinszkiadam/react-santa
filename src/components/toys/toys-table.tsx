import { Link } from '@tanstack/react-router';
import { Button } from '../ui/button';
import { DataTable } from '../data-table';
import { toyTableColumns } from './table-columns';
import type { Toy } from '@/lib/definitions';

export default function ToysTable({ toys }: { toys: Array<Toy> }) {
  return (
    <DataTable
      columns={toyTableColumns}
      data={toys}
      actionButton={<Button render={<Link to='/toys/new'>Add Toy</Link>} />}
    />
  );
}
