import { Progress } from '@nextui-org/progress';

import { ProjectNotesModal } from './modal';

import { Flex } from '@/src/shared/ui/(layout)/flex';
import { Text } from '@/src/shared/ui/(layout)/text';
import { useModal } from '@/src/shared/ui/modal';

export const Customer = () => {
  const { setModal } = useModal();

  const handleClick = () => {
    setModal(<ProjectNotesModal />);
  };

  return (
    <button className='w-fit h-fit text-start' type='button' onClick={handleClick}>
      <Flex col className='!w-40 flex-shrink-0 ' gap={2}>
        <Text className='line-clamp-1 font-medium' size={15}>
          Семён Рубин Авто
        </Text>
        <Flex gap={2}>
          <Progress
            aria-label='Прогресс стадии'
            classNames={{ base: 'w-10' }}
            color='success'
            value={100}
          />
          <Progress
            aria-label='Прогресс стадии'
            classNames={{ base: 'w-10', indicator: 'rounded-sm' }}
            value={50}
          />
        </Flex>
      </Flex>
    </button>
  );
};
