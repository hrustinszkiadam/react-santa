import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { useRouter } from '@tanstack/react-router';
import type { Material, Toy } from '@/lib/definitions';
import { materials } from '@/lib/definitions';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const initialData: Toy = {
  id: 0,
  name: '',
  material: 'plastic',
  weight: 0,
};

const toySchema = z.object({
  name: z.string().nonempty('Name is required'),
  material: z.enum(materials, { message: 'Please select a valid material' }),
  weight: z
    .number({ message: 'Weight must be a number' })
    .positive('Weight must be positive')
    .multipleOf(0.01, 'Weight can only have up to 2 decimal places'),
});

export type ToyFormValues = z.infer<typeof toySchema>;

export default function ToysForm({
  toy = initialData,
  onSubmit,
}: {
  toy?: Toy;
  onSubmit: (toy: ToyFormValues) => void | Promise<void>;
}) {
  const isEditMode = toy.id !== 0;
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: toy.name,
      material: toy.material,
      weight: toy.weight,
    },
    validators: {
      onSubmit: toySchema,
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
            <Label htmlFor={field.name}>Toy Name</Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder='Enter toy name'
              aria-invalid={field.state.meta.errors.length > 0}
            />
            {field.state.meta.errors.length > 0 && (
              <p className='text-destructive text-sm'>{field.state.meta.errors[0]?.message}</p>
            )}
          </Field>
        )}
      </form.Field>

      <form.Field
        name='material'
        validators={{
          onChange: toySchema.shape.material,
        }}
      >
        {(field) => (
          <Field aria-invalid={field.state.meta.errors.length > 0}>
            <Label htmlFor={field.name}>Material</Label>
            <Select
              value={field.state.value}
              onValueChange={(value) => field.handleChange(value as Material)}
            >
              <SelectTrigger className='w-full'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Materials</SelectLabel>
                  {materials.map((material) => (
                    <SelectItem
                      key={material}
                      value={material}
                    >
                      {material}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {field.state.meta.errors.length > 0 && (
              <p className='text-destructive text-sm'>
                {String(field.state.meta.errors[0]?.message)}
              </p>
            )}
          </Field>
        )}
      </form.Field>

      <form.Field name='weight'>
        {(field) => (
          <Field aria-invalid={field.state.meta.errors.length > 0}>
            <Label htmlFor={field.name}>Weight (kg)</Label>
            <Input
              id={field.name}
              name={field.name}
              type='number'
              step='0.01'
              min='0'
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(parseFloat(e.target.value))}
              placeholder='Enter weight in kg (e.g., 1.50)'
              aria-invalid={field.state.meta.errors.length > 0}
            />
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
        <Button type='submit'>{isEditMode ? 'Update Toy' : 'Create Toy'}</Button>
      </div>
    </form>
  );
}
