import { TUser } from '@/src/shared/lib/providers/users-provider/model/user.type';

export const getUsername = (users: TUser[], id: number) => {
  let username = '';

  users.forEach((user) => {
    if (user.id === id) {
      username = user.username;
    }
  });

  return username;
};
