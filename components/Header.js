import Image from "next/image";
import React from "react";
import { FaHotel } from "react-icons/fa";
import { HiMenuAlt2 } from "react-icons/hi";
import { LobbyImage, SeaViewIMage } from "./constants/imageConstant";
import { lodgeState } from "@/store/lodgeState";

const Header = () => {
  const lodgeDetails = lodgeState((state) => state.lodge);

  return (
    <div className="bg-white sticky top-0">
      <div className="py-3 md:py-6 px-6 md:px-10 grid items-center grid-cols-[100px,60px,1fr] lg:grid-cols-[350px,1fr,1fr] shadow-lg">
        <div className="flex gap-4 items-center">
          <FaHotel className="h-7 w-7 md:h-10 md:w-10" />
          <div className="hidden lg:block">
            <p className="text-2xl font-bold">TravelKing</p>
            <p>Lodge Admin Dashboard</p>
          </div>
        </div>

        <div className="flex gap-6">
          <HiMenuAlt2 className="h-7 w-7 md:h-10 lg:w-10 md:hidden lg:block" />
          <p className="text-2xl font-semibold hidden md:block">Dashboard</p>
        </div>

        <div className="flex justify-end">
          <Image
            alt="Picture of the hotel"
            src={lodgeDetails.basicDetails.lodge_image}
            width={60}
            height={60}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
