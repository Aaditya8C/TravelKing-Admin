import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { MdBedroomParent } from "react-icons/md";
import { BiSolidPackage, BiSolidRightArrow } from "react-icons/bi";
import { TbScubaMask } from "react-icons/tb";
import classNames from "classnames";

const SideBar = () => {
  const sideBarValues = [
    {
      name: "Home",
      icon: FaHome,
    },
    {
      name: "Rooms",
      icon: MdBedroomParent,
    },
    {
      name: "Packages",
      icon: BiSolidPackage,
    },
    {
      name: "Activities",
      icon: TbScubaMask,
    },
  ];

  const [selected, setSelected] = useState("");
  const [isTabOpen, setIsTabOpen] = useState(false);

  return (
    <div className="bg-white absolute left-0 bottom-0 top-[108px] md:w-[20%] h-[calc[100vh-108px]]">
      <div className="flex flex-col justify-center items-center gap-12 py-6 px-10 w-full text-gray-400">
        {sideBarValues.map((sideBarValue) => {
          const Icon = sideBarValue.icon;
          return (
            <div
              className=" flex items-center justify-center gap-4 p-2 w-full font-semibold text-lg lg:cursor-pointer group"
              onClick={() => {
                setSelected(sideBarValue.name);
                setIsTabOpen(!isTabOpen);
              }}
            >
              <div className="absolute group-hover:w-2 bg-violet-800 left-0 w-0 h-10 rounded-r-md transition-all duration-300" />
              <Icon className="shrink-0" />
              <p className="shrink-0 hover:text-violet-800 transition-all duration-200">
                {sideBarValue.name}
              </p>
              <div className="flex justify-end w-full">
                <BiSolidRightArrow
                  className={classNames(
                    "shrink-0 h-4 w-4 transition-all duration-300",
                    sideBarValue.name.includes(selected) && isTabOpen
                      ? "rotate-90 text-violet-800"
                      : "rotate-0"
                  )}
                />
              </div>

              {/* <div className="absolute top-20 grid gap-3">
                {sideBarValues.map((item) => (
                  <div className="flex justify-between">
                    <p>----</p>
                    <p>Create</p>
                  </div>
                ))}
              </div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
