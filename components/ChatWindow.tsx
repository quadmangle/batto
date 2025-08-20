
import React, { useRef, useEffect } from 'react';
import { Message, Sender } from '../types';
import MessageBubble from './MessageBubble';

interface ChatWindowProps {
  messages: Message[];
  userInput: string;
  onUserInput: (input: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, userInput, onUserInput, onSendMessage, isLoading }) => {
  const chatWindowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const TypingIndicator: React.FC = () => (
    <div className="flex justify-start">
      <div className="p-3 rounded-2xl max-w-sm shadow-md bg-slate-700 text-slate-300 rounded-bl-none flex items-center space-x-2">
          <span className="block w-2 h-2 bg-slate-400 rounded-full animate-pulse-fast [animation-delay:-0.3s]"></span>
          <span className="block w-2 h-2 bg-slate-400 rounded-full animate-pulse-fast [animation-delay:-0.15s]"></span>
          <span className="block w-2 h-2 bg-slate-400 rounded-full animate-pulse-fast"></span>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col w-full lg:w-1/2 h-[90vh] bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-slate-700">
      <div className="p-4 border-b border-slate-700 text-center">
        <h1 className="text-xl font-bold text-cyan-400">Chattia AI</h1>
      </div>
      <div ref={chatWindowRef} className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth">
        {messages.map((msg, index) => (
          <MessageBubble key={index} text={msg.text} sender={msg.sender} />
        ))}
        {isLoading && <TypingIndicator />}
      </div>
      <form onSubmit={onSendMessage} className="p-4 bg-slate-900/50 border-t border-slate-700">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={userInput}
            onChange={(e) => onUserInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-3 rounded-full bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-cyan-600 text-white p-3 rounded-full shadow-lg hover:bg-cyan-700 transition-all duration-200 disabled:bg-slate-600 disabled:cursor-not-allowed"
            aria-label="Send message"
            disabled={isLoading || userInput.trim() === ''}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;
