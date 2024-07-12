'use client';

import { Input } from '@nextui-org/input';
import { FormEventHandler, useState } from 'react';
import { PiCaretLeftBold, PiCaretRightBold } from 'react-icons/pi';
import { AnimatePresence, m } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';

import { Auth } from '../api/auth';
import { TAuthData } from '../model/auth-data.type';

import { PasswordInput } from '@/src/shared/ui/(inputs)/password-input';
import { Flex } from '@/src/shared/ui/(layout)/flex';
import { Button } from '@/src/shared/ui/(buttons)/button';
import { useNotification } from '@/src/shared/ui/notification/model/notification-store';
import { TTokens, useAuth } from '@/src/shared/lib/providers/auth-provider';

export const LoginForm = () => {
  const [phase, setPhase] = useState('login');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const { addNotification } = useNotification();
  const [from, setFrom] = useState('');
  const { logIn } = useAuth();

  const auth = useMutation({
    mutationFn: (authData: TAuthData) => Auth(authData),
    onSuccess: (res: TTokens) => {
      logIn(res);
    },
    onError: (err) => {
      addNotification({ text: err.message, type: 'danger' });
    },
  });

  const toPassword = () => {
    if (login.length > 3) {
      setPhase('password');
      setFrom('login');
    } else {
      addNotification({ text: 'Слишком короткий логин', type: 'danger' });
    }
  };

  const handleAuth: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (phase === 'login') {
      toPassword();
    } else {
      if (password.length > 3) {
        auth.mutate({ username: login, password });
      } else {
        addNotification({ text: 'Слишком короткий пароль', type: 'danger' });
      }
    }
  };

  return (
    <form className='relative w-full' onSubmit={handleAuth}>
      <AnimatePresence>
        {phase === 'login' ? (
          <m.div
            key={'login'}
            animate={{ x: 0, opacity: 1 }}
            className='absolute w-full'
            exit={{ x: -300, opacity: 0 }}
            initial={{ x: from ? -300 : 0, opacity: from ? 0 : 1 }}
          >
            <Input
              classNames={{ inputWrapper: '!bg-default' }}
              endContent={
                <Button
                  isIconOnly
                  className='rounded-[12px] -mr-[2px]'
                  color='primary'
                  size='sm'
                  onPress={toPassword}
                >
                  <PiCaretRightBold size={20} />
                </Button>
              }
              placeholder='Введите логин'
              size='lg'
              type='text'
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </m.div>
        ) : (
          <m.div
            key={'password'}
            animate={{ x: 0, opacity: 1 }}
            className='flex flex-col gap-4 absolute w-full'
            exit={{ x: 300, opacity: 0 }}
            initial={{ x: 300, opacity: 0 }}
          >
            <PasswordInput
              classNames={{ inputWrapper: '!bg-default' }}
              placeholder='Введите пароль'
              size='lg'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Flex>
              <Button
                isIconOnly
                onPress={() => {
                  setFrom('password');
                  setPhase('login');
                }}
              >
                <PiCaretLeftBold size={20} />
              </Button>
              <Button
                fullWidth
                color='primary'
                isDisabled={auth.isPending}
                type='submit'
                variant='shadow'
              >
                Авторизоваться
              </Button>
            </Flex>
          </m.div>
        )}
      </AnimatePresence>
    </form>
  );
};
