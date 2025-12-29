export default function ChatButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 sm:bottom-5 md:bottom-6 right-4 sm:right-5 md:right-6 z-[1000] rounded-full w-14 h-14 sm:w-16 sm:h-16 md:w-16 md:h-16 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center text-2xl sm:text-3xl md:text-3xl hover:scale-110 active:scale-95 touch-manipulation min-w-[56px] min-h-[56px]"
      aria-label="Open AI chat"
    >
      🤖
    </button>
  );
}
