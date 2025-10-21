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
      whileHover={{ scale: 1.02, y: -4 }}
      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-md">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="text-slate-900 font-bold">{opportunity.title}</h4>
            <p className="text-slate-600 text-sm">{opportunity.category}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center text-green-600 font-bold bg-green-50 px-3 py-1 rounded-lg">
            <DollarSign className="w-4 h-4 mr-1" />
            <span>{opportunity.roi}%</span>
          </div>
        </div>
      </div>

      <p className="text-slate-700 text-sm mb-5 leading-relaxed">
        {opportunity.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-slate-600" />
            <span className="text-xs text-slate-600">Impact:</span>
            <span className={`text-xs px-3 py-1 rounded-lg font-semibold ${getImpactColor(opportunity.impact)}`}>
              {opportunity.impact}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-slate-600" />
            <span className="text-xs text-slate-600">Effort:</span>
            <span className={`text-xs px-3 py-1 rounded-lg font-semibold ${getEffortColor(opportunity.effort)}`}>
              {opportunity.effort}
            </span>
          </div>
        </div>
      </div>

      {/* Priority indicator */}
      <div className="mt-5 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-600 font-medium">Implementation Priority</span>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <div
                key={star}
                className={`w-2.5 h-2.5 rounded-full ${
                  star <= (opportunity.impact === 'high' ? 5 : opportunity.impact === 'medium' ? 3 : 2)
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 shadow-sm'
                    : 'bg-slate-300'
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