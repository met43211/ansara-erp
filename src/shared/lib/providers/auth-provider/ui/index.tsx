'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';

import { useAuth } from '../model/auth-store';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { isAuth, setIsAuth } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const access = getCookie('access');
    const refresh = getCookie('access');

    if (access && refresh) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  useEffect(() => {
    if (isAuth) {
      if (pathname === '/login') {
        router.push('/');
      }
    } else router.push('/login');
  }, [isAuth]);

  return <>{children}</>;
};
