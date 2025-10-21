import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, CheckCircle, Loader2, TrendingUp, Filter, Lightbulb, 
  Search, FileText, Zap, Database, Activity, Clock, ArrowRight 
} from 'lucide-react';
import { agentConfigurations } from '../../services/mockData';

interface AgentProcessingProps {
  onComplete: () => void;
}

interface AgentMetrics {
  recordsProcessed?: number;
  patternsFound?: number;
  timeElapsed?: string;
  confidence?: number;
}

const AgentProcessing: React.FC<AgentProcessingProps> = ({ onComplete }) => {
  const [currentAgentIndex, setCurrentAgentIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedAgents, setCompletedAgents] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [metrics, setMetrics] = useState<Record<string, AgentMetrics>>({});

  const agentIcons = {
    'correlation-filter': Filter,
    'pattern-analysis': Search,
    'hypothesis-generation': Lightbulb,
    'root-cause-analysis': TrendingUp,
    'report-generation': FileText
  };

  const agentColors = {
    'correlation-filter': { bg: 'from-blue-500 to-cyan-500', text: 'text-blue-600', glow: 'shadow-blue-500/50' },
    'pattern-analysis': { bg: 'from-purple-500 to-pink-500', text: 'text-purple-600', glow: 'shadow-purple-500/50' },
    'hypothesis-generation': { bg: 'from-amber-500 to-orange-500', text: 'text-amber-600', glow: 'shadow-amber-500/50' },
    'root-cause-analysis': { bg: 'from-green-500 to-emerald-500', text: 'text-green-600', glow: 'shadow-green-500/50' },
    'report-generation': { bg: 'from-indigo-500 to-blue-500', text: 'text-indigo-600', glow: 'shadow-indigo-500/50' }
  };

  useEffect(() => {
    if (isCompleted) return;

    const currentAgent = agentConfigurations[currentAgentIndex];
    if (!currentAgent) return;

    const timer = setTimeout(() => {
      // Update metrics for processing agent
      if (currentStepIndex < currentAgent.steps.length) {
        const baseRecords = [1275, 847, 292, 156, 45];
        const basePatterns = [847, 291, 12, 45, 1];
        
        setMetrics(prev => ({
          ...prev,
          [currentAgent.id]: {
            recordsProcessed: Math.floor((baseRecords[currentAgentIndex] || 100) * ((currentStepIndex + 1) / currentAgent.steps.length)),
            patternsFound: currentStepIndex === currentAgent.steps.length - 1 ? basePatterns[currentAgentIndex] : undefined,
            timeElapsed: `${((currentStepIndex + 1) * 0.8).toFixed(1)}s`,
            confidence: 85 + Math.floor(Math.random() * 15)
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
    }, 1200);

    return () => clearTimeout(timer);
  }, [currentAgentIndex, currentStepIndex, isCompleted, onComplete]);

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-5xl mx-auto"
    >
      {/* Header with overall progress */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-facebook-500 to-purple-600 mb-4 shadow-lg"
        >
          <Brain className="w-8 h-8 text-white animate-pulse" />
        </motion.div>
        <h4 className="text-2xl text-gray-900 font-bold mb-2">Multi-Agent Analysis in Progress</h4>
        <p className="text-gray-600">AI agents collaborating to analyze your workflow data</p>
        
        {/* Overall progress bar */}
        <div className="mt-4 max-w-md mx-auto">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>Overall Progress</span>
            <span>{Math.round(((currentAgentIndex + (currentStepIndex / agentConfigurations[currentAgentIndex]?.steps.length || 1)) / agentConfigurations.length) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-facebook-500 via-purple-500 to-green-500"
              initial={{ width: 0 }}
              animate={{ 
                width: `${((currentAgentIndex + (currentStepIndex / (agentConfigurations[currentAgentIndex]?.steps.length || 1))) / agentConfigurations.length) * 100}%` 
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Agent workflow pipeline */}
      <div className="relative space-y-8">
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
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Connection line to next agent */}
              {index < agentConfigurations.length - 1 && (
                <motion.div 
                  className="absolute left-8 top-24 w-0.5 h-8 bg-gradient-to-b from-gray-300 to-gray-200 z-0"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: status === 'completed' ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                />
              )}

              <div className={`relative rounded-2xl border-2 transition-all duration-500 backdrop-blur-sm ${
                status === 'processing'
                  ? `bg-white border-gray-300 shadow-2xl ${color.glow}`
                  : status === 'completed'
                  ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300 shadow-lg'
                  : 'bg-white/60 border-gray-200'
              }`}>
                <div className="p-6">
                  {/* Agent header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4 flex-1">
                      {/* Icon with gradient */}
                      <motion.div 
                        className={`relative p-3 rounded-xl ${
                          status === 'processing'
                            ? `bg-gradient-to-br ${color.bg} shadow-lg`
                            : status === 'completed'
                            ? 'bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg'
                            : 'bg-gray-200'
                        }`}
                        animate={status === 'processing' ? {
                          scale: [1, 1.05, 1],
                          rotate: [0, 5, -5, 0]
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {status === 'processing' ? (
                          <div className="relative">
                            <AgentIcon className="w-6 h-6 text-white relative z-10" />
                            <motion.div
                              className="absolute inset-0 bg-white rounded-lg"
                              animate={{ opacity: [0.3, 0.6, 0.3] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            />
                          </div>
                        ) : status === 'completed' ? (
                          <CheckCircle className="w-6 h-6 text-white" />
                        ) : (
                          <AgentIcon className="w-6 h-6 text-gray-400" />
                        )}
                        
                        {/* Pulse effect for active agent */}
                        {status === 'processing' && (
                          <motion.div
                            className={`absolute inset-0 rounded-xl bg-gradient-to-br ${color.bg}`}
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </motion.div>

                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h5 className="text-lg text-gray-900 font-semibold">{agent.name}</h5>
                          {status === 'processing' && (
                            <motion.div
                              className="flex space-x-1"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                            >
                              <motion.div
                                className="w-1.5 h-1.5 bg-facebook-500 rounded-full"
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                              />
                              <motion.div
                                className="w-1.5 h-1.5 bg-facebook-500 rounded-full"
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                              />
                              <motion.div
                                className="w-1.5 h-1.5 bg-facebook-500 rounded-full"
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                              />
                            </motion.div>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">{agent.description}</p>
                      </div>
                    </div>

                    {/* Status badge */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                        status === 'completed' ? 'bg-green-100 text-green-700' :
                        status === 'processing' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {status === 'completed' ? '✓ Complete' :
                       status === 'processing' ? '● Processing' : '◯ Waiting'}
                    </motion.div>
                  </div>

                  {/* Progress bar with percentage */}
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-gray-500">
                        Step {Math.min(currentStepIndex + (index === currentAgentIndex ? 1 : 0), agent.steps.length)} of {agent.steps.length}
                      </span>
                      <span className="text-xs font-semibold text-gray-700">{Math.round(progress)}%</span>
                    </div>
                    <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                        className={`h-full ${
                          status === 'completed' 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                            : `bg-gradient-to-r ${color.bg}`
                        }`}
                      />
                      {status === 'processing' && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                          animate={{ x: ['-100%', '200%'] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Current step display with metadata */}
                  <AnimatePresence mode="wait">
                    {status === 'processing' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-3"
                      >
                        {/* Current action */}
                        <div className={`p-3 rounded-lg border ${color.text} bg-gradient-to-r from-blue-50/50 to-purple-50/50 border-blue-200`}>
                          <div className="flex items-start space-x-2">
                            <Loader2 className={`w-4 h-4 mt-0.5 animate-spin ${color.text}`} />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{agent.steps[currentStepIndex]}</p>
                            </div>
                          </div>
                        </div>

                        {/* Live metrics */}
                        {agentMetrics && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="grid grid-cols-3 gap-3"
                          >
                            {agentMetrics.recordsProcessed !== undefined && (
                              <div className="flex items-center space-x-2 text-xs">
                                <Database className="w-4 h-4 text-gray-400" />
                                <div>
                                  <div className="text-gray-500">Records</div>
                                  <div className="font-semibold text-gray-900">{agentMetrics.recordsProcessed.toLocaleString()}</div>
                                </div>
                              </div>
                            )}
                            {agentMetrics.timeElapsed && (
                              <div className="flex items-center space-x-2 text-xs">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <div>
                                  <div className="text-gray-500">Time</div>
                                  <div className="font-semibold text-gray-900">{agentMetrics.timeElapsed}</div>
                                </div>
                              </div>
                            )}
                            {agentMetrics.confidence && (
                              <div className="flex items-center space-x-2 text-xs">
                                <Activity className="w-4 h-4 text-gray-400" />
                                <div>
                                  <div className="text-gray-500">Confidence</div>
                                  <div className="font-semibold text-gray-900">{agentMetrics.confidence}%</div>
                                </div>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                    
                    {status === 'completed' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200"
                      >
                        <div className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-green-900">{agent.steps[agent.steps.length - 1]}</p>
                            {agentMetrics?.patternsFound !== undefined && (
                              <p className="text-xs text-green-700 mt-1 flex items-center">
                                <Zap className="w-3 h-3 mr-1" />
                                {agentMetrics.patternsFound} insights identified
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Completion message */}
      <AnimatePresence>
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-2 border-green-300 shadow-2xl shadow-green-500/20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 mb-4 shadow-lg"
            >
              <CheckCircle className="w-8 h-8 text-white" />
            </motion.div>
            <h4 className="text-2xl text-green-900 font-bold mb-2">Analysis Complete!</h4>
            <p className="text-green-700 mb-4">All agents have successfully processed your workflow data</p>
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <Database className="w-4 h-4 text-green-600" />
                <span className="text-green-800">1,275 records analyzed</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-green-600" />
                <span className="text-green-800">847 insights found</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AgentProcessing;