import { Progress } from '@nextui-org/progress';
import { useEffect, useState } from 'react';

import { Flex } from '@/src/shared/ui/(layout)/flex';
import { CurrencyInput } from '@/src/shared/ui/(inputs)/currency-input';

type Props = {
  payedValue: number;
  remainedValue: number;
};

export const Payment = ({ payedValue, remainedValue }: Props) => {
  const [payed, setPayed] = useState(payedValue);
  const [needPay, setNeedPay] = useState(remainedValue);

  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (needPay === 0) {
      setProgress(100);
    } else {
      setProgress((payed / (needPay + payed)) * 100);
    }
  }, [payed, needPay]);

  return (
    <Flex col className='!w-44 flex-shrink-0 mt-1' gap={2}>
      <Flex className='justify-between' gap={2}>
        <CurrencyInput
          className='bg-transparent outline-none w-1/2 text-sm font-medium'
          setValue={setPayed}
          value={payed}
        />

        <CurrencyInput
          className='bg-transparent outline-none w-1/2 text-sm font-medium text-right'
          setValue={setNeedPay}
          value={needPay}
        />
      </Flex>
      <Flex gap={2}>
        <Progress
          aria-label='Прогресс оплаты'
          color={needPay === 0 ? 'success' : 'primary'}
          size='sm'
          value={progress}
        />
      </Flex>
    </Flex>
  );
};
