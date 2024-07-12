import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { setCookie } from 'cookies-next';

import { TTokens } from './tokens.type';

type TAuthProviderState = {
  isAuth: boolean | null;
  logOut: VoidFunction;
  logIn: (tokens: TTokens) => void;
  setIsAuth: (value: boolean) => void;
};

export const useAuthSore = create<TAuthProviderState>()(
  devtools(
    immer((set) => ({
      isAuth: true,
      logOut: () =>
        set((state) => {
          setCookie('access', '');
          setCookie('refresh', '');
          state.isAuth = false;
        }),
      logIn: (tokens) =>
        set((state) => {
          setCookie('access', tokens.access);
          setCookie('refresh', tokens.refresh);
          state.isAuth = true;
        }),
      setIsAuth: (value) =>
        set((state) => {
          state.isAuth = value;
        }),
    })),
  ),
);

export const useAuth = () => useAuthSore((state) => state);
