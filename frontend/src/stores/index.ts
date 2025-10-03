import create from "zustand";

type UserState = {
  user: null | { email: string; role: string };
  setUser: (u: any) => void;
};

export const useUserStore = create<UserState>(set => ({
  user: null,
  setUser: user => set({ user })
}));