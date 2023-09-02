import React from "react";
import Header from "../Header";
import SideBar from "../SideBar";

const ParentLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="grid md:grid-cols-[100px,1fr] lg:grid-cols-[310px,1fr]">
        <SideBar />
        {children}
      </main>
    </div>
  );
};

export default ParentLayout;
