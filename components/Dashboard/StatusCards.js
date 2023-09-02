import React from "react";
import { IoBedOutline } from "react-icons/io5";

const StatusCards = ({data}) => {
    const Icon = data.icon;
  return (
    <div className="flex gap-4 p-6 justify-center w-full md:w-fit items-center bg-white rounded-lg transition-all duration-500 hover:shadow-2xl group">
      <div className="p-2 bg-violet-100 group-hover:bg-violet-900 transition-all duration-500 rounded-lg shrink-0">
        <Icon className="w-10 h-10 text-violet-900 group-hover:text-white" />
      </div>
      <div className="flex flex-col justify-center items-center gap-1 shrink-0">
        <p className="text-xl font-bold">{data.value}</p>
        <p className="text-gray-500">{data.heading}</p>
      </div>
    </div>
  );
};

export default StatusCards;
