import { MouseEventHandler, useState } from 'react';

import { TStages } from '../model/stages.type';

import { ProjectNotesModal } from './modal';
import { ProgeressBar } from './progress-bar';

import { Flex } from '@/src/shared/ui/(layout)/flex';
import { Text } from '@/src/shared/ui/(layout)/text';
import { useModal } from '@/src/shared/ui/modal';

type Props = {
  stagesList: TStages[];
  customer: string;
};

export const Customer = ({ stagesList, customer }: Props) => {
  const [stages, setStages] = useState(stagesList);
  const { setModal } = useModal();

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    setModal(<ProjectNotesModal />);
  };

  return (
    <button
      className={`w-fit h-fit text-start ${!stages.length && 'self-center'}`}
      type='button'
      onClick={handleClick}
    >
      <Flex col className='!w-40 flex-shrink-0 ' gap={2}>
        <Text className='line-clamp-1 font-medium' size={15}>
          {customer}
        </Text>
        <Flex gap={2}>
          {stages.map((stage, index) => (
            <ProgeressBar
              key={stage.id}
              index={index}
              setStages={setStages}
              stage={stage}
              stages={stages}
            />
          ))}
        </Flex>
      </Flex>
    </button>
  );
};
