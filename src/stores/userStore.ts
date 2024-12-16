import { create } from "zustand";

interface User {
  id: number | null;
  nickname: string | null;
}

interface UserState {
  user: User;
  setUser: (user: Partial<User>) => void;
}

const useUserStore = create<UserState>((set) => ({
  user: { id: null, nickname: null },
  setUser: (user: Partial<User>) => set((state) => ({ user: { ...state.user, ...user } })),
}));

export default useUserStore;