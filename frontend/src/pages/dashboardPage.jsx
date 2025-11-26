import React from "react";
import { BackgroundBeamsWithCollision } from "../components/ui/background-beams-with-collision";
export default function DashboardPage(){

     return (
    <div className="w-full h-full">
         <BackgroundBeamsWithCollision className="absolute inset-0 opacity-[0.50] pointer-events-none" />
        <div className="relative z-10 p-6">
      <h1 className="text-3xl font-bold text-neutral-50">Dashboard</h1>
      <p className="text-neutral-300 mt-2">Welcome to your Finance Dashboard.</p>
      </div>
    </div>

  );

}

