import { create } from "zustand";
import { persist } from "zustand/middleware";

export const userState = create(
  persist(
    (set) => ({
      user: {
        user_id: "",
        username: "",
        email: "",
      },
      setUser: (data) => set(() => ({ user: data })),
    }),
    {
      name: "userState", // name of the item in the storage (must be unique)
      getStorage: () => sessionStorage, // (optional) by default, 'localStorage' is used
    }
  )
);
