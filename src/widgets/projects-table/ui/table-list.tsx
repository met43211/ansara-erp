'use client';

import { Reorder } from 'framer-motion';
import { useState } from 'react';

import { TableElement } from './table-element';

import { Text } from '@/src/shared/ui/(layout)/text';
import { Flex } from '@/src/shared/ui/(layout)/flex';
import { TProjectTableElement } from '@/src/entities/projects-table-element/customer';
import { plural } from '@/src/shared/lib/utils/plural';

type Props = {
  user?: string;
  projects: TProjectTableElement[];
};

export const TableList = ({ user, projects }: Props) => {
  const [projectsState, setProjectsState] = useState(projects);

  return (
    <Flex col gap={4}>
      {user && (
        <Text className='text-4xl mt-4' weight={600}>
          {user}{' '}
          <span className='ml-2 text-lg opacity-50'>
            {projects.length}{' '}
            {plural(projects.length, { one: 'проект', some: 'проекта', many: 'проектов' })}
          </span>
        </Text>
      )}

      <Flex col className='mt-2' gap={0}>
        <Reorder.Group axis='y' values={projectsState} onReorder={setProjectsState}>
          {projects.map((project, index) => (
            <Reorder.Item key={project.order} value={project}>
              <TableElement isEven={index % 2 === 0} project={project} />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </Flex>
    </Flex>
  );
};
