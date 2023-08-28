import Image from "next/image";
import React from "react";
import { FaHotel } from "react-icons/fa";
import { HiMenuAlt2 } from "react-icons/hi";
import { LobbyImage, SeaViewIMage } from "./constants/imageConstant";

const Header = () => {
  return (
    <div className="bg-white sticky top-0">
      <div className="py-6 px-10 grid grid-cols-[350px,1fr,1fr] shadow-lg">
        <div className="flex gap-4 items-center">
          <FaHotel className="h-10 w-10" />
          <div>
            <p className="text-2xl font-bold">TravelKing</p>
            <p>Hotel Admin Dashboard</p>
          </div>
        </div>

        <div className="flex gap-6">
          <HiMenuAlt2 className="h-10 w-10" />
          <p className="text-2xl font-semibold">Dashboard</p>
        </div>

        <div className="flex justify-end">
          <Image
            alt="Picture of the hotel"
            src={SeaViewIMage}
            width={60}
            height={60}
            className='rounded-lg'
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
