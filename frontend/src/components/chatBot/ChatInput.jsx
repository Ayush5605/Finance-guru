import React from "react";
import { useState } from "react";
import axios from "axios";


export default function ChatInput({setMessages}){
      const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/,"");

    const[text,setText]=useState("");
    const[loading,setLoading]=useState(false);


    const sendMessage=async()=>{
        if(!text.trim() || loading)return;

        const userMessage=text;
        setText("");

        setMessages(prev=>[...prev,{
            sender:"user",
            text:userMessage
        }]);

        setLoading(true);

        setMessages(prev=>[...prev,{
            sender:"ai",
            text:"Analyzing..."
        }]);

        try{
            // Get token from localStorage
            const storedUser = localStorage.getItem("user");
            const token = storedUser ? JSON.parse(storedUser).token : null;

            const res=await axios.post(
                `${API_URL}/api/ai/analyze`,
                {query:userMessage},
                {
                    headers: {
                        Authorization: `bearer ${token}`,
                    },
                }
            );

            setMessages(prev=>[...prev.slice(0,-1),{
                sender:"ai",
                text:res.data.answer
            }]);
        }catch(err){
            setMessages(prev => [
        ...prev.slice(0, -1),
        { sender: "ai", text: "⚠️ Something went wrong. Try again." }
      ]);

        }finally{
            setLoading(false);
        }
    }

     return (
    <div className="p-3 border-t border-neutral-200 dark:border-neutral-800 flex gap-2">
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => e.key === "Enter" && sendMessage()}
        placeholder="Ask about your expenses..."
        className="flex-1 px-3 py-2 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 text-sm outline-none"
      />
      <button
        onClick={sendMessage}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
      >
        ➤
      </button>
    </div>
  );
}



