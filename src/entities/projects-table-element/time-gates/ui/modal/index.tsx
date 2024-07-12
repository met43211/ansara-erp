import { DateValue } from '@internationalized/date';
import { useState } from 'react';

import { ValidateTimeGates } from '../../lib/validate-time-gates';

import { ProjectsTimegatesSaveChanges } from './save-changes';

import { DatePickerInput } from '@/src/shared/ui/(inputs)/date-picker';
import { InputLabel } from '@/src/shared/ui/(inputs)/input-label';
import { ModalWrapper } from '@/src/shared/ui/modal';
import { useNotification } from '@/src/shared/ui/notification/model/notification-store';

type Props = { pay: Date; start: Date; end: Date };

export const ProjectTasksTimeGatesModal = ({ pay, start, end }: Props) => {
  const [payDate, setPayDate] = useState<Date | DateValue>(pay);
  const [startDate, setStartDate] = useState<Date | DateValue>(start);
  const [endDate, setEndDate] = useState<Date | DateValue>(end);

  const { addNotification } = useNotification();

  const handleSave = () => {
    const error = ValidateTimeGates(payDate as Date, startDate as Date, endDate as Date);

    if (error) {
      addNotification({ text: error, type: 'danger' });
    } else {
      addNotification({ text: 'Изменения успешно сохранены', type: 'success' });
    }
  };

  return (
    <ModalWrapper
      actionButtons={<ProjectsTimegatesSaveChanges handleSave={handleSave} />}
      title='Временные рамки'
    >
      <div className='grid grid-cols-2 gap-8 pt-4'>
        <InputLabel title='Дата первой оплаты'>
          <DatePickerInput date={payDate as Date} size='lg' onChange={setPayDate} />
        </InputLabel>

        <InputLabel title='Дата запуска первой версии'>
          <DatePickerInput date={startDate as Date} size='lg' onChange={setStartDate} />
        </InputLabel>

        <InputLabel title='Дата завершения окна правок'>
          <DatePickerInput date={endDate as Date} size='lg' onChange={setEndDate} />
        </InputLabel>
      </div>
    </ModalWrapper>
  );
};
