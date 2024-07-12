import { Input } from '@nextui-org/input';
import UseKey from 'react-use/lib/component/UseKey';
import { useEffect, useState } from 'react';

import { useAddProject } from '../../model/add-project-store';

import { PhoneInput } from '@/src/shared/ui/(inputs)/phone-input';
import { InputLabel } from '@/src/shared/ui/(inputs)/input-label';
import { CurrencyInput } from '@/src/shared/ui/(inputs)/currency-input';
import { SelectInput } from '@/src/shared/ui/(inputs)/select-input';
import { PasswordInput } from '@/src/shared/ui/(inputs)/password-input';
import { DatePickerInput } from '@/src/shared/ui/(inputs)/date-picker';
import { useUsers } from '@/src/shared/lib/providers/users-provider/model/users-store';

type Props = {
  actionFunc: VoidFunction;
};

export const AddProjectForm = ({ actionFunc }: Props) => {
  const {
    project,
    setName,
    setPhone,
    setLogin,
    setPassword,
    setAccounters,
    setPayed,
    setNeedPay,
    setPayDate,
    setStartDate,
    setEndDate,
    setStages,
  } = useAddProject();
  const { users } = useUsers();
  const [accauntersState, setAccauntersState] = useState<{ id: number; title: string }[]>([]);

  useEffect(() => {
    if (users.length) {
      const accaunters = users
        .filter((user) => user.role === 'accounter')
        .map((accouter) => ({ id: accouter.id, title: accouter.username }));

      setAccauntersState(accaunters);
    }
  }, [users]);

  return (
    <form autoComplete='off' className='grid grid-cols-2 gap-4 gap-y-6 mt-2'>
      <UseKey filter='Enter' fn={actionFunc} />
      <Input
        classNames={{ inputWrapper: '!bg-default' }}
        label='Заказчик'
        labelPlacement='outside'
        placeholder='Имя/Ниша'
        size='lg'
        type='text'
        value={project.name}
        onChange={(e) => setName(e.target.value)}
      />

      <InputLabel title='Телефон'>
        <PhoneInput
          className='w-full bg-default rounded-[14px] h-12 px-2 outline-none shadow-sm'
          value={project.phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </InputLabel>

      <Input
        autoComplete='new-password'
        classNames={{ inputWrapper: '!bg-default' }}
        label='Логин ЛК'
        labelPlacement='outside'
        placeholder='Введите логин'
        size='lg'
        type='text'
        value={project.login}
        onChange={(e) => setLogin(e.target.value)}
      />

      <PasswordInput
        autoComplete='new-password'
        classNames={{ inputWrapper: '!bg-default' }}
        label='Пароль ЛК'
        labelPlacement='outside'
        placeholder='Введите пароль'
        size='lg'
        value={project.password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <InputLabel title='Количество этапов'>
        <SelectInput
          selectedVariants={project.stages}
          size='lg'
          variants={[
            { id: '1', title: '1' },
            { id: '2', title: '2' },
            { id: '3', title: '3' },
            { id: '4', title: '4' },
          ]}
          onSelectionChange={(keys) => setStages(keys)}
        />
      </InputLabel>

      <InputLabel title='Аккаунтер'>
        <SelectInput
          selectedVariants={project.accounters}
          size='lg'
          variants={accauntersState}
          onSelectionChange={(keys) => setAccounters(keys)}
        />
      </InputLabel>

      <InputLabel title='Оплачено'>
        <CurrencyInput setValue={setPayed} value={project.payed} />
      </InputLabel>

      <InputLabel title='Осталось'>
        <CurrencyInput setValue={setNeedPay} value={project.needPay} />
      </InputLabel>

      <InputLabel title='Дата первой оплаты'>
        <DatePickerInput date={project.payDate as Date} size='lg' onChange={setPayDate} />
      </InputLabel>

      <InputLabel title='Дата запуска первой версии'>
        <DatePickerInput date={project.startDate as Date} size='lg' onChange={setStartDate} />
      </InputLabel>

      <InputLabel title='Дата завершения окна правок'>
        <DatePickerInput date={project.endDate as Date} size='lg' onChange={setEndDate} />
      </InputLabel>
    </form>
  );
};
