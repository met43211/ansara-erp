'use client';

import { Divider } from '@nextui-org/divider';
import { ReactNode, useEffect, useState } from 'react';

import { TaskStateFilters } from '../config/filters';

import { Flex } from '@/src/shared/ui/(layout)/flex';
import { LocalOptions } from '@/src/shared/ui/local-options';
import { EStorageKeys } from '@/src/shared/ui/local-options/model/options.enum';
import { TUser } from '@/src/shared/lib/providers/users-provider/model/user.type';
import { useUsers } from '@/src/shared/lib/providers/users-provider/model/users-store';

type Props = {
  addProjectButton: ReactNode;
};

export const ProjectsFilters = ({ addProjectButton }: Props) => {
  const { users } = useUsers();
  const [accauntersState, setAccauntersState] = useState([{ id: 'all', name: 'Все' }]);

  useEffect(() => {
    if (users.length) {
      const accaunters = [{ id: 'all', name: 'Все' }];

      users.forEach((user: TUser) => {
        if (user.role === 'accounter') {
          accaunters.push({ id: String(user.id), name: user.username });
        }
      });
      setAccauntersState(accaunters);
    }
  }, [users]);

  return (
    <Flex className='py-4 items-center px-4 overflow-x-scroll scrollbar-hide' tag='aside'>
      {addProjectButton}

      <Divider className='w-[2px] h-6 rounded-sm' orientation='vertical' />

      <LocalOptions storageKey={EStorageKeys.PROJECTS_STATE} variants={TaskStateFilters} />

      <Divider className='w-[2px] h-6 rounded-sm' orientation='vertical' />

      <LocalOptions storageKey={EStorageKeys.PROJECTS_USER} variants={accauntersState} />
    </Flex>
  );
};
