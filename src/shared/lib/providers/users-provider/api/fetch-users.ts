import { getCookie } from 'cookies-next';

import axios from '@/src/shared/lib/axios';

export const fetchUsers = async () => {
  try {
    const token = getCookie('access');

    const { data } = await axios.get('/users', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    return { isError: true };
  }
};
