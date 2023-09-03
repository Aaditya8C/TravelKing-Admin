import React from "react";
import { motion } from "framer-motion";
import classNames from "classnames";

const PrimaryBtn = ({ text, children, invert, clickEvent, isDisabled }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1 }}
      onClick={clickEvent}
      disabled={isDisabled}
      className={classNames(
        " rounded-md transition-all duration-200 p-1 px-6 text-lg font-semibold",
        isDisabled ? "opacity-70" : "opacity-100",
        invert
          ? "bg-white text-violet-600 border border-violet-600"
          : "bg-violet-600 text-white focus:bg-violet-400 "
      )}
    >
      {text}
    </motion.button>
  );
};

export default PrimaryBtn;
