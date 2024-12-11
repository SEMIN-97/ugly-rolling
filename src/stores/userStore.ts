import { create } from "zustand";

interface UserState {
  id: number | null;
  setId: (id: number) => void;
}

const useUserStore = create<UserState>((set) => ({
  id: null,
  setId: (id: number) => set({ id })
}));

export default useUserStore;