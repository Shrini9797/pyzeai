import React from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, Zap } from 'lucide-react';
import { Question } from '../../types';

interface PredefinedQuestionsProps {
  questions: Question[];
  onQuestionClick: (question: string) => void;
}

const PredefinedQuestions: React.FC<PredefinedQuestionsProps> = ({ questions, onQuestionClick }) => {
  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Process Efficiency': 'from-blue-500 to-cyan-500',
      'Quality Control': 'from-purple-500 to-pink-500',
      'Workflow Optimization': 'from-green-500 to-emerald-500',
      'Approval Management': 'from-orange-500 to-red-500',
      'Analytics & Reporting': 'from-indigo-500 to-purple-500'
    };
    return colors[category] || 'from-slate-500 to-slate-600';
  };

  return (
    <div className="space-y-2">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-3"
      >
        <h3 className="text-slate-800 font-semibold text-sm mb-0.5">Analysis Options</h3>
        <p className="text-slate-500 text-xs">Choose analysis type</p>
      </motion.div>

      {questions.map((question, index) => (
        <motion.button
          key={question.id}
          initial={{ opacity: 0, x: -10, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ 
            duration: 0.3, 
            delay: index * 0.05,
            type: "spring",
            stiffness: 120
          }}
          onClick={() => onQuestionClick(question.text)}
          className="w-full text-left p-3 bg-white/95 backdrop-blur-sm hover:bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 group relative overflow-hidden"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          {/* Gradient Background */}
          <div className={`absolute inset-0 bg-gradient-to-r ${getCategoryColor(question.category)} opacity-0 group-hover:opacity-5 transition-opacity duration-200`} />
          
          <div className="relative flex items-center space-x-3">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${getCategoryColor(question.category)} flex items-center justify-center text-white text-sm group-hover:scale-105 transition-transform duration-200`}>
                {question.icon}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-slate-900 text-xs font-semibold group-hover:text-blue-600 transition-colors leading-tight">
                  {question.text}
                </h4>
                <div className={`px-1.5 py-0.5 rounded-full text-xs font-medium border ${getImpactColor(question.impact)} ml-2 flex-shrink-0`}>
                  {question.impact}
                </div>
              </div>
              
              <p className="text-slate-600 text-xs mb-2 leading-relaxed">
                {question.description}
              </p>

              {/* Metadata */}
              <div className="flex items-center space-x-2 text-xs text-slate-500">
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{question.estimatedTime}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>{question.category}</span>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </motion.button>
      ))}

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center mt-3"
      >
        <p className="text-xs text-slate-400">
          💡 AI-powered analysis
        </p>
      </motion.div>
    </div>
  );
};

export default PredefinedQuestions;