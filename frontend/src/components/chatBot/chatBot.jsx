// src/components/chatbot/ChatBot.jsx
import { useState } from "react";
import ChatButton from "./ChatButton";
import ChatWindow from "./ChatWindow";

export default function ChatBot() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <ChatWindow onClose={() => setOpen(false)} />}
      <ChatButton onClick={() => setOpen(true)} />
    </>
  );
}
