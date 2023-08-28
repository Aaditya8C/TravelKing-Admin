import { create } from "zustand";

export const lodgeState = create((set) => ({
  lodge: {
    basicDetails: {
      owner_id: "",
      name: "",
      address: "",
      landmark: "",
      beachPlace: "",
      contact: "",
    },
    facilityDetails: {
      isSwimmingPool: "",
      isParkingAvailable: "",
      total_rooms: "",
    },
  },
  setLodge: (data) => set(() => ({ lodge: data })),
  //   setLodgeBasicDetails: (data) => set(() => ({ basicDetails: data })),
  //   setLodgeFacilityDetails: (data) => set(() => ({ facilityDetails: data })),
}));
