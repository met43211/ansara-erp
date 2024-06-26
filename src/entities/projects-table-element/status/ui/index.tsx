import { ProjectTasksStatusModal } from './modal';

import { Text } from '@/src/shared/ui/(layout)/text';
import { useModal } from '@/src/shared/ui/modal';

export const Status = () => {
  const { setModal } = useModal();

  return (
    <button className='w-full' type='button' onClick={() => setModal(<ProjectTasksStatusModal />)}>
      <Text className='w-full line-clamp-2 font-medium min-w-40 text-start' size={15}>
        Пример отображаемого статуса в ЛК. Текст должен показываться максимум в 2 строчки
      </Text>
    </button>
  );
};
