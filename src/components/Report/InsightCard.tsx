import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Insight } from '../../types';

interface InsightCardProps {
  insight: Insight;
}

const InsightCard: React.FC<InsightCardProps> = ({ insight }) => {
  const getTrendIcon = () => {
    switch (insight.trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getImportanceColor = () => {
    switch (insight.importance) {
      case 'critical':
        return 'border-facebook-200 bg-gradient-to-br from-facebook-50 to-facebook-100';
      case 'important':
        return 'border-teal-200 bg-gradient-to-br from-teal-50 to-teal-100';
      default:
        return 'border-facebook-200 bg-gradient-to-br from-facebook-50 to-teal-50';
    }
  };

  const getTextColors = () => {
    switch (insight.importance) {
      case 'critical':
        return {
          title: 'text-facebook-900',
          value: 'text-facebook-900',
          description: 'text-facebook-700',
          badge: 'bg-facebook-200 text-facebook-900'
        };
      case 'important':
        return {
          title: 'text-teal-900',
          value: 'text-teal-900',
          description: 'text-teal-700',
          badge: 'bg-teal-200 text-teal-900'
        };
      default:
        return {
          title: 'text-facebook-800',
          value: 'text-facebook-900',
          description: 'text-gray-700',
          badge: 'bg-teal-100 text-teal-900'
        };
    }
  };

  const textColors = getTextColors();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`rounded-lg p-4 border ${getImportanceColor()}`}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className={`${textColors.title} font-semibold text-sm`}>{insight.title}</h4>
        {getTrendIcon()}
      </div>

      <div className={`text-2xl font-bold ${textColors.value} mb-1`}>{insight.value}</div>

      <p className={`${textColors.description} text-xs leading-relaxed`}>{insight.description}</p>

      <div className="mt-2">
        <span className={`inline-block px-2 py-1 text-xs rounded-full ${textColors.badge}`}>
          {insight.importance}
        </span>
      </div>
    </motion.div>
  );
};

export default InsightCard;