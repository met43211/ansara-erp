import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { TUser } from './user.type';

type TUsersStore = {
  users: TUser[];
  setUsers: (users: TUser[]) => void;
};

export const useUsersStore = create<TUsersStore>()(
  devtools(
    immer((set) => ({
      users: [],
      setUsers: (users) =>
        set((state) => {
          state.users = users;
        }),
    })),
  ),
);

export const useUsers = () => useUsersStore((state) => state);
