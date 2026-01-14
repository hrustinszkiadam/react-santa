import { createContext, useContext } from 'react';
import { mutationOptions, queryOptions, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import type { PropsWithChildren } from 'react';
import type { Child, Toy } from '@/lib/definitions';
import type { ToyFormValues } from './toys/form';
import type { ChildFormValues } from './children/form';
import { api } from '@/lib/api';
import { showToast } from '@/lib/utils';

type SantaQueryContextType = ReturnType<typeof useSantaQueryValue>;

const SantaQueryContext = createContext<SantaQueryContextType | null>(null);

function useSantaQueryValue() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const findAllToysOptions = queryOptions({
    queryKey: ['toys'],
    queryFn: api.toys.findAll,
  });

  const findOneToyOptions = (id: Toy['id']) => {
    return queryOptions({
      queryKey: ['toys', id],
      queryFn: api.toys.findOne.bind(null, id),
    });
  };

  const createToyOptions = mutationOptions({
    mutationFn: api.toys.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['toys'] });
      router.history.back();
      showToast('Success', 'Toy created successfully', 'success');
    },
    onError: () => {
      showToast('Error', 'Failed to create toy', 'error');
    },
  });

  const updateToyOptions = (id: Toy['id']) => {
    return mutationOptions({
      mutationFn: (updatedToy: ToyFormValues) => api.toys.update(id, updatedToy),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['toys'] });
        router.history.back();
        showToast('Success', 'Toy updated successfully', 'success');
      },
      onError: () => {
        showToast('Error', 'Failed to update toy', 'error');
      },
    });
  };

  const deleteToyOptions = (id: Toy['id']) => {
    return mutationOptions({
      mutationFn: api.toys.delete.bind(null, id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['toys'] });
        showToast('Success', 'Toy deleted successfully', 'success');
      },
      onError: () => {
        showToast('Error', 'Failed to delete toy', 'error');
      },
    });
  };

  const findChildrenWithToyOptions = (toyId: Toy['id']) => {
    return queryOptions({
      queryKey: ['children', { toyId }],
      queryFn: async () => {
        const children = await api.children.findAll();
        return children.filter((child) => child.toyId === toyId);
      },
    });
  };

  const findAllChildrenOptions = queryOptions({
    queryKey: ['children'],
    queryFn: api.children.findAll,
  });

  const findOneChildOptions = (id: Child['id']) => {
    return queryOptions({
      queryKey: ['children', id],
      queryFn: api.children.findOne.bind(null, id),
    });
  };

  const createChildOptions = mutationOptions({
    mutationFn: api.children.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['children'] });
      router.history.back();
      showToast('Success', 'Child created successfully', 'success');
    },
    onError: () => {
      showToast('Error', 'Failed to create child', 'error');
    },
  });

  const updateChildOptions = (id: Child['id']) => {
    return mutationOptions({
      mutationFn: (updatedChild: ChildFormValues) => api.children.update(id, updatedChild),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['children'] });
        router.history.back();
        showToast('Success', 'Child updated successfully', 'success');
      },
      onError: () => {
        showToast('Error', 'Failed to update child', 'error');
      },
    });
  };

  const deleteChildOptions = (id: Child['id']) => {
    return mutationOptions({
      mutationFn: api.children.delete.bind(null, id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['children'] });
        showToast('Success', 'Child deleted successfully', 'success');
      },
      onError: () => {
        showToast('Error', 'Failed to delete child', 'error');
      },
    });
  };

  const assignToyToChildOptions = (childId: Child['id'], toyId: Toy['id']) => {
    return mutationOptions({
      mutationFn: () => api.children.assignToy(childId, toyId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['children'] });
        showToast('Success', 'Toy assigned to child successfully', 'success');
      },
      onError: () => {
        showToast('Error', 'Failed to assign toy to child', 'error');
      },
    });
  };

  const removeToyFromChildOptions = (childId: Child['id']) => {
    return mutationOptions({
      mutationFn: () => api.children.removeToy(childId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['children'] });
        showToast('Success', 'Toy removed from child successfully', 'success');
      },
      onError: () => {
        showToast('Error', 'Failed to remove toy from child', 'error');
      },
    });
  };

  return {
    findAllToysOptions,
    findOneToyOptions,
    createToyOptions,
    updateToyOptions,
    deleteToyOptions,
    findChildrenWithToyOptions,
    findAllChildrenOptions,
    findOneChildOptions,
    createChildOptions,
    updateChildOptions,
    deleteChildOptions,
    assignToyToChildOptions,
    removeToyFromChildOptions,
  };
}

export function SantaQueryProvider({ children: ChildrenComponent }: PropsWithChildren) {
  const value = useSantaQueryValue();

  return <SantaQueryContext.Provider value={value}>{ChildrenComponent}</SantaQueryContext.Provider>;
}

export const useSantaQuery = () => {
  const context = useContext(SantaQueryContext);
  if (!context) {
    throw new Error('useSantaQuery must be used within a SantaQueryProvider');
  }
  return context;
};
