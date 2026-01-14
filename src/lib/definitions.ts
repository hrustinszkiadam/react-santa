export const materials = ['wood', 'metal', 'plastic', 'other'] as const;
export type Material = (typeof materials)[number];

export type Toy = {
  id: number;
  name: string;
  weight: number;
  material: Material;
};

type ChildBase = {
  id: number;
  name: string;
  address: string;
};

type ChildWithToy = ChildBase & {
  wasGood: true;
  toyId: number;
  toy: Toy;
};

type ChildWithoutToy = ChildBase & {
  wasGood: boolean;
  toyId: null;
  toy: null;
};

export type Child = ChildWithToy | ChildWithoutToy;
