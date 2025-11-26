import React from "react";
import { Boxes } from "../components/ui/background-boxes";
export default function DashboardPage(){

     return (
    <div className="relative flex h-screen w-full overflow-hidden">
         <Boxes className="absolute inset-0 opacity-[0.50] pointer-events-auto" />
        <div className="relative z-10 p-6">
      <h1 className="text-3xl font-bold text-neutral-50">Dashboard</h1>
      <p className="text-neutral-300 mt-2">Welcome to your Finance Dashboard.</p>
      </div>
    </div>

  );

}

