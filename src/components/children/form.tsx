import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { useRouter } from '@tanstack/react-router';
import { Checkbox } from '../ui/checkbox';
import type { Child } from '@/lib/definitions';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const initialData: Child = {
  id: 0,
  name: '',
  address: '',
  wasGood: false,
  toy: null,
  toyId: null,
};

const ChildSchema = z.object({
  name: z.string().nonempty('Name is required'),
  address: z.string().nonempty('Address is required'),
  wasGood: z.boolean({ error: 'WasGood must be a boolean' }),
});

export type ChildFormValues = z.infer<typeof ChildSchema>;

export default function ChildForm({
  child = initialData,
  onSubmit,
}: {
  child?: Child;
  onSubmit: (child: ChildFormValues) => void | Promise<void>;
}) {
  const isEditMode = child.id !== 0;
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: child.name,
      address: child.address,
      wasGood: child.wasGood,
    },
    validators: {
      onSubmit: ChildSchema,
    },
    onSubmit: async ({ value }) => {
      await onSubmit(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className='space-y-6'
    >
      <form.Field name='name'>
        {(field) => (
          <Field aria-invalid={field.state.meta.errors.length > 0}>
            <Label htmlFor={field.name}>Child Name</Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder='Enter Child name'
              aria-invalid={field.state.meta.errors.length > 0}
            />
            {field.state.meta.errors.length > 0 && (
              <p className='text-destructive text-sm'>{field.state.meta.errors[0]?.message}</p>
            )}
          </Field>
        )}
      </form.Field>

      <form.Field name='address'>
        {(field) => (
          <Field aria-invalid={field.state.meta.errors.length > 0}>
            <Label htmlFor={field.name}>Child Address</Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder='Enter Child address'
              aria-invalid={field.state.meta.errors.length > 0}
            />
            {field.state.meta.errors.length > 0 && (
              <p className='text-destructive text-sm'>{field.state.meta.errors[0]?.message}</p>
            )}
          </Field>
        )}
      </form.Field>

      <form.Field name='wasGood'>
        {(field) => (
          <Field
            aria-invalid={field.state.meta.errors.length > 0}
            className='flex flex-row items-center gap-2'
          >
            <div className='flex items-center gap-4'>
              <Label htmlFor={field.name}>Was Good?</Label>
              <Checkbox
                id={field.name}
                name={field.name}
                checked={field.state.value}
                onCheckedChange={(checked) => field.handleChange(!!checked)}
                aria-invalid={field.state.meta.errors.length > 0}
                className='scale-125'
              />
            </div>
            {field.state.meta.errors.length > 0 && (
              <p className='text-destructive text-sm'>{field.state.meta.errors[0]?.message}</p>
            )}
          </Field>
        )}
      </form.Field>

      <div className='flex gap-2'>
        <Button
          type='button'
          variant='outline'
          onClick={() => router.history.back()}
        >
          Cancel
        </Button>
        <Button type='submit'>{isEditMode ? 'Update Child' : 'Create Child'}</Button>
      </div>
    </form>
  );
}
