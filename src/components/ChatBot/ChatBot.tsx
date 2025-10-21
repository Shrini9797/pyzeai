import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Mic, Paperclip, RefreshCw } from 'lucide-react';
import { Message, ChatState } from '../../types';
import { predefinedQuestions } from '../../services/mockData';
import { useAppContext } from '../../App';
import ChatMessage from './ChatMessage';
import PredefinedQuestions from './PredefinedQuestions';
import AgentProcessing from '../Agents/AgentProcessing';

const ChatBot: React.FC = () => {
  const { setShowReport, setSelectedQuestion } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isProcessing: false,
    agents: [],
    currentStep: 0,
    showReport: false
  });
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [chatState.messages]);

  const addMessage = (content: string, type: 'user' | 'bot') => {
    const message: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date()
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, message]
    }));
  };

  const handleQuestionClick = (question: string) => {
    addMessage(question, 'user');
    setSelectedQuestion(question);

    // Start processing after user question
    setTimeout(() => {
      addMessage('Starting multi-agent analysis...', 'bot');
      setChatState(prev => ({
        ...prev,
        isProcessing: true
      }));
    }, 500);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      addMessage(inputValue, 'user');
      setSelectedQuestion(inputValue);
      setInputValue('');

      // Simulate bot response
      setTimeout(() => {
        addMessage('I understand your question. Let me start the analysis process...', 'bot');
        setChatState(prev => ({
          ...prev,
          isProcessing: true
        }));
      }, 1000);
    }
  };

  const handleProcessingComplete = () => {
    setChatState(prev => ({
      ...prev,
      isProcessing: false
    }));

    addMessage('Analysis complete! I\'ve identified key patterns and automation opportunities. Click "View Detailed Report" to see comprehensive insights.', 'bot');
  };

  const handleRefresh = () => {
    setChatState({
      messages: [],
      isProcessing: false,
      agents: [],
      currentStep: 0,
      showReport: false
    });
    setInputValue('');
    setSelectedQuestion('');
  };

  return (
    <>
      {/* Chat Bubble */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              onClick={() => setIsOpen(true)}
              className="bg-white/95 backdrop-blur-xl rounded-full p-5 shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 border border-white/50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              exit={{ scale: 0 }}
            >
              <MessageCircle className="w-7 h-7 text-blue-600" />

              {/* Notification Badge */}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse"></div>

              {/* Floating Help Text */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute right-full mr-4 top-1/2 transform -translate-y-1/2 whitespace-nowrap"
              >
                <div className="bg-white/95 backdrop-blur-xl rounded-xl px-4 py-2 text-sm text-slate-700 font-medium shadow-lg border border-white/50">
                  AI Assistant
                </div>
              </motion.div>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 400, y: 100 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 400, y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 w-[420px] h-[680px] bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl z-50 overflow-hidden border border-white/60"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-200/50 bg-gradient-to-r from-blue-50/50 to-cyan-50/50">
              <div className="flex items-center space-x-3">
                <div>
                  <h3 className="text-slate-900 font-bold text-base">AI Assistant</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <p className="text-xs text-slate-500">Online</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleRefresh}
                  className="text-slate-400 hover:text-slate-700 transition-colors bg-white/50 hover:bg-white rounded-xl p-2"
                  title="Refresh chat"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-slate-700 transition-colors bg-white/50 hover:bg-white rounded-xl p-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 h-[480px] bg-gradient-to-b from-transparent to-blue-50/20">
              {chatState.messages.length === 0 ? (
                <div className="text-center py-8">
                  <h4 className="text-slate-900 font-bold text-lg mb-2">Welcome to PyZe AI</h4>
                  <p className="text-slate-600 text-sm mb-6 px-4">
                    I can help you analyze workflow patterns and identify automation opportunities.
                  </p>
                  <PredefinedQuestions
                    questions={predefinedQuestions}
                    onQuestionClick={handleQuestionClick}
                  />
                </div>
              ) : (
                <>
                  {chatState.messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}

                  {chatState.isProcessing && (
                    <AgentProcessing onComplete={handleProcessingComplete} />
                  )}

                  {!chatState.isProcessing && chatState.messages.length > 2 && (
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                      onClick={() => setShowReport(true)}
                    >
                      📊 View Detailed Report
                    </motion.button>
                  )}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-5 border-t border-slate-200/50 bg-white/80 backdrop-blur-xl">
              <div className="flex items-center space-x-2">
                <button className="p-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
                  <Paperclip className="w-5 h-5 text-slate-600" />
                </button>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Enter Task for AI Assistant"
                  className="flex-1 bg-slate-100 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm placeholder-slate-500"
                />
                <button className="p-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
                  <Mic className="w-5 h-5 text-slate-600" />
                </button>
                <button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl p-3 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                  disabled={!inputValue.trim()}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;