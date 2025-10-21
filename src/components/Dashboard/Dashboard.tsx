import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, FileText, AlertCircle, Clock, CheckCircle, BarChart3, Activity } from 'lucide-react';
import MetricCard from './MetricCard';
import Header from './Header';

const Dashboard: React.FC = () => {
  const [activeClient, setActiveClient] = useState(0);
  
  const clients = [
    { name: 'Customer Onboarding', id: 'WF-1232', revenue: '847 Cases', color: 'from-blue-400 to-blue-500' },
    { name: 'Approval Workflow', id: 'WF-2563', revenue: '291 Tasks', color: 'from-cyan-400 to-cyan-500' },
    { name: 'Data Processing', id: 'WF-5732', revenue: '1.2K Records', color: 'from-blue-500 to-blue-600' },
    { name: 'Invoice Handling', id: 'WF-3864', revenue: '456 Items', color: 'from-sky-400 to-sky-500' },
    { name: 'Quality Review', id: 'WF-4821', revenue: '623 Reviews', color: 'from-blue-300 to-blue-400' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveClient((prev) => (prev + 1) % clients.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [clients.length]);

  const metrics = [
    {
      title: 'Workflow Efficiency',
      value: '67/100',
      subtitle: 'Current operational efficiency',
      subMetrics: [
        { label: 'Automated', value: '584', max: '847' },
        { label: 'Manual Review', value: '263', max: '' }
      ],
      icon: TrendingUp,
      change: '+12%',
      trend: 'up' as const,
      status: 'positive' as const
    },
    {
      title: 'Cost Recovery',
      value: '$127K',
      subtitle: 'Annual automation potential',
      subMetrics: [
        { label: 'Identified', value: '$127K', max: '' },
        { label: 'In Progress', value: '$45K', max: '' }
      ],
      icon: DollarSign,
      change: '+$23K',
      trend: 'up' as const,
      status: 'positive' as const
    },
    {
      title: 'Active Processes',
      value: '847',
      subtitle: 'Actionable insights identified',
      subMetrics: [
        { label: 'High Priority', value: '234', max: '' },
        { label: 'Total Analyzed', value: '1,275', max: '' }
      ],
      icon: AlertCircle,
      change: '+156',
      trend: 'up' as const,
      status: 'positive' as const
    }
  ];

  const secondaryMetrics = [
    {
      title: 'Automation Opportunities',
      value: '78%',
      subtitle: 'Process Automation Readiness',
      stats: [
        { label: 'High Impact', value: '12', status: 'success' },
        { label: 'Medium Impact', value: '8', status: 'warning' },
        { label: 'Low Effort', value: '15', status: 'info' },
        { label: 'Quick Wins', value: '6', status: 'success' }
      ],
      icon: Clock
    },
    {
      title: 'Time Savings',
      value: '2.3 min',
      subtitle: 'Average Per Case Automation',
      stats: [
        { label: 'Per Process', value: '2.3m', status: 'success' },
        { label: 'Daily Total', value: '4.2h', status: 'success' },
        { label: 'Weekly Saved', value: '21h', status: 'info' },
        { label: 'Monthly Impact', value: '84h', status: 'success' }
      ],
      icon: BarChart3
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-cyan-100 relative overflow-hidden pb-24">
      <Header />

      {/* Main Dashboard Content */}
      <main className="container mx-auto px-6 py-6">
        {/* Top Section - Client Data Carousel */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-sm font-medium text-slate-900 mb-1">AI-Powered Workflow Analysis</h2>
              <h1 className="text-4xl font-bold text-slate-900">Active Process Monitoring</h1>
            </div>
            
            {/* Active Client Badge */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl px-6 py-3 shadow-lg border border-white/40">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-xs text-slate-500">Workflow:</span>
                  <span className="text-sm font-semibold text-slate-800">{clients[activeClient].name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-xs text-slate-500">ID:</span>
                  <span className="text-sm font-semibold text-slate-800">{clients[activeClient].id}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-500">Status:</span>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">Analyzing</span>
                </div>
              </div>
            </div>
          </div>

          {/* Client Cards - Simple Grid View */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
            {clients.map((client, index) => (
              <div
                key={client.id}
                className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg border border-white/60 overflow-hidden"
              >
                <div className={`h-full bg-gradient-to-br ${client.color} p-6 flex flex-col justify-between`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center">
                      <Activity className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">{client.name}</h3>
                    <p className="text-white/80 text-xs mb-4">{client.id}</p>
                    
                    <div>
                      <p className="text-white/80 text-xs mb-1">Volume</p>
                      <p className="text-white text-2xl font-bold flex items-center">
                        {client.revenue}
                        <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">↑</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Metrics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {metrics.map((metric, index) => (
            <div key={metric.title}>
              <MetricCard {...metric} />
            </div>
          ))}
        </div>

        {/* Secondary Metrics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {secondaryMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <div
                key={metric.title}
                className="metric-card p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-slate-600 to-slate-700 rounded-lg">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-slate-900">{metric.title}</h3>
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-slate-500 mb-1">{metric.subtitle}</p>
                  <h2 className="text-4xl font-bold text-slate-900">{metric.value}</h2>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {metric.stats.map((stat, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-xs text-slate-600">{stat.label}</span>
                      <div className="flex items-center space-x-1">
                        <span className={`text-sm font-semibold ${
                          stat.status === 'success' ? 'text-green-600' :
                          stat.status === 'warning' ? 'text-amber-600' :
                          'text-blue-600'
                        }`}>{stat.value}</span>
                        {stat.status === 'success' && <CheckCircle className="w-3 h-3 text-green-500" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;