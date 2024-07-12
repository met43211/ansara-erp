import { TFormatedProject } from '../../model/formated-project.type';

import { TProjectTableElement } from '@/src/entities/projects-table-element/customer';

export const formatProjects = (projects: TProjectTableElement[]) => {
  const formatedProjects: TFormatedProject[] = [];

  projects.forEach((project) => {
    let isIn = false;

    formatedProjects.forEach((accounter, index) => {
      if (accounter.accounterId === project.accounterId) {
        isIn = true;
        if (!project.order) {
        }
        formatedProjects[index].projects.push(project);
      }
    });

    if (!isIn) {
      formatedProjects.push({
        accounterId: project.accounterId,
        projects: [project],
      });
    }
  });

  return formatedProjects;
};
