import { TableContent } from './table-content';
import { TableHeader } from './table-header';

import { Text } from '@/src/shared/ui/(layout)/text';
import { Flex } from '@/src/shared/ui/(layout)/flex';

export const ProjectsTable = ({ data }: any) => {
  return data.error ? (
    <Flex col className='items-center justify-start relative px-4 pt-4 h-[calc(100vh-128px)]'>
      <Text>{data.error}</Text>
    </Flex>
  ) : (
    <Flex col className='items-center justify-start relative px-4 pt-4 h-[calc(100vh-128px)]'>
      <TableHeader />
      <TableContent projects={data} />
    </Flex>
  );
};
