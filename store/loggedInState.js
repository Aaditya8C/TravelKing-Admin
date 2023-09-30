import { create } from "zustand";
import { persist } from "zustand/middleware";

export const loggedInState = create(
  persist(
    (set) => ({
      isUserLoggedIn: false,
      setIsUserLoggedIn: (data) => set(() => ({ isUserLoggedIn: data })),
    }),
    {
      name: "isUserLoggedIn",
      getStorage: () => sessionStorage,
    }
  )
);
