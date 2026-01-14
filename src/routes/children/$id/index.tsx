import { useSuspenseQuery } from '@tanstack/react-query';
import { Link, createFileRoute, useRouter } from '@tanstack/react-router';
import Loading from '@/components/loading';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ErrorBoundary from '@/components/error-boundary';
import { useSantaQuery } from '@/components/santa-query-provider';

export const Route = createFileRoute('/children/$id/')({
  component: RouteComponent,
  pendingComponent: Loading,
  errorComponent: ErrorBoundary,
});

function RouteComponent() {
  const id = Number(Route.useParams().id);
  const router = useRouter();
  const { findOneChildOptions } = useSantaQuery();
  const { data: child } = useSuspenseQuery(findOneChildOptions(id));

  return (
    <div className='flex grow items-center justify-center p-6'>
      <div className='w-full max-w-4xl space-y-4'>
        <Card>
          <CardHeader>
            <div className='flex items-start justify-between'>
              <div>
                <CardTitle className='text-2xl'>{child.name}</CardTitle>
                <CardDescription className='mt-2'>Child ID: {child.id}</CardDescription>
              </div>
              <Badge
                variant={child.wasGood ? 'default' : 'destructive'}
                className='p-4 text-sm'
              >
                {child.wasGood ? 'Good' : 'Naughty'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className='grid gap-4'>
              <div>
                <p className='text-muted-foreground mb-1 text-sm'>Address</p>
                <p className='text-base font-medium'>{child.address}</p>
              </div>
              <div>
                <p className='text-muted-foreground mb-1 text-sm'>Behavior Status</p>
                <p className='text-base font-medium'>
                  {child.wasGood ? 'Was good this year' : 'Was not good this year'}
                </p>
              </div>
              <div>
                <p className='text-muted-foreground mb-1 text-sm'>Assigned Toy</p>
                {child.toyId ? (
                  <Link
                    to='/toys/$id'
                    params={{ id: child.toyId.toString() }}
                    className='hover:bg-muted inline-flex items-center gap-2 rounded-md border p-3 transition-colors'
                  >
                    <div>
                      <p className='text-base font-medium'>{child.toy.name}</p>
                      <p className='text-muted-foreground text-sm'>Toy ID: {child.toy.id}</p>
                    </div>
                  </Link>
                ) : (
                  <p className='text-muted-foreground text-sm'>
                    {child.wasGood
                      ? 'No toy assigned yet'
                      : 'Toy cannot be assigned to a naughty child'}
                  </p>
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
