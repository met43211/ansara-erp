import { TProjectTableElement } from '../../customer';

import { ProjectAccountingModal } from './modal';

import { formatDate } from '@/src/shared/lib/utils/format-date';
import { Flex } from '@/src/shared/ui/(layout)/flex';
import { Text } from '@/src/shared/ui/(layout)/text';
import { useModal } from '@/src/shared/ui/modal';
import { formatTime } from '@/src/shared/lib/utils/format-time';

type Props = {
  lastAccounting: TProjectTableElement['lastAccounting'];
};

export const Accounting = ({ lastAccounting }: Props) => {
  const { setModal } = useModal();

  const handleClick = () => {
    setModal(<ProjectAccountingModal />);
  };

  const date = new Date(lastAccounting.date);
  const time = date.getTime();

  return (
    <button
      className='w-full min-w-36 h-fit text-start self-center'
      type='button'
      onClick={handleClick}
    >
      {lastAccounting.status ? (
        <Flex col gap={0}>
          <Text className='w-full font-medium' opacity={0.5} size={15}>
            {formatDate(date) + ', ' + formatTime(time)}
          </Text>
          <Text className='w-full line-clamp-1 font-medium' size={15}>
            {lastAccounting.status}
          </Text>
        </Flex>
      ) : (
        <Flex gap={0}>
          <Text className='w-full line-clamp-1 font-medium p-1 italic' opacity={0.5} size={15}>
            Добавьте результат аккаунтинга
          </Text>
        </Flex>
      )}
    </button>
  );
};
