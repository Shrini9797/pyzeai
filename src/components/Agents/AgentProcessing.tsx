import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, CheckCircle, Loader2, TrendingUp, Filter, Lightbulb, 
  Search, FileText, Zap, Database, Clock, BarChart3, 
  Cpu, Eye, Target, BarChart, FileBarChart
} from 'lucide-react';
import { agentConfigurations } from '../../services/mockData';

interface AgentProcessingProps {
  onComplete: () => void;
}

interface AgentMetrics {
  recordsProcessed?: number;
  patternsFound?: number;
  timeElapsed?: number;
  confidence?: number;
  status?: string;
}

const AgentProcessing: React.FC<AgentProcessingProps> = ({ onComplete }) => {
  const [currentAgentIndex, setCurrentAgentIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedAgents, setCompletedAgents] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [metrics, setMetrics] = useState<Record<string, AgentMetrics>>({});
  const [startTime] = useState(Date.now());

  const agentIcons = {
    'correlation-filter': Cpu,
    'pattern-analysis': Eye,
    'hypothesis-generation': Target,
    'root-cause-analysis': BarChart,
    'report-generation': FileBarChart
  };

  const agentColors = {
    'correlation-filter': { bg: 'bg-blue-500', text: 'text-blue-600', light: 'bg-blue-50', border: 'border-blue-200' },
    'pattern-analysis': { bg: 'bg-purple-500', text: 'text-purple-600', light: 'bg-purple-50', border: 'border-purple-200' },
    'hypothesis-generation': { bg: 'bg-amber-500', text: 'text-amber-600', light: 'bg-amber-50', border: 'border-amber-200' },
    'root-cause-analysis': { bg: 'bg-green-500', text: 'text-green-600', light: 'bg-green-50', border: 'border-green-200' },
    'report-generation': { bg: 'bg-indigo-500', text: 'text-indigo-600', light: 'bg-indigo-50', border: 'border-indigo-200' }
  };

  useEffect(() => {
    if (isCompleted) return;

    const currentAgent = agentConfigurations[currentAgentIndex];
    if (!currentAgent) return;

    const timer = setTimeout(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      
      // More realistic metrics based on actual processing
      if (currentStepIndex < currentAgent.steps.length) {
        const baseRecords = [2800000, 2800000, 1850000, 1850000, 18500];
        const basePatterns = [1850000, 125000, 18500, 12600, 18];
        const confidenceBase = [94, 91, 87, 92, 96];
        
        const progressRatio = (currentStepIndex + 1) / currentAgent.steps.length;
        
        setMetrics(prev => ({
          ...prev,
          [currentAgent.id]: {
            recordsProcessed: Math.floor((baseRecords[currentAgentIndex] || 100) * progressRatio),
            patternsFound: progressRatio === 1 ? basePatterns[currentAgentIndex] : undefined,
            timeElapsed: elapsed,
            confidence: Math.min(100, confidenceBase[currentAgentIndex] + Math.floor(progressRatio * 5)),
            status: currentAgent.steps[currentStepIndex]
          }
        }));
      }

      if (currentStepIndex < currentAgent.steps.length - 1) {
        setCurrentStepIndex(prev => prev + 1);
      } else {
        setCompletedAgents(prev => [...prev, currentAgent.id]);

        if (currentAgentIndex < agentConfigurations.length - 1) {
          setCurrentAgentIndex(prev => prev + 1);
          setCurrentStepIndex(0);
        } else {
          setIsCompleted(true);
          setTimeout(() => {
            onComplete();
          }, 1500);
        }
      }
    }, 1800); // Slightly slower for more realistic feel

    return () => clearTimeout(timer);
  }, [currentAgentIndex, currentStepIndex, isCompleted, onComplete, startTime]);

  const getAgentIcon = (agentId: string) => {
    const IconComponent = agentIcons[agentId as keyof typeof agentIcons] || Brain;
    return IconComponent;
  };

  const getAgentStatus = (agentId: string, index: number) => {
    if (completedAgents.includes(agentId)) return 'completed';
    if (index === currentAgentIndex) return 'processing';
    if (index < currentAgentIndex) return 'completed';
    return 'pending';
  };

  const getAgentColor = (agentId: string) => {
    return agentColors[agentId as keyof typeof agentColors] || agentColors['correlation-filter'];
  };

  const overallProgress = Math.round(((currentAgentIndex + (currentStepIndex / (agentConfigurations[currentAgentIndex]?.steps.length || 1))) / agentConfigurations.length) * 100);

  return (
    <div className="bg-gradient-to-br from-blue-100 via-blue-50 to-cyan-100 relative overflow-hidden rounded-2xl">
      {/* Floating animated background elements - Dashboard style but compact */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full opacity-20 blur-2xl"
        />
        <motion.div
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-gradient-to-r from-cyan-200 to-blue-200 rounded-full opacity-15 blur-2xl"
        />
      </div>

      <div className="relative z-10 p-4">
        {/* Header Section - Compact Dashboard Style */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          
          
          {/* Progress Badge - Dashboard Style */}
          <div className="bg-white/90 backdrop-blur-md rounded-xl px-4 py-2 shadow-lg border border-white/40 mb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-slate-500">Progress:</span>
                <span className="text-xs font-semibold text-slate-800">{overallProgress}%</span>
              </div>
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                {isCompleted ? 'Complete' : 'Processing'}
              </span>
            </div>
          </div>

          {/* Progress Bar - Dashboard Style */}
          <div className="bg-white/80 backdrop-blur-md rounded-xl p-3 shadow-lg border border-white/40">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-medium text-slate-700">Overall</span>
              <span className="text-xs font-bold text-slate-900">{overallProgress}%</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 shadow-sm"
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Agent Cards - Compact Dashboard Metric Card Style */}
        <div className="space-y-3">
          {agentConfigurations.map((agent, index) => {
            const status = getAgentStatus(agent.id, index);
            const progress = index === currentAgentIndex
              ? ((currentStepIndex + 1) / agent.steps.length) * 100
              : status === 'completed' ? 100 : 0;
            const color = getAgentColor(agent.id);
            const AgentIcon = getAgentIcon(agent.id);
            const agentMetrics = metrics[agent.id];

            return (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                className="metric-card p-3 relative overflow-hidden"
              >
                {/* Header - Compact Dashboard Style */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className={`relative p-1.5 rounded-lg shadow-sm ${
                      status === 'completed'
                        ? 'bg-gradient-to-r from-green-500 to-green-600'
                        : status === 'processing'
                        ? `bg-gradient-to-r ${color.bg.replace('bg-', 'from-')} ${color.bg.replace('bg-', 'to-')}`
                        : 'bg-gradient-to-r from-slate-300 to-slate-400'
                    }`}>
                      {status === 'completed' ? (
                        <CheckCircle className="w-3.5 h-3.5 text-white" />
                      ) : (
                        <AgentIcon className="w-3.5 h-3.5 text-white" />
                      )}
                      {status === 'processing' && (
                        <motion.div
                          className="absolute -inset-0.5 rounded-lg bg-blue-400 opacity-20"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs font-semibold text-slate-900 truncate">{agent.name}</h3>
                      <p className="text-[10px] text-slate-600 truncate">{agent.description}</p>
                    </div>
                  </div>
                  
                  {/* Status Badge */}
                  <div className={`px-2 py-0.5 rounded-full text-[10px] font-medium whitespace-nowrap flex-shrink-0 ${
                    status === 'completed' 
                      ? 'bg-green-100 text-green-700' 
                      : status === 'processing' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-slate-100 text-slate-500'
                  }`}>
                    {status === 'completed' ? '✓' :
                     status === 'processing' ? '●' : '◯'}
                  </div>
                </div>

                {/* Progress Section - Compact */}
                <div className="mb-2">
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-lg font-bold text-slate-900">{Math.round(progress)}%</span>
                    <span className="text-[10px] text-slate-500">
                      Step {Math.min(currentStepIndex + (index === currentAgentIndex ? 1 : 0), agent.steps.length)}/{agent.steps.length}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className={`h-full ${
                        status === 'completed' 
                          ? 'bg-green-500' 
                          : status === 'processing'
                          ? color.bg
                          : 'bg-slate-300'
                      }`}
                    />
                  </div>
                </div>

                {/* Agent Metrics - Compact Dashboard Style */}
                <AnimatePresence>
                  {status === 'processing' && agentMetrics && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-2"
                    >
                      <div className={`${color.light} border ${color.border} rounded-lg p-2`}>
                        <div className="flex items-start gap-1.5 mb-2">
                          <Loader2 className={`w-3 h-3 ${color.text} animate-spin flex-shrink-0 mt-0.5`} />
                          <p className="text-[10px] text-slate-700 font-medium leading-tight">
                            {agent.steps[currentStepIndex]}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-3 text-[10px]">
                          {agentMetrics.recordsProcessed !== undefined && (
                            <div className="flex items-center gap-1">
                              <Database className="w-2.5 h-2.5 text-slate-500" />
                              <span className="text-slate-700 font-semibold">{agentMetrics.recordsProcessed.toLocaleString()}</span>
                            </div>
                          )}
                          {agentMetrics.timeElapsed !== undefined && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-2.5 h-2.5 text-slate-500" />
                              <span className="text-slate-700 font-semibold">{agentMetrics.timeElapsed.toFixed(1)}s</span>
                            </div>
                          )}
                          {agentMetrics.confidence !== undefined && (
                            <div className="flex items-center gap-1">
                              <BarChart3 className="w-2.5 h-2.5 text-slate-500" />
                              <span className="text-slate-700 font-semibold">{agentMetrics.confidence}%</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Completion Metric - Compact */}
                {status === 'completed' && agentMetrics?.patternsFound !== undefined && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-between bg-green-50 px-2 py-1 rounded-lg border border-green-200"
                  >
                    <div className="flex items-center gap-1.5">
                      <Zap className="w-3 h-3 text-green-600" />
                      <span className="text-[10px] text-slate-600">Insights</span>
                    </div>
                    <span className="text-xs font-bold text-green-700">{agentMetrics.patternsFound}</span>
                  </motion.div>
                )}

                {/* Footer - Compact Dashboard Style */}
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center space-x-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      status === 'completed' 
                        ? 'bg-green-500' 
                        : status === 'processing' 
                        ? 'bg-blue-500' 
                        : 'bg-slate-400'
                    } ${status === 'processing' ? 'animate-pulse' : ''}`} />
                    <span className="text-[10px] text-slate-500">
                      {status === 'completed' ? 'Done' : status === 'processing' ? 'Active' : 'Queued'}
                    </span>
                  </div>
                  <span className="text-[10px] font-medium text-slate-600">Live</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Completion Message - Compact Dashboard Style */}
      <AnimatePresence>
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 mt-4"
          >
            <div className="metric-card p-4 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 mb-3 shadow-lg"
              >
                <CheckCircle className="w-6 h-6 text-white" />
              </motion.div>
              <h4 className="text-base text-slate-900 font-bold mb-1">Analysis Complete!</h4>
              <p className="text-[10px] text-slate-600 mb-3">All agents finished processing</p>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-2 border border-blue-100">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Database className="w-3 h-3 text-blue-600" />
                    <span className="text-[10px] text-slate-600 font-medium">Records</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900">2.8M</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-2 border border-green-100">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Zap className="w-3 h-3 text-green-600" />
                    <span className="text-[10px] text-slate-600 font-medium">Insights</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900">1.85M</p>
                </div>
              </div>
              
              {/* Mini Bar Chart - Compact Dashboard Style */}
              <div className="flex items-end space-x-0.5 h-10 mt-3">
                {[...Array(16)].map((_, i) => {
                  const height = Math.random() * 60 + 40;
                  const isHighlighted = i > 12;
                  return (
                    <div
                      key={i}
                      className={`flex-1 rounded-t transition-all ${
                        isHighlighted ? 'bg-green-400' : 'bg-slate-200'
                      }`}
                      style={{ height: `${height}%` }}
                    />
                  );
                })}
              </div>
              
              <div className="flex items-center justify-center mt-3 pt-2 border-t border-slate-100">
                <div className="flex items-center space-x-1.5">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  <span className="text-[10px] text-slate-500">Complete</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AgentProcessing;