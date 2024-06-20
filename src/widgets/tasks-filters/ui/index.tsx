import { Divider } from '@nextui-org/divider';

import { TasksFiltersVariants } from '../config/tasks-filters-variants';

import { Flex } from '@/src/shared/ui/(layout)/flex';
import { LocalOptions } from '@/src/shared/ui/local-options';
import { EStorageKeys } from '@/src/shared/ui/local-options/model/options.enum';
import { TasksCreateProject } from '@/src/features/tasks-create-project';

export const TasksFilters = () => {
  return (
    <Flex className='py-4 items-center px-4 overflow-x-scroll scrollbar-hide' tag='aside'>
      <TasksCreateProject />
      <Divider className='w-[2px] h-6 rounded-sm' orientation='vertical' />
      <Flex className='!w-fit' gap={2}>
        <LocalOptions storageKey={EStorageKeys.TASKS_STATE} variants={TasksFiltersVariants} />
      </Flex>
    </Flex>
  );
};
