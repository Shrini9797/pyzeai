import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, User } from 'lucide-react';
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
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
          <MessageSquare className="w-4 h-4 text-white" />
        </div>
      )}

      <div
        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
          isBot
            ? 'bg-white/90 border border-slate-200 text-slate-900 rounded-tl-sm shadow-sm'
            : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-br-sm shadow-md'
        }`}
      >
        <p className="text-sm leading-relaxed">{message.content}</p>
        <p className={`text-xs opacity-70 mt-1 ${isBot ? 'text-slate-500' : 'text-white'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>

      {!isBot && (
        <div className="w-8 h-8 bg-gradient-to-r from-slate-500 to-slate-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
          <User className="w-4 h-4 text-white" />
        </div>
      )}
    </motion.div>
  );
};

export default ChatMessage;