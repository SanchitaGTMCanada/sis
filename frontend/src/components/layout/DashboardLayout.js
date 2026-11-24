
"use client";

import { useState } from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#28212D]">

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-h-screen lg:pl-[250px]">

        <Header
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="mx-auto min-h-[calc(100vh-150px)] w-full max-w-[1700px] p-5 sm:p-7 lg:p-9">
          {children}
        </main>

        <Footer />

      </div>
    </div>
  );
}
