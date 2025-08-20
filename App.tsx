import React, { useState, useEffect, useRef } from 'react';
import { Message, Sender } from './types';

const uiContent = {
  en: {
    title: "Chattia AI",
    inputPlaceholder: "Type your message...",
  },
  es: {
    title: "Chattia IA",
    inputPlaceholder: "Escribe tu mensaje...",
  }
};

type Language = 'en' | 'es';
type Theme = 'dark' | 'light';

// Main App component for the Chattia chatbot UI
const App: React.FC = () => {
  // State to hold the chat messages.
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! My name is Chattia. How can I help you today?", sender: Sender.Bot }
  ]);
  // State to hold the current user input
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('dark');
  // Ref to automatically scroll the chat window to the bottom
  const chatWindowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.className = '';
    document.body.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light');
  }, [theme]);

  // --- Layer 3: Mock database of default replies ---
  const defaultReplies = new Map([
    ['hi', 'Hello there! It\'s great to chat with you.'],
    ['hello', 'Hello there! It\'s great to chat with you.'],
    ['how are you', 'I\'m doing great, thank you for asking! How about you?'],
    ['what is your name', 'My name is Chattia, and I\'m here to assist you.'],
    ['what can you do', 'I can help with simple questions and complex queries.'],
  ]);

  // --- Layer 2: Meta Firewall and Guardrails Logic ---
  const checkInputSafety = (input: string): boolean => {
    const unsafeKeywords = ['malware', 'exploit', 'unauthorized access', 'data breach'];
    const lowerInput = input.toLowerCase();
    return !unsafeKeywords.some(keyword => lowerInput.includes(keyword));
  };

  // --- Layer 4: Tiny ML Intent Classification ---
  const getTinyMLResponse = (input: string): string | null => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('weather') || lowerInput.includes('forecast')) {
      return "I can check the weather for you. What city are you in?";
    }
    if (lowerInput.includes('help') || lowerInput.includes('support')) {
      return "I can connect you to a support agent. What's the issue?";
    }
    return null;
  };

  // --- Layer 5: Tiny LLM (Simple Content Generation) ---
  const getTinyLLMResponse = (input: string): string | null => {
      const lowerInput = input.toLowerCase();
      if (lowerInput.includes('what is a chatbot')) {
          return "A chatbot is a computer program or an artificial intelligence (AI) that conducts a conversation via auditory or textual methods.";
      }
      if (lowerInput.includes('who created you')) {
          return "I am a prototype AI being built with a multi-layered architecture to demonstrate efficient processing and security.";
      }
      return null;
  };

  // --- Layer 6: Tiny AI (Complex Task Execution) ---
  const getTinyAIResponse = (input: string): string | null => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('convert') && lowerInput.includes('celsius')) {
      const tempMatch = input.match(/(\d+)\s*celsius/i);
      if (tempMatch && tempMatch[1]) {
        const celsius = parseFloat(tempMatch[1]);
        const fahrenheit = (celsius * 9/5) + 32;
        return `${celsius}°C is equal to ${fahrenheit.toFixed(2)}°F.`;
      }
    }
    const mathMatch = lowerInput.match(/what is (\d+)\s*\+\s*(\d+)/i);
    if (mathMatch) {
      const num1 = parseInt(mathMatch[1], 10);
      const num2 = parseInt(mathMatch[2], 10);
      return `The sum of ${num1} and ${num2} is ${num1 + num2}.`;
    }
    return null;
  };

  // --- Layer 7: Larger LLM/ML/AI Backend Call ---
  const callLargeModelAPI = async (input: string): Promise<string> => {
    console.log("Encrypting query and calling the backend...");
    // Mock API call simulation
    return new Promise(resolve => {
      setTimeout(() => {
        const response = `I've processed your complex query using a larger model. The answer to your question "${input}" is in the works!`;
        console.log("Received encrypted response. Decrypting...");
        resolve(response);
      }, 2000); // Simulate a network delay
    });
  };
  
  // useEffect hook to scroll to the bottom whenever messages are updated
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  // Function to determine the bot's response based on the layered logic
  const getBotResponse = async (input: string): Promise<string> => {
    if (!checkInputSafety(input)) {
      return "I'm sorry, that query contains keywords that are not allowed. Please try a different message.";
    }
    const normalizedInput = input.toLowerCase().trim();
    if (defaultReplies.has(normalizedInput)) {
      return defaultReplies.get(normalizedInput)!;
    }
    const tinyMLReply = getTinyMLResponse(input);
    if (tinyMLReply) return tinyMLReply;
    const tinyLLMReply = getTinyLLMResponse(input);
    if (tinyLLMReply) return tinyLLMReply;
    const tinyAIResponse = getTinyAIResponse(input);
    if (tinyAIResponse) return tinyAIResponse;
    return await callLargeModelAPI(input);
  };

  // Function to handle sending a message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = userInput.trim();
    if (text === '' || isLoading) return;

    setMessages(prev => [...prev, { text, sender: Sender.User }]);
    setUserInput('');
    setIsLoading(true);

    const botReplyText = await getBotResponse(text);

    setTimeout(() => {
        setMessages(prev => [...prev, { text: botReplyText, sender: Sender.Bot }]);
        setIsLoading(false);
    }, 700);
  };

  const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
    const isUser = message.sender === Sender.User;
    const userClasses = 'bg-gradient-to-br from-purple-600 to-cyan-600 text-white rounded-br-none';
    const botClasses = theme === 'dark' 
      ? 'bg-slate-800/80 text-slate-200 rounded-bl-none'
      : 'bg-gray-200 text-gray-800 rounded-bl-none';
      
    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
        <div className={`px-4 py-3 rounded-2xl max-w-md shadow-md break-words ${isUser ? userClasses : botClasses}`}>
          {message.text}
        </div>
      </div>
    );
  };

  const TypingIndicator: React.FC = () => {
    const containerClasses = theme === 'dark' ? 'bg-slate-800/80' : 'bg-gray-200';
    const dotClasses = theme === 'dark' ? 'bg-slate-400' : 'bg-gray-400';
    return (
        <div className="flex justify-start">
            <div className={`p-3 rounded-2xl max-w-sm shadow-md rounded-bl-none flex items-center space-x-2 ${containerClasses}`}>
                <span className={`block w-2 h-2 rounded-full animate-pulse-fast [animation-delay:-0.3s] ${dotClasses}`}></span>
                <span className={`block w-2 h-2 rounded-full animate-pulse-fast [animation-delay:-0.15s] ${dotClasses}`}></span>
                <span className={`block w-2 h-2 rounded-full animate-pulse-fast ${dotClasses}`}></span>
            </div>
        </div>
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 font-sans antialiased">
      <div className={`flex flex-col w-full max-w-2xl h-[90vh] backdrop-blur-lg rounded-3xl shadow-2xl shadow-black/50 overflow-hidden border ${theme === 'dark' ? 'bg-slate-900/50 border-slate-700/50' : 'bg-white/70 border-gray-200/80'}`}>
        <div className={`p-4 border-b flex justify-between items-center ${theme === 'dark' ? 'border-slate-700/50' : 'border-gray-200/80'}`}>
            <h1 className={`text-xl font-bold ${theme === 'dark' ? 'text-cyan-400' : 'text-slate-800'}`}>{uiContent[language].title}</h1>
            <div className="flex items-center space-x-3">
                <button
                    onClick={() => setLanguage(prev => prev === 'en' ? 'es' : 'en')}
                    className={`min-w-[48px] text-center px-3 py-1 text-sm font-semibold rounded-full transition-all duration-300 border ${
                        theme === 'dark'
                        ? 'bg-slate-800 border-slate-600/50 text-slate-300 hover:bg-slate-700 hover:border-slate-500'
                        : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                    }`}
                    aria-label={`Switch to ${language === 'en' ? 'Spanish' : 'English'}`}
                >
                    {language.toUpperCase()}
                </button>
                <button
                    onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
                    className={`p-2 rounded-full transition-all duration-300 border ${
                        theme === 'dark'
                        ? 'bg-slate-800 border-slate-600/50 text-slate-300 hover:bg-slate-700 hover:border-slate-500'
                        : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                    }`}
                    aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                >
                    {theme === 'dark' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.95-4.243l-1.591 1.591M5.25 12H3m4.243-4.95l1.591-1.591M12 9a3 3 0 100 6 3 3 0 000-6z" /></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>
                    )}
                </button>
            </div>
        </div>
        
        <div ref={chatWindowRef} className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth">
          {messages.map((msg, index) => <MessageBubble key={index} message={msg} />)}
          {isLoading && <TypingIndicator />}
        </div>

        <form onSubmit={handleSendMessage} className={`p-4 border-t ${theme === 'dark' ? 'bg-black/20 border-slate-700/50' : 'bg-white/50 border-gray-200/80'}`}>
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={uiContent[language].inputPlaceholder}
              className={`flex-1 p-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200 ${theme === 'dark' ? 'bg-slate-800/60 text-white border-slate-600/50' : 'bg-white text-slate-900 border-gray-300 placeholder:text-gray-500'}`}
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-3 rounded-full shadow-lg hover:opacity-90 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Send message"
              disabled={isLoading || userInput.trim() === ''}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;