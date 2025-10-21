import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon?: LucideIcon;
  change?: string;
  trend?: 'up' | 'down' | 'stable';
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon = TrendingUp,
  change,
  trend = 'up'
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 bg-gradient-to-r from-facebook-500 to-teal-500 rounded-lg">
          <Icon className="w-5 h-5 text-white" />
        </div>
        {change && (
          <div className={`flex items-center space-x-1 text-sm font-medium ${
            trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'
          }`}>
            <TrendingUp className={`w-4 h-4 ${trend === 'down' ? 'rotate-180' : ''}`} />
            <span>{change}</span>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
        <p className="text-sm font-medium text-gray-900 mb-1">{title}</p>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
    </motion.div>
  );
};

export default MetricCard;