import React from 'react';
import { motion } from 'framer-motion';
import { Zap, DollarSign, Clock, Target } from 'lucide-react';
import { AutomationOpportunity as OpportunityType } from '../../types';

interface AutomationOpportunityProps {
  opportunity: OpportunityType;
}

const AutomationOpportunity: React.FC<AutomationOpportunityProps> = ({ opportunity }) => {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'text-green-700 bg-green-100';
      case 'medium':
        return 'text-orange-700 bg-orange-100';
      default:
        return 'text-blue-700 bg-blue-100';
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'low':
        return 'text-green-700 bg-green-100';
      case 'medium':
        return 'text-orange-700 bg-orange-100';
      default:
        return 'text-red-700 bg-red-100';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="text-gray-900 font-semibold">{opportunity.title}</h4>
            <p className="text-gray-600 text-sm">{opportunity.category}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center text-green-600 font-semibold">
            <DollarSign className="w-4 h-4 mr-1" />
            <span>{opportunity.roi}% ROI</span>
          </div>
        </div>
      </div>

      <p className="text-gray-700 text-sm mb-4 leading-relaxed">
        {opportunity.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-gray-600" />
            <span className="text-xs text-gray-600">Impact:</span>
            <span className={`text-xs px-2 py-1 rounded-full ${getImpactColor(opportunity.impact)}`}>
              {opportunity.impact}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-600" />
            <span className="text-xs text-gray-600">Effort:</span>
            <span className={`text-xs px-2 py-1 rounded-full ${getEffortColor(opportunity.effort)}`}>
              {opportunity.effort}
            </span>
          </div>
        </div>
      </div>

      {/* Priority indicator */}
      <div className="mt-4 pt-4 border-t border-gray-300">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-600">Implementation Priority</span>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <div
                key={star}
                className={`w-2 h-2 rounded-full ${
                  star <= (opportunity.impact === 'high' ? 5 : opportunity.impact === 'medium' ? 3 : 2)
                    ? 'bg-green-500'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AutomationOpportunity;