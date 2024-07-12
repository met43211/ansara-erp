import { clsx } from 'clsx';

import { Flex } from '@/src/shared/ui/(layout)/flex';
import { Accounting } from '@/src/entities/projects-table-element/accounting';
import { Customer, TProjectTableElement } from '@/src/entities/projects-table-element/customer';
import { Tasks } from '@/src/entities/projects-table-element/tasks';
import { TimeGates } from '@/src/entities/projects-table-element/time-gates';
import { Status } from '@/src/entities/projects-table-element/status';
import { Payment } from '@/src/entities/projects-table-element/payment';

type Props = {
  isEven: boolean;
  project: TProjectTableElement;
};

export const TableElement = ({ isEven, project }: Props) => {
  const containerClassName = clsx('p-4 rounded-2xl min-w-[1264px] w-full', {
    'bg-default': isEven,
  });

  const { customer, timegates, lastAccounting, lastTask, payed, remain, paymentStages } = project;

  return (
    <Flex className={containerClassName} gap={8}>
      <Customer customer={customer} stagesList={paymentStages} />
      <Accounting lastAccounting={lastAccounting} />
      <Tasks taskTitle={lastTask} />
      <TimeGates timeGates={timegates} />
      <Status />
      <Payment payedValue={payed} remainedValue={remain} />
    </Flex>
  );
};
