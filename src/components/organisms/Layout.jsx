import React from "react";
import { Outlet } from "react-router-dom";
import BottomTabBar from "@/components/molecules/BottomTabBar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="min-h-screen">
        <Outlet />
      </main>
      <BottomTabBar />
    </div>
  );
};

export default Layout;