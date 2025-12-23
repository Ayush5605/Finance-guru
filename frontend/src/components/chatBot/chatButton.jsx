
export default function ChatButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
        borderRadius: "50%",
        width: "56px",
        height: "56px",
      }}
    >
      🤖
    </button>
  );
}
