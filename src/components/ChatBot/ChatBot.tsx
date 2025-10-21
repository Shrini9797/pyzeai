import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Brain } from 'lucide-react';
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
              className="glass-light rounded-full p-4 shadow-2xl hover:scale-110 transition-transform duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              exit={{ scale: 0 }}
            >
              <MessageCircle className="w-6 h-6 text-facebook-600" />

              {/* Notification Badge */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-facebook-500 to-teal-500 rounded-full animate-pulse"></div>

              {/* Floating Help Text */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 whitespace-nowrap"
              >
                <div className="glass-light rounded-lg px-3 py-2 text-sm text-gray-900">
                  Start AI Analysis
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
            className="fixed bottom-6 right-6 w-96 h-[600px] glass-light rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-facebook-500 to-teal-500 rounded-full flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-900 font-semibold">PyZe AI Assistant</h3>
                  <p className="text-xs text-gray-500">Multi-Agent Analysis</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-900 transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-96">
              {chatState.messages.length === 0 ? (
                <div className="text-center py-8">
                  <Brain className="w-12 h-12 text-facebook-500 mx-auto mb-4" />
                  <h4 className="text-gray-900 font-semibold mb-2">Welcome to PyZe AI</h4>
                  <p className="text-gray-600 text-sm mb-6">
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
                      className="w-full py-3 bg-gradient-to-r from-facebook-500 to-teal-500 text-white rounded-lg font-semibold hover:from-facebook-600 hover:to-teal-600 transition-all duration-300"
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
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about your processes..."
                  className="flex-1 bg-gray-100 text-gray-900 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-facebook-500 text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-facebook-500 to-teal-500 text-white rounded-lg px-4 py-2 hover:from-facebook-600 hover:to-teal-600 transition-all duration-300"
                >
                  <Send className="w-4 h-4" />
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