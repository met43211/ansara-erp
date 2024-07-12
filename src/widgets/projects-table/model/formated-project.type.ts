import { TProjectTableElement } from '@/src/entities/projects-table-element/customer';

export type TFormatedProject = {
  accounterId: number;
  projects: TProjectTableElement[];
};
