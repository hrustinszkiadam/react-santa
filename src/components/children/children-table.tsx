import { Link } from '@tanstack/react-router';
import { Button } from '../ui/button';
import { DataTable } from '../data-table';
import { childrenTableColumns } from './table-columns';
import type { Child } from '@/lib/definitions';

export default function ChildrenTable({ children }: { children: Array<Child> }) {
  return (
    <DataTable
      columns={childrenTableColumns}
      data={children}
      actionButton={
        <Button
          nativeButton={false}
          render={<Link to='/children/new'>Add Child</Link>}
        />
      }
    />
  );
}
