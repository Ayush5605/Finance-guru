// src/components/chatbot/ChatBot.jsx
import { useContext, useState } from "react";
import ChatButton from "./ChatButton";
import ChatWindow from "./ChatWindow";
import {useUser} from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const{isPremium,loading}=useUser();
  const navigate=useNavigate();


  const handleClick=()=>{
    if(loading)return;

    if(!isPremium){
      navigate("/checkout");
      return;
    }

    setOpen(true);
  }

  return (
    <>
      {open && <ChatWindow onClose={() => setOpen(false)} />}
      <ChatButton onClick={handleClick} />
    </>
  );
}
