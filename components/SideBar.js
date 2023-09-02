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

  const [selected, setSelected] = useState("Home");
  const [isTabOpen, setIsTabOpen] = useState(false);

  return (
    <div className="bg-white hidden md:block sticky left-0 bottom-0 z-40  top-[108px] w-fit lg:w-[20vw] h-[calc(100vh-108px)]">
      <div className="flex flex-col justify-center items-center gap-12 py-6 px-4 lg:px-10 w-full text-gray-400">
        {sideBarValues.map((item) => {
          const Icon = item.icon;
          return (
            <div
              className=" flex items-center justify-center gap-4 p-2 w-full font-semibold text-lg lg:cursor-pointer group"
              onClick={() => {
                setSelected(item.name);
                setIsTabOpen(!isTabOpen);
              }}
            >
              <div
                className={classNames(
                  "absolute bg-violet-800 left-0 w-0 h-12 rounded-r-md transition-all duration-500",
                  selected.includes(item.name) && "w-2"
                )}
              />
              <div className="hover:bg-violet-200 p-4 rounded-lg group transition-all duration-300">
              <Icon className="shrink-0 group-hover:text-violet-950 w-8 h-8" />
              </div>
              <p className="shrink-0 transition-all duration-200 hover:text-violet-800 hidden lg:block">
                {item.name}
              </p>
              {/* <div className="flex justify-end w-full">
                <BiSolidRightArrow
                  className={classNames(
                    "shrink-0 h-4 w-4 transition-all duration-300",
                    item.name.includes(selected) && isTabOpen
                      ? "rotate-90 text-violet-800"
                      : "rotate-0"
                  )}
                />
              </div> */}

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
