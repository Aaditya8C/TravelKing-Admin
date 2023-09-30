import StatusCards from "@/components/Dashboard/StatusCards";
import ErrorPage from "@/components/ErrorPage";
import Header from "@/components/Header";
import ParentLayout from "@/components/Layouts/ParentLayout";
import { loggedInState } from "@/store/loggedInState";
import React, { useState } from "react";
import { IoBedOutline } from "react-icons/io5";

const dashboard = () => {
  const isUserLoggedIn = loggedInState((state) => state.isUserLoggedIn);
  const statusCardsInfo = [
    {
      icon: IoBedOutline ,
      value: 50,
      heading: "Total Rooms",
    },
    {
      icon: IoBedOutline,
      value: 27,
      heading: "Rooms Engaged",
    },
    {
      icon: IoBedOutline,
      value: 12,
      heading: "Total Bookings",
    },
    {
      icon: IoBedOutline,
      value: 10,
      heading: "Activities Offered",
    },
  ];
  return isUserLoggedIn ?(
    <ParentLayout>
      <div className="p-4 md:p-8 lg:p-14">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 place-items-center">
          {statusCardsInfo.map((item, index) => {
            return <StatusCards data={item} key={index} />;
          })}
        </div>
      </div>
    </ParentLayout>
  ): (
    <ErrorPage/>
  );
};

export default dashboard;
