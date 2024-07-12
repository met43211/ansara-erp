'use client';

import { Spinner } from '@nextui-org/spinner';
import { useEffect, useState } from 'react';

import { getUsername } from '../lib/utils/get-username';
import { TFormatedProject } from '../model/formated-project.type';
import { formatProjects } from '../lib/utils/format-projects';

import { TableList } from './table-list';

import { useFilters } from '@/src/shared/ui/local-options/model/filters-store';
import { Flex } from '@/src/shared/ui/(layout)/flex';
import { EStorageKeys } from '@/src/shared/ui/local-options/model/options.enum';
import { TProjectTableElement } from '@/src/entities/projects-table-element/customer';
import { Text } from '@/src/shared/ui/(layout)/text';
import { useUsers } from '@/src/shared/lib/providers/users-provider/model/users-store';

type Props = {
  projects: TProjectTableElement[];
};

export const TableContent = ({ projects }: Props) => {
  const [projectsState, setProjectsState] = useState<TFormatedProject[]>();
  const { filters } = useFilters();

  const { users } = useUsers();

  useEffect(() => {
    if (filters) {
      let filteredProjects = [...projects];
      const status = filters[EStorageKeys.PROJECTS_STATE] === 'active' ? 'active' : 'ended';

      filteredProjects = filteredProjects.filter((project) => project.status === status);
      const accounter = filters[EStorageKeys.PROJECTS_USER];

      if (accounter !== 'all') {
        filteredProjects = filteredProjects.filter(
          (project) => String(project.accounterId) === accounter,
        );
      }
      setProjectsState(formatProjects(filteredProjects));
    }
  }, [filters]);

  if (!filters) {
    return (
      <Flex className='mt-20 items-center justify-center'>
        <Spinner />
      </Flex>
    );
  }

  return (
    <Flex col className='overflow-y-scroll overflow-x-visible scrollbar-hide pt-10 pb-72' gap={10}>
      {projectsState &&
        projectsState.map((accounter) => (
          <TableList
            key={accounter.accounterId}
            projects={accounter.projects}
            user={getUsername(users, accounter.accounterId)}
          />
        ))}
      {projectsState && !projectsState.length ? <Text opacity={0.5}>Пусто</Text> : ''}
    </Flex>
  );
};
