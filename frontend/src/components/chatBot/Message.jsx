import React from "react";


export default function Message({sender,text}){
    const isAI=sender==="ai";

    return(


         <div className={`flex ${isAI ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
          isAI
            ? "bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
            : "bg-blue-600 text-white"
        }`}
      >
        {text}
      </div>
    </div>

    )
}