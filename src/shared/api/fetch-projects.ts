import { cookies } from 'next/headers';

import axios from '@/src/shared/lib/axios';

export const fetchProjects = async () => {
  try {
    const token = cookies().get('access')?.value;

    const { data } = await axios.get('/projects', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    console.log(error);

    return { error: 'Ошибка загрузки проектов' };
  }
};
