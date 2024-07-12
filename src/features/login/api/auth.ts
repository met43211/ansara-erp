import { AxiosError } from 'axios';

import { TAuthData } from '../model/auth-data.type';

import axios from '@/src/shared/lib/axios';

export const Auth = async (authData: TAuthData) => {
  try {
    const { data } = await axios.post('login/', authData);

    return data;
  } catch (error) {
    const err = error as AxiosError;

    if (err.response?.status === 401) {
      throw new Error('Неверный логин или пароль');
    } else {
      throw new Error('Ошибка авторизации');
    }
  }
};
