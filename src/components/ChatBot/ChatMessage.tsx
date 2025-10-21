import React from 'react';
import { motion } from 'framer-motion';
import { Brain, User } from 'lucide-react';
import { Message } from '../../types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.type === 'bot';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} space-x-2`}
    >
      {isBot && (
        <div className="w-8 h-8 bg-gradient-to-r from-facebook-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
          <Brain className="w-4 h-4 text-white" />
        </div>
      )}

      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
          isBot
            ? 'bg-white border border-gray-200 text-gray-900 rounded-bl-sm shadow-sm'
            : 'bg-gradient-to-r from-facebook-500 to-teal-500 text-white rounded-br-sm'
        }`}
      >
        <p className="text-sm leading-relaxed">{message.content}</p>
        <p className={`text-xs opacity-70 mt-1 ${isBot ? 'text-gray-500' : 'text-white'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>

      {!isBot && (
        <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-white" />
        </div>
      )}
    </motion.div>
  );
};

export default ChatMessage;