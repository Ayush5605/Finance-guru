// src/components/chatbot/ChatWindow.jsx
export default function ChatWindow({ onClose }) {
  return (
    <div
      className="fixed bottom-16 sm:bottom-20 right-2 sm:right-4 md:right-5 w-[calc(100vw-1rem)] max-w-[calc(100vw-1rem)] sm:w-[350px] sm:max-w-[350px] md:w-[380px] md:max-w-[380px] h-[400px] sm:h-[450px] md:h-[500px] z-[1000] bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-xl flex flex-col overflow-hidden"
    >
      <div className="flex items-center justify-between p-3 sm:p-4 border-b border-neutral-200 dark:border-neutral-800">
        <h3 className="text-sm sm:text-base font-semibold text-neutral-800 dark:text-neutral-200">AI Chat Assistant</h3>
        <button 
          onClick={onClose}
          className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 text-lg sm:text-xl font-bold w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          aria-label="Close chat"
        >
          ×
        </button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">AI Chat goes here</p>
      </div>
    </div>
  );
}
