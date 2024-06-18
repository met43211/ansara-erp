import { useMask } from '@react-input/mask';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const PhoneInput = ({ ...restProps }: Props) => {
  const inputPhoneRef = useMask({
    mask: '+_ (___) ___-__-__',
    replacement: { _: /\d/ },
  });

  return (
    <input
      className='bg-transparent outline-none'
      {...restProps}
      ref={inputPhoneRef}
      inputMode='numeric'
      placeholder='+7 (999) 999-99-99'
      type='tel'
    />
  );
};
