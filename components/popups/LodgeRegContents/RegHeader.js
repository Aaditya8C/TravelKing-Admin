import React from "react";
import { motion } from "framer-motion";

const RegHeader = ({ setSelectedTab, selectedTab }) => {
  const registrationTabs = ["Basic Details", "Facility Details"];
  return (
    <div className="bg-blue-100 py-4">
      <ul className="flex justify-evenly items-center">
        {registrationTabs.map((tab, index) => {
          return (
            <li
              key={index}
              // onClick={() => setSelectedTab(index)}
              className="relative w-full text-center"
            >
              <p className="font-semibold text-lg">{tab}</p>
              {selectedTab === index && (
                <motion.div
                  className="absolute inset-x-0 top-10 h-[4px] bg-blue-600"
                  layoutId="underline"
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RegHeader;
