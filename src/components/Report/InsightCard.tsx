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
        return 'border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100';
      case 'important':
        return 'border-cyan-200 bg-gradient-to-br from-cyan-50 to-cyan-100';
      default:
        return 'border-slate-200 bg-gradient-to-br from-white to-slate-50';
    }
  };

  const getTextColors = () => {
    switch (insight.importance) {
      case 'critical':
        return {
          title: 'text-blue-900',
          value: 'text-blue-900',
          description: 'text-blue-700',
          badge: 'bg-blue-200 text-blue-900'
        };
      case 'important':
        return {
          title: 'text-cyan-900',
          value: 'text-cyan-900',
          description: 'text-cyan-700',
          badge: 'bg-cyan-200 text-cyan-900'
        };
      default:
        return {
          title: 'text-slate-800',
          value: 'text-slate-900',
          description: 'text-slate-700',
          badge: 'bg-slate-100 text-slate-900'
        };
    }
  };

  const textColors = getTextColors();

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      className={`rounded-2xl p-5 border shadow-md hover:shadow-lg transition-all ${getImportanceColor()}`}
    >
      <div className="flex items-start justify-between mb-3">
        <h4 className={`${textColors.title} font-bold text-sm`}>{insight.title}</h4>
        {getTrendIcon()}
      </div>

      <div className={`text-3xl font-bold ${textColors.value} mb-2`}>{insight.value}</div>

      <p className={`${textColors.description} text-xs leading-relaxed mb-3`}>{insight.description}</p>

      <div className="mt-2">
        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-lg ${textColors.badge}`}>
          {insight.importance}
        </span>
      </div>
    </motion.div>
  );
};

export default InsightCard;