// src/components/chatbot/ChatBot.jsx
import { useState } from "react";
import ChatButton from "./ChatButton";
import ChatWindow from "./ChatWindow";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const { isPremium, loading } = useUser();
  const navigate = useNavigate();

  const handleClick = () => {
    // Wait for user data to load
    if (loading) return;

    // If premium is false, redirect user to checkout
    if (isPremium === false) {
      navigate("/checkout");
      return;
    }


    if(isPremium===true){
      setOpen(true);

    }

    // If premium is true, open chat bot
    
  };

  return (
    <>
      {open && <ChatWindow onClose={() => setOpen(false)} />}
      <ChatButton onClick={handleClick} />
    </>
  );
}
