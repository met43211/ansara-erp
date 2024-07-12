'use client';

import * as React from 'react';
import { NextUIProvider } from '@nextui-org/system';
import { useRouter } from 'next/navigation';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';
import { LazyMotion } from 'framer-motion';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { FiltersProvider } from '@/src/shared/lib/providers/filters-provider';
import { AuthProvider } from '@/src/shared/lib/providers/auth-provider';
import { UsersProvider } from '@/src/shared/lib/providers/users-provider';

type Props = React.PropsWithChildren<{ themeProps?: ThemeProviderProps }>;

const loadFeatures = () => import('@/src/shared/model/dom-max').then((res) => res.domMax);

export function Providers({ children, themeProps }: Props) {
  const router = useRouter();
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <LazyMotion features={loadFeatures}>
      <NextUIProvider locale='ru-RU' navigate={router.push}>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <UsersProvider>
              <NextThemesProvider {...themeProps}>
                <FiltersProvider>{children}</FiltersProvider>
              </NextThemesProvider>
            </UsersProvider>
          </QueryClientProvider>
        </AuthProvider>
      </NextUIProvider>
    </LazyMotion>
  );
}
