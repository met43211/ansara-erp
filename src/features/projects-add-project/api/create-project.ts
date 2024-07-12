import { getCookies } from 'cookies-next';
import { OptionsType } from 'cookies-next/lib/types';

import { TFormatedProject } from '../model/formated-project.type';

import axios from '@/src/shared/lib/axios';

export const createProject = async (project: TFormatedProject) => {
  const token = getCookies('access' as OptionsType).access;

  if (!token) throw new Error('Unauthorized');

  return await axios.post('/projects/', project, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
