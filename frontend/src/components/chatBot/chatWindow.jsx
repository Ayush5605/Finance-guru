// src/components/chatbot/ChatWindow.jsx

import { useEffect,useState,useRef } from "react";
import Message from "./Message";
import ChatInput from "./ChatInput";

export default function ChatWindow({ onClose }) {
  const[messages,setMessages]=useState([
    {
      sender:"ai",
      text:"👋 Hi! Ask me anything about your expenses."
    }
  ])

  const bottomRef=useRef(null);

  useEffect(()=>{
    bottomRef.current?.scrollIntoView({behavir:"smooth"});
  },[messages])
  return (

    <div className="fixed bottom-16 sm:bottom-20 right-2 sm:right-4 md:right-5 w-[calc(100vw-1rem)] sm:w-[350px] md:w-[380px] h-[400px] sm:h-[450px] md:h-[500px] z-[1000] bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-xl flex flex-col overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-neutral-200 dark:border-neutral-800">
        <h3 className="font-semibold text-neutral-800 dark:text-neutral-200">
          AI Chat Assistant
        </h3>
        <button onClick={onClose} className="text-lg font-bold">×</button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 space-y-2 overflow-y-auto">
        {messages.map((msg, idx) => (
          <Message key={idx} {...msg} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <ChatInput setMessages={setMessages} />
    </div>
    
  );
}
