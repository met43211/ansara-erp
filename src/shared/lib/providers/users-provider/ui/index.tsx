import { useEffect } from 'react';

import { useAuth } from '../../auth-provider';
import { fetchUsers } from '../api/fetch-users';
import { useUsers } from '../model/users-store';

type Props = {
  children: React.ReactNode;
};

export const UsersProvider = ({ children }: Props) => {
  const { isAuth } = useAuth();
  const { setUsers } = useUsers();

  const fetch = async () => {
    const res = await fetchUsers();

    if (!res.isError) {
      setUsers(res);
    }
  };

  useEffect(() => {
    if (isAuth) {
      fetch();
    }
  }, [isAuth]);

  return <>{children}</>;
};
