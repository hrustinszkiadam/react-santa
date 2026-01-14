import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Loading from '@/components/loading';
import ErrorBoundary from '@/components/error-boundary';
import { useSantaQuery } from '@/components/santa-query-provider';

export const Route = createFileRoute('/toys/$id/')({
  component: RouteComponent,
  pendingComponent: Loading,
  errorComponent: ErrorBoundary,
});

function RouteComponent() {
  const { findOneToyOptions, findChildrenWithToyOptions } = useSantaQuery();
  const id = Number(Route.useParams().id);
  const router = useRouter();

  const { data: toy } = useSuspenseQuery(findOneToyOptions(id));
  const { data: childrenWithToy } = useSuspenseQuery(findChildrenWithToyOptions(id));

  return (
    <div className='flex grow items-center justify-center'>
      <div className='w-full max-w-4xl space-y-4'>
        <Card>
          <CardHeader>
            <div className='flex items-start justify-between'>
              <div>
                <CardTitle className='text-2xl'>{toy.name}</CardTitle>
                <CardDescription className='mt-2'>Toy ID: {toy.id}</CardDescription>
              </div>
              <Badge
                variant='outline'
                className='p-4 text-sm'
              >
                {toy.material}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className='grid gap-4'>
              <div className='grid grid-cols-2 place-items-center gap-4'>
                <div>
                  <p className='text-muted-foreground mb-1 text-sm'>Material</p>
                  <p className='text-base font-medium capitalize'>{toy.material}</p>
                </div>
                <div>
                  <p className='text-muted-foreground mb-1 text-sm'>Weight</p>
                  <p className='text-base font-medium'>{toy.weight} kg</p>
                </div>
              </div>

              <div className='mt-6'>
                <h3 className='mb-3 text-base font-semibold'>Children with this toy</h3>
                {childrenWithToy.length === 0 ? (
                  <p className='text-muted-foreground text-sm'>
                    No children have been assigned this toy yet.
                  </p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {childrenWithToy.map((child) => (
                        <TableRow
                          key={child.id}
                          className='cursor-pointer'
                          onClick={() =>
                            router.navigate({
                              to: `/children/${child.id}`,
                            })
                          }
                        >
                          <TableCell>{child.id}</TableCell>
                          <TableCell>{child.name}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        <div className='flex justify-center'>
          <Button
            variant='outline'
            size='lg'
            onClick={() => router.history.back()}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}
