import React from "react";
import { motion } from "framer-motion";

const PoupupLayout = ({ children }) => {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 overflow-hidden z-50 flex justify-center items-center"
    >
      <div className="bg-gray-100 w-[90%] md:w-[50vw] overflow-y-scroll h-[97svh] md:h-[65vh] lg:h-[80vh] rounded-lg shadow-xl scrollbar-none">
        {children}
      </div>
    </motion.div>
  );
};

export default PoupupLayout;
