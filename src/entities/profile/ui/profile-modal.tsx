import { Avatar } from '@nextui-org/avatar';
import { m } from 'framer-motion';
import { PiUserBold } from 'react-icons/pi';
import { Divider } from '@nextui-org/divider';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

import { TDecodedToken } from '../model/decoded-toke.type';

import { Flex } from '@/src/shared/ui/(layout)/flex';
import { Text } from '@/src/shared/ui/(layout)/text';
import { Button } from '@/src/shared/ui/(buttons)/button';
import { useAuth } from '@/src/shared/lib/providers/auth-provider';

type Props = {
  onClose: VoidFunction;
  profileFeatures: (closeModal: VoidFunction) => React.ReactNode;
  username: string;
  role: string;
};

export const ProfileModal = ({ onClose, profileFeatures, username, role }: Props) => {
  const { logOut } = useAuth();
  const [decodedToken, setDecodedToken] = useState<TDecodedToken | null>(null);

  useEffect(() => {
    const token = String(getCookie('access'));

    try {
      const decoded: TDecodedToken = jwtDecode(token);

      setDecodedToken(decoded);
    } catch (error) {
      return;
    }
  }, []);

  return (
    <>
      <m.aside
        animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
        className='w-80 bg-black absolute top-0 right-0 rounded-3xl border-1 border-white/10 z-50 origin-top-right p-6 flex flex-col gap-4'
        exit={{ scale: 0, opacity: 0, filter: 'blur(24px)' }}
        initial={{ scale: 0, opacity: 0, filter: 'blur(24px)' }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      >
        <Flex className='items-center' tag='article'>
          <Avatar
            className='w-20 h-20 flex-shrink-0 border-1 border-white/10 bg-zinc-800'
            fallback={<PiUserBold className='opacity-40 text-white' size={32} />}
            src={decodedToken?.avatar_url || ''}
          />
          <Flex col gap={0}>
            <Text className='text-white font-semibold' size={20}>
              {username}
            </Text>
            <Text className='text-white font-medium' opacity={0.5} size={16}>
              {role}
            </Text>
          </Flex>
        </Flex>
        {profileFeatures(onClose)}
        <Divider className='bg-zinc-800' />
        <Button streched className=' bg-zinc-800 text-danger' onPress={logOut}>
          Выйти
        </Button>
      </m.aside>
      <m.button
        animate={{ opacity: 1 }}
        className='fixed inset-0 bg-black/50 z-40'
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        onClick={onClose}
      />
    </>
  );
};
