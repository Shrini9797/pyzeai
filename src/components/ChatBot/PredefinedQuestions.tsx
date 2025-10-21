import React from 'react';
import { motion } from 'framer-motion';

interface Question {
  id: string;
  text: string;
  description: string;
  icon?: string;
}

interface PredefinedQuestionsProps {
  questions: Question[];
  onQuestionClick: (question: string) => void;
}

const PredefinedQuestions: React.FC<PredefinedQuestionsProps> = ({ questions, onQuestionClick }) => {
  return (
    <div className="space-y-2">
      {questions.map((question, index) => (
        <motion.button
          key={question.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          onClick={() => onQuestionClick(question.text)}
          className="w-full text-left p-4 bg-white/90 backdrop-blur-sm hover:bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 group"
        >
          <div className="flex items-start space-x-3">
            {question.icon && (
              <span className="text-2xl group-hover:scale-110 transition-transform">{question.icon}</span>
            )}
            <div className="flex-1">
              <p className="text-slate-900 text-sm font-semibold mb-1 group-hover:text-blue-600 transition-colors">
                {question.text}
              </p>
              <p className="text-slate-500 text-xs">{question.description}</p>
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
};

export default PredefinedQuestions;