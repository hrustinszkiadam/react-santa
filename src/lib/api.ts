import type { Child, Toy } from './definitions';
import { env } from '@/env';

const createToysApi = (url: string) =>
  ({
    create: async (toy: Omit<Toy, 'id'>): Promise<Toy> => {
      const response = await fetch(`${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(toy),
      });
      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message || 'Failed to create toy');
      }
      const createdToy: Toy = await response.json();
      return createdToy;
    },
    findAll: async (): Promise<Array<Toy>> => {
      const response = await fetch(`${url}`);
      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message || 'Failed to fetch toys');
      }
      const toys: Array<Toy> = await response.json();
      return toys;
    },
    findOne: async (id: Toy['id']): Promise<Toy> => {
      const response = await fetch(`${url}/${id}`);
      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message || `Failed to fetch toy with id ${id}`);
      }
      const toy: Toy = await response.json();
      return toy;
    },
    update: async (id: Toy['id'], toy: Partial<Omit<Toy, 'id'>>): Promise<Toy> => {
      const response = await fetch(`${url}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(toy),
      });
      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message || `Failed to update toy with id ${id}`);
      }
      const updatedToy: Toy = await response.json();
      return updatedToy;
    },
    delete: async (id: Toy['id']): Promise<void> => {
      const response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message || `Failed to delete toy with id ${id}`);
      }
    },
  }) as const;

const createChildrenApi = (url: string) =>
  ({
    create: async (child: Omit<Child, 'id' | 'toy' | 'toyId'>): Promise<Child> => {
      const response = await fetch(`${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(child),
      });
      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message || 'Failed to create child');
      }
      const createdChild: Child = await response.json();
      return createdChild;
    },
    findAll: async (): Promise<Array<Child>> => {
      const response = await fetch(`${url}`);
      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message || 'Failed to fetch children');
      }
      const children: Array<Child> = await response.json();
      return children;
    },
    findOne: async (id: Child['id']): Promise<Child> => {
      const response = await fetch(`${url}/${id}`);
      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message || `Failed to fetch child with id ${id}`);
      }
      const child: Child = await response.json();
      return child;
    },
    update: async (
      id: Child['id'],
      child: Partial<Omit<Child, 'id' | 'toy' | 'toyId'>>,
    ): Promise<Child> => {
      const response = await fetch(`${url}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(child),
      });
      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message || `Failed to update child with id ${id}`);
      }
      const updatedChild: Child = await response.json();
      return updatedChild;
    },
    delete: async (id: Child['id']): Promise<void> => {
      const response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message || `Failed to delete child with id ${id}`);
      }
    },
    assignToy: async (id: Child['id'], toyId: Toy['id']): Promise<Child> => {
      const response = await fetch(`${url}/${id}/toys/${toyId}`, {
        method: 'PUT',
      });
      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message || `Failed to assign toy to child with id ${id}`);
      }
      const updatedChild: Child = await response.json();
      return updatedChild;
    },
    removeToy: async (id: Child['id']): Promise<Child> => {
      const response = await fetch(`${url}/${id}/toy`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message || `Failed to remove toy from child with id ${id}`);
      }
      const updatedChild: Child = await response.json();
      return updatedChild;
    },
  }) as const;

export const api = {
  toys: createToysApi(`${env.VITE_API_URL}/toys`),
  children: createChildrenApi(`${env.VITE_API_URL}/children`),
} as const;
