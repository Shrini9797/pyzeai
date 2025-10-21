import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, Target, Users, ArrowRight } from 'lucide-react';
import MetricCard from './MetricCard';
import Header from './Header';

const Dashboard: React.FC = () => {
  const metrics = [
    {
      title: 'Workflow Efficiency',
      value: '67/100',
      subtitle: 'Current operational efficiency',
      icon: TrendingUp,
      change: '+12%',
      trend: 'up' as const
    },
    {
      title: 'Cost Recovery',
      value: '$127K',
      subtitle: 'Annual automation potential',
      icon: Zap,
      change: '+$23K',
      trend: 'up' as const
    },
    {
      title: 'Active Processes',
      value: '847',
      subtitle: 'Actionable insights identified',
      icon: Target,
      change: '+156',
      trend: 'up' as const
    },
    {
      title: 'Time Savings',
      value: '2.3 min',
      subtitle: 'Average per case automation',
      icon: Users,
      change: '+0.4 min',
      trend: 'up' as const
    }
  ];

  const features = [
    {
      title: 'AI-Powered Analysis',
      description: 'Multi-agent system analyzes your workflow patterns and identifies automation opportunities',
      icon: TrendingUp,
      gradient: 'from-facebook-500 to-teal-500'
    },
    {
      title: 'Smart Recommendations',
      description: 'Get personalized automation suggestions based on your specific business processes',
      icon: Zap,
      gradient: 'from-teal-500 to-facebook-500'
    },
    {
      title: 'ROI Tracking',
      description: 'Monitor cost savings and efficiency improvements with detailed analytics',
      icon: Target,
      gradient: 'from-facebook-500 to-teal-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 relative overflow-hidden">
      {/* Animated floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-facebook-200 to-teal-200 rounded-full opacity-20 blur-xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 100, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-40 right-32 w-48 h-48 bg-gradient-to-r from-teal-200 to-facebook-200 rounded-full opacity-15 blur-xl"
        />
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-32 left-1/3 w-24 h-24 bg-gradient-to-r from-facebook-300 to-teal-300 rounded-full opacity-25 blur-lg"
        />
      </div>

      <div className="relative z-10">
        <Header />

        {/* Main Dashboard Content */}
        <main className="container mx-auto px-6 py-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-facebook-600 to-teal-600 bg-clip-text text-transparent">
                PyZe AI Automation
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transform your workflows with intelligent automation. Discover opportunities, optimize processes, and maximize efficiency.
            </p>
          </motion.div>

          {/* Metrics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <MetricCard {...metric} />
              </motion.div>
            ))}
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Powerful AI-Driven Features
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our advanced multi-agent system provides comprehensive workflow analysis and actionable automation insights.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} p-2.5 mb-4`}>
                      <IconComponent className="w-full h-full text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center bg-gradient-to-r from-facebook-500 to-teal-500 rounded-2xl p-8 text-white"
          >
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Workflows?</h3>
            <p className="text-facebook-100 mb-6 max-w-2xl mx-auto">
              Start analyzing your workflows with AI-powered insights. Click the chat assistant to begin your automation journey.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 bg-white text-facebook-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};


export default Dashboard;