import React from "react";
import { Outlet } from "react-router-dom";
import Aside from "./Aside";
import Header from "./Header";

const DashboardLayout = () => (
  <div className="flex min-h-screen w-full overflow-x-hidden bg-[#070A14]">
    {/* Sidebar / Mobile Bottom Navigation */}
    <Aside />

    {/* Main Area */}
    <div className="min-w-0 flex-1">
      <Header />

      <main className="min-w-0 pb-20 lg:pb-0">
        <Outlet />
      </main>
    </div>
  </div>
);

export default DashboardLayout;