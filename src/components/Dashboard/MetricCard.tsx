import React from 'react';
import { LucideIcon, TrendingUp, ArrowRight } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon?: LucideIcon;
  change?: string;
  trend?: 'up' | 'down' | 'stable';
  status?: 'positive' | 'negative' | 'neutral';
  subMetrics?: Array<{ label: string; value: string; max?: string }>;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon = TrendingUp,
  change,
  trend = 'up',
  status = 'positive',
  subMetrics = []
}) => {
  return (
    <div className="metric-card p-6 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-gradient-to-r from-slate-700 to-slate-800 rounded-xl shadow-sm">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
          </div>
        </div>
        <button className="text-slate-400 hover:text-slate-700 transition-colors">
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Main Value */}
      <div className="mb-6">
        <div className="flex items-baseline space-x-2 mb-2">
          <h2 className="text-5xl font-bold text-slate-900">{value}</h2>
          {status === 'positive' && (
            <span className="flex items-center space-x-1 text-green-600 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </span>
          )}
          {status === 'negative' && (
            <span className="flex items-center space-x-1 text-red-600 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>

      {/* Sub Metrics */}
      {subMetrics.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          {subMetrics.map((subMetric, idx) => (
            <div key={idx}>
              <p className="text-xs text-slate-600 mb-1">{subMetric.label}</p>
              <div className="flex items-baseline space-x-1">
                <p className="text-sm font-bold text-slate-800">{subMetric.value}</p>
                {subMetric.max && <p className="text-xs text-slate-400">{subMetric.max}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer Stats */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            status === 'positive' ? 'bg-green-500' :
            status === 'negative' ? 'bg-red-500' :
            'bg-slate-400'
          }`} />
          <span className="text-xs text-slate-500">
            {status === 'positive' ? 'Performing Well' : status === 'negative' ? 'Needs Attention' : 'Stable'}
          </span>
        </div>
        <span className="text-xs font-medium text-slate-600">Live</span>
      </div>
    </div>
  );
};

export default MetricCard;