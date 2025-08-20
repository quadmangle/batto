
import React, { useState, useEffect, useCallback } from 'react';
import { Message, Sender, LayerID } from './types';
import ChatWindow from './components/ChatWindow';
import ArchitectureVisualizer from './components/ArchitectureVisualizer';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! My name is Chattia. I'm a multi-layered AI assistant. Ask me anything and watch my internal architecture at work!", sender: Sender.Bot }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeLayer, setActiveLayer] = useState<LayerID | null>(null);

  // --- Layer 3: Mock Google Sheets database of default replies ---
  const defaultReplies = new Map([
    ['hi', 'Hello there! It\'s great to chat with you.'],
    ['hello', 'Hello there! It\'s great to chat with you.'],
    ['how are you', 'I\'m doing great, thank you for asking! How about you?'],
    ['what is your name', 'My name is Chattia, and I\'m here to assist you.'],
    ['what can you do', 'I can help with simple questions and complex queries, and I can show you how I think!'],
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
          return "I am a prototype AI built with a multi-layered architecture to demonstrate efficient processing and security.";
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
    console.log("Encrypting query and calling the Cloudflare Worker backend...");
    // Mock API call simulation. In a real app, this would be a fetch call.
    return new Promise(resolve => {
      setTimeout(() => {
        const response = `I've processed your complex query "${input}" using a larger model. For this demo, I'm simulating that response.`;
        console.log("Received encrypted response. Decrypting...");
        resolve(response);
      }, 1500);
    });
  };
  
  const getBotResponse = useCallback(async (input: string): Promise<{ text: string, layer: LayerID }> => {
    // Layer 2
    if (!checkInputSafety(input)) {
      return { text: "I'm sorry, that query contains keywords that are not allowed. Please try a different message.", layer: LayerID.Firewall };
    }

    // Layer 3
    const normalizedInput = input.toLowerCase().trim();
    if (defaultReplies.has(normalizedInput)) {
      return { text: defaultReplies.get(normalizedInput)!, layer: LayerID.Database };
    }
    
    // Layer 4
    const tinyMLReply = getTinyMLResponse(input);
    if (tinyMLReply) {
      return { text: tinyMLReply, layer: LayerID.TinyML };
    }
    
    // Layer 5
    const tinyLLMReply = getTinyLLMResponse(input);
    if (tinyLLMReply) {
      return { text: tinyLLMReply, layer: LayerID.TinyLLM };
    }

    // Layer 6
    const tinyAIResponse = getTinyAIResponse(input);
    if (tinyAIResponse) {
      return { text: tinyAIResponse, layer: LayerID.TinyAI };
    }

    // Layer 7
    const finalResponse = await callLargeModelAPI(input);
    return { text: finalResponse, layer: LayerID.LargeModel };
  }, [defaultReplies]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = userInput.trim();
    if (text === '' || isLoading) return;

    setMessages(prev => [...prev, { text, sender: Sender.User }]);
    setUserInput('');
    setIsLoading(true);
    setActiveLayer(null);

    // Simulate thinking
    setTimeout(async () => {
      const { text: botReply, layer } = await getBotResponse(text);
      setActiveLayer(layer);
      setIsLoading(false);
      setMessages(prev => [...prev, { text: botReply, sender: Sender.Bot }]);
    }, 500);
  };
  
  useEffect(() => {
    if(activeLayer) {
        const timer = setTimeout(() => setActiveLayer(null), 2500);
        return () => clearTimeout(timer);
    }
  }, [activeLayer]);


  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen p-4 bg-slate-900 font-sans antialiased">
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        <ChatWindow 
          messages={messages}
          userInput={userInput}
          onUserInput={setUserInput}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
        <ArchitectureVisualizer activeLayerId={activeLayer} />
      </div>
    </div>
  );
};

export default App;
