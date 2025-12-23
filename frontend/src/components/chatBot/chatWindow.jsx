// src/components/chatbot/ChatWindow.jsx
export default function ChatWindow({ onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "90px",
        right: "20px",
        width: "300px",
        height: "400px",
        zIndex: 1000,
        background: "white",
        border: "1px solid #ccc",
      }}
    >
      <button onClick={onClose}>X</button>
      <p>AI Chat goes here</p>
    </div>
  );
}
