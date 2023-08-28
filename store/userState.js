import { create } from "zustand";

export const userState = create((set) => ({
  user: {
    user_id: "",
    username: "",
    email: "",
  },
  setUser: (data) => set(() => ({ user: data })),
}));
