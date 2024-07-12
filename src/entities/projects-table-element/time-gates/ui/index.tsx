import { Progress } from '@nextui-org/progress';

import { getDateProgress } from '../lib/get-date-progress';

import { ProjectTasksTimeGatesModal } from './modal';

import { Flex } from '@/src/shared/ui/(layout)/flex';
import { Text } from '@/src/shared/ui/(layout)/text';
import { useModal } from '@/src/shared/ui/modal';
import { formatDate } from '@/src/shared/lib/utils/format-date';

type Props = {
  timeGates: {
    first_payment: string;
    start_date: string;
    end_date: string;
  };
};

export const TimeGates = ({ timeGates }: Props) => {
  const { setModal } = useModal();

  const pay = new Date(timeGates.first_payment);
  const start = new Date(timeGates.start_date);
  const end = new Date(timeGates.end_date);

  const progress1 = getDateProgress(pay, start);
  const progress2 = getDateProgress(start, end);

  return (
    <button
      onClick={() => setModal(<ProjectTasksTimeGatesModal end={end} pay={pay} start={start} />)}
    >
      <Flex col className='!w-64 flex-shrink-0' gap={1}>
        <Flex className='justify-between' gap={2}>
          <Text size={14}>{formatDate(pay).slice(3)}</Text>
          <Text size={14}>{formatDate(start).slice(3)}</Text>
          <Text size={14}>{formatDate(end).slice(3)}</Text>
        </Flex>
        <Flex gap={2}>
          <Progress
            aria-label='Прогресс времени'
            color={progress1 === 100 ? 'success' : 'primary'}
            size='sm'
            value={getDateProgress(pay, start)}
          />
          <Progress
            aria-label='Прогресс времени'
            color={progress2 === 100 ? 'success' : 'primary'}
            size='sm'
            value={getDateProgress(start, end)}
          />
        </Flex>
      </Flex>
    </button>
  );
};
