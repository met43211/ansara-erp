import { ProjectTasksEditorModal } from './modal';

import { Text } from '@/src/shared/ui/(layout)/text';
import { useModal } from '@/src/shared/ui/modal';

type Props = {
  taskTitle: string;
};

export const Tasks = ({ taskTitle }: Props) => {
  const { setModal } = useModal();

  const handleClick = () => {
    setModal(<ProjectTasksEditorModal />);
  };

  return (
    <button
      className='h-fit text-start w-full min-w-40 self-center'
      type='button'
      onClick={handleClick}
    >
      {taskTitle ? (
        <Text className='w-full line-clamp-2 font-medium ' size={15}>
          {taskTitle}
        </Text>
      ) : (
        <Text className='w-full line-clamp-2 font-medium italic pl-1' opacity={0.5} size={15}>
          Добавьте задачу
        </Text>
      )}
    </button>
  );
};
