"use client";
import React from "react";
import { Sidebar,SidebarBody,SidebarLink } from '../ui/sidebar.jsx';
import { useLocation } from "react-router-dom";
import { IconHome,IconWallet,IconUser } from "@tabler/icons-react";
import{cn} from '../../lib/utils.js'

export default function Dashboard({children}){
    const location=useLocation();


    const links=[
        {
            label:"Dashboard",
            href:"/dashboard",
            icon:<IconHome size={18}/>
        },
         {
            label:"Expenses",
            href:"/api/expenses",
            icon:<IconWallet size={18}/>
        },
         {
            label:"Profile",
            href:"/profile",
            icon:<IconUser size={18}/>
        },
    ];
    return(
         <div className="flex w-full h-screen bg-neutral-50 dark:bg-neutral-900">

      
      <Sidebar>
        <SidebarBody>
          <div className="flex flex-col gap-4 mt-10">
            {links.map((link) => (
              <SidebarLink
                key={link.href}
                link={link}
                className={cn(
                  "rounded-md px-2",
                  location.pathname === link.href &&
                    "bg-neutral-200 dark:bg-neutral-700"
                )}
              />
            ))}
          </div>
        </SidebarBody>
      </Sidebar>

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>

    </div>
  );

    }
    
    
