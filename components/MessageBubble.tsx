
import React from 'react';
import { Sender } from '../types';

interface MessageBubbleProps {
  text: string;
  sender: Sender;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ text, sender }) => {
  const isUser = sender === Sender.User;
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`
        px-4 py-3 rounded-2xl max-w-md shadow-md break-words
        ${isUser
          ? 'bg-gradient-to-br from-purple-600 to-cyan-600 text-white rounded-br-none'
          : 'bg-slate-800/80 text-slate-200 rounded-bl-none'
        }
      `}>
        {text}
      </div>
    </div>
  );
};

export default MessageBubble;
