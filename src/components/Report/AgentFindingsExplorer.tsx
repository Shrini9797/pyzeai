import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, AlertTriangle, CheckCircle, Clock, DollarSign, 
  Users, BarChart3, PieChart, Activity, Zap, Target, 
  ArrowUpRight, ArrowDownRight, Minus, Eye, Brain, 
  Database, Settings, FileText, Download, Share, X
} from 'lucide-react';
import { detailedFindings, questionSpecificData, analysisHistory } from '../../services/mockData';
import { DetailedFindings as DetailedFindingsType } from '../../types';
import { generateComprehensivePDFReport } from '../../utils/reportGenerator';

interface AgentFindingsExplorerProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
  selectedQuestion?: string;
  onHistoryItemClick?: (question: string) => void;
  initialTab?: string;
}

const AgentFindingsExplorer: React.FC<AgentFindingsExplorerProps> = ({ 
  isOpen, 
  onClose, 
  onDownload,
  selectedQuestion,
  onHistoryItemClick,
  initialTab = 'overview'
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isLoading, setIsLoading] = useState(true);
  const [findings] = useState<DetailedFindingsType>(detailedFindings);
  
  // Get question-specific data
  const getQuestionKey = (question?: string) => {
    if (!question) return null;
    const lowerQuestion = question.toLowerCase();
    if (lowerQuestion.includes('swivel chair')) return 'swivel-chair';
    if (lowerQuestion.includes('repeated edit')) return 'repeated-edits';
    if (lowerQuestion.includes('inefficient routing')) return 'inefficient-routing';
    if (lowerQuestion.includes('unnecessary approval')) return 'unnecessary-approvals';
    if (lowerQuestion.includes('efficiency report')) return 'efficiency-report';
    return null;
  };
  
  const questionKey = getQuestionKey(selectedQuestion);
  const questionData = questionKey ? questionSpecificData[questionKey as keyof typeof questionSpecificData] : null;

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'patterns', label: 'Behavior Patterns', icon: Eye },
    { id: 'systems', label: 'System Analysis', icon: Settings },
    { id: 'recommendations', label: 'Recommendations', icon: Target },
    { id: 'history', label: 'History', icon: Clock }
  ];

  // Question-specific content rendering functions
  const renderSwivelChairContent = () => {
    const data = questionData?.findings as any;
    if (!data) return null;
    
    return (
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="metric-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center text-red-600">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">+{data.totalSwitches}</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">{data.totalSwitches}</h3>
            <p className="text-slate-600 text-sm">Total System Switches</p>
          </div>

          <div className="metric-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center text-orange-600">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">+{data.avgSwitchesPerUser}</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">{data.avgSwitchesPerUser}</h3>
            <p className="text-slate-600 text-sm">Avg Switches Per User</p>
          </div>

          <div className="metric-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center text-purple-600">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">+{data.userImpact.highImpactUsers}</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">{data.userImpact.highImpactUsers}</h3>
            <p className="text-slate-600 text-sm">High Impact Users</p>
          </div>
        </div>

        {/* Most Switched Systems */}
        <div className="metric-card p-6">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Most Switched System Pairs</h3>
          <div className="space-y-4">
            {data.mostSwitchedSystems.map((system: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-slate-900">{system.system}</h4>
                  <p className="text-sm text-slate-600">Time Lost: {system.timeLost}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-600">{system.switches}</div>
                  <div className="text-sm text-slate-600">switches</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Peak Switching Hours */}
        <div className="metric-card p-6">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Peak Switching Hours</h3>
          <div className="grid grid-cols-2 gap-4">
            {data.peakSwitchingHours.map((hour: string, index: number) => (
              <div key={index} className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                <div className="text-lg font-bold text-blue-600">{hour}</div>
                <div className="text-sm text-slate-600">Peak Activity</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderRepeatedEditsContent = () => {
    const data = questionData?.findings as any;
    if (!data) return null;
    
    return (
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="metric-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl shadow-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center text-amber-600">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">+{data.totalRepeatedEdits}</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">{data.totalRepeatedEdits}</h3>
            <p className="text-slate-600 text-sm">Total Repeated Edits</p>
          </div>

          <div className="metric-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center text-orange-600">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">+{data.avgEditsPerCase}</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">{data.avgEditsPerCase}</h3>
            <p className="text-slate-600 text-sm">Avg Edits Per Case</p>
          </div>

          <div className="metric-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow-lg">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center text-red-600">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">+{data.timeImpact.userFrustrationScore}</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">{data.timeImpact.userFrustrationScore}/10</h3>
            <p className="text-slate-600 text-sm">Frustration Score</p>
          </div>
        </div>

        {/* Most Problematic Fields */}
        <div className="metric-card p-6">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Most Problematic Fields</h3>
          <div className="space-y-4">
            {data.mostProblematicFields.map((field: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-slate-900">{field.field}</h4>
                  <p className="text-sm text-slate-600">{field.percentage}% of all repeated edits</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-amber-600">{field.edits}</div>
                  <div className="text-sm text-slate-600">edits</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderInefficientRoutingContent = () => {
    const data = questionData?.findings as any;
    if (!data) return null;
    
    return (
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="metric-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center text-red-600">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">+{data.misrouteRate}%</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">{data.misrouteRate}%</h3>
            <p className="text-slate-600 text-sm">Misroute Rate</p>
          </div>

          <div className="metric-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center text-orange-600">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">+{data.impactMetrics.resolutionTimeIncrease}%</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">{data.impactMetrics.resolutionTimeIncrease}%</h3>
            <p className="text-slate-600 text-sm">Time Increase</p>
          </div>

          <div className="metric-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center text-purple-600">
                <ArrowDownRight className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">-{data.impactMetrics.customerSatisfactionDrop}%</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">-{data.impactMetrics.customerSatisfactionDrop}%</h3>
            <p className="text-slate-600 text-sm">CSAT Drop</p>
          </div>
        </div>

        {/* Common Misroutes */}
        <div className="metric-card p-6">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Common Misroutes</h3>
          <div className="space-y-4">
            {data.commonMisroutes.map((misroute: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-slate-900">{misroute.from} → {misroute.to}</h4>
                  <p className="text-sm text-slate-600">{misroute.percentage}% of all misroutes</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-600">{misroute.count}</div>
                  <div className="text-sm text-slate-600">cases</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderUnnecessaryApprovalsContent = () => {
    const data = questionData?.findings as any;
    if (!data) return null;
    
    return (
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="metric-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center text-red-600">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">+{data.unnecessaryRate}%</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">{data.unnecessaryRate}%</h3>
            <p className="text-slate-600 text-sm">Unnecessary Rate</p>
          </div>

          <div className="metric-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center text-orange-600">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">+{data.unnecessaryApprovals}</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">{data.unnecessaryApprovals}</h3>
            <p className="text-slate-600 text-sm">Unnecessary Approvals</p>
          </div>

          <div className="metric-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center text-purple-600">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">+{data.bottleneckAnalysis.autoApprovableCases}%</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">{data.bottleneckAnalysis.autoApprovableCases}%</h3>
            <p className="text-slate-600 text-sm">Auto-Approvable</p>
          </div>
        </div>

        {/* Approval Types */}
        <div className="metric-card p-6">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Approval Type Analysis</h3>
          <div className="space-y-4">
            {data.approvalTypes.map((type: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-slate-900">{type.type}</h4>
                  <p className="text-sm text-slate-600">Avg Wait: {type.avgWait}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-600">{type.unnecessary}</div>
                  <div className="text-sm text-slate-600">unnecessary</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderEfficiencyReportContent = () => {
    const data = questionData?.findings as any;
    if (!data) return null;
    
    return (
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="metric-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center text-blue-600">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">+{data.improvementPotential}%</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">{data.overallEfficiency}%</h3>
            <p className="text-slate-600 text-sm">Overall Efficiency</p>
          </div>

          <div className="metric-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center text-green-600">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">+{data.roi}%</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">${data.netAnnualSavings.toLocaleString()}</h3>
            <p className="text-slate-600 text-sm">Net Annual Savings</p>
          </div>

          <div className="metric-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center text-purple-600">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">+{data.improvementPotential}%</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">{data.improvementPotential}%</h3>
            <p className="text-slate-600 text-sm">Improvement Potential</p>
          </div>

          <div className="metric-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center text-amber-600">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">+{data.roi}%</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">{data.roi}%</h3>
            <p className="text-slate-600 text-sm">ROI</p>
          </div>
        </div>

        {/* Priority Areas */}
        <div className="metric-card p-6">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Priority Areas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.priorityAreas.map((area: any, index: number) => (
              <div key={index} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-slate-900">{area.area}</h4>
                  <div className="text-lg font-bold text-green-600">{area.roi}% ROI</div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    area.impact === 'High' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {area.impact} Impact
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    area.effort === 'Low' ? 'bg-green-100 text-green-700' : 
                    area.effort === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {area.effort} Effort
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Render question-specific content
  const renderQuestionSpecificContent = () => {
    if (!questionData) return null;

    switch (questionKey) {
      case 'swivel-chair':
        return renderSwivelChairContent();
      case 'repeated-edits':
        return renderRepeatedEditsContent();
      case 'inefficient-routing':
        return renderInefficientRoutingContent();
      case 'unnecessary-approvals':
        return renderUnnecessaryApprovalsContent();
      case 'efficiency-report':
        return renderEfficiencyReportContent();
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-light rounded-3xl w-full max-w-7xl max-h-[95vh] overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="bg-gradient-to-br from-blue-100 via-blue-50 to-cyan-100 p-6 relative overflow-hidden">
            {/* Floating background elements */}
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
            
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-white/40">
                  <Brain className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-slate-900">
                    {questionData ? questionData.title : 'Agent Findings Explorer'}
                  </h1>
                  <p className="text-slate-600 text-lg">
                    {questionData ? questionData.description : 'AI-identified efficiency opportunities and user behaviors'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => generateComprehensivePDFReport(selectedQuestion)}
                  className="flex items-center space-x-2 px-4 py-2 bg-white/90 backdrop-blur-md text-slate-700 rounded-xl hover:bg-white transition-all duration-300 border border-white/40 shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  <span className="font-medium">Export PDF</span>
                </button>
                <button className="p-2 bg-white/90 backdrop-blur-md rounded-xl text-slate-600 hover:text-slate-800 hover:bg-white transition-all duration-200 border border-white/40 shadow-lg">
                  <Share className="w-5 h-5" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 bg-white/90 backdrop-blur-md rounded-xl text-slate-600 hover:text-slate-800 hover:bg-white transition-all duration-200 border border-white/40 shadow-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Loading State */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center h-96 bg-gradient-to-br from-blue-100 via-blue-50 to-cyan-100 relative overflow-hidden"
              >
                {/* Floating background elements */}
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
                </div>
                
                <div className="text-center relative z-10">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Analyzing productivity insights</h3>
                  <p className="text-slate-600">Processing agent findings...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <AnimatePresence>
            {!isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="h-full"
              >
                {/* Tab Navigation */}
                <div className="bg-white/90 backdrop-blur-md border-b border-white/40 px-6 py-4">
                  <div className="flex space-x-1">
                    {tabs.map((tab) => {
                      const IconComponent = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                            activeTab === tab.id
                              ? 'bg-white/95 backdrop-blur-md text-blue-600 shadow-lg border border-white/40'
                              : 'text-slate-600 hover:text-slate-800 hover:bg-white/70 backdrop-blur-sm'
                          }`}
                        >
                          <IconComponent className="w-4 h-4" />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="overflow-y-auto max-h-[calc(95vh-200px)] bg-gradient-to-br from-blue-100 via-blue-50 to-cyan-100 relative overflow-hidden">
                  {/* Floating background elements */}
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
                  
                  <div className="p-6 relative z-10">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                      >
                        {/* Show question-specific content if available, otherwise show general overview */}
                        {questionData ? (
                          renderQuestionSpecificContent()
                        ) : (
                          <>
                            {/* Key Metrics Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                          <div className="metric-card p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg">
                                <Activity className="w-6 h-6 text-white" />
                              </div>
                              <div className="flex items-center text-green-600">
                                <ArrowUpRight className="w-4 h-4 mr-1" />
                                <span className="text-sm font-medium">+15%</span>
                              </div>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-1">
                              {findings.efficiencyMetrics.overallEfficiency}%
                            </h3>
                            <p className="text-slate-600 text-sm">Overall Efficiency</p>
                          </div>

                          <div className="metric-card p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg">
                                <DollarSign className="w-6 h-6 text-white" />
                              </div>
                              <div className="flex items-center text-green-600">
                                <ArrowUpRight className="w-4 h-4 mr-1" />
                                <span className="text-sm font-medium">+485%</span>
                              </div>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-1">
                              ${findings.efficiencyMetrics.costSavingsPotential.toLocaleString()}
                            </h3>
                            <p className="text-slate-600 text-sm">Cost Savings Potential</p>
                          </div>

                          <div className="metric-card p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg">
                                <Clock className="w-6 h-6 text-white" />
                              </div>
                              <div className="flex items-center text-green-600">
                                <ArrowUpRight className="w-4 h-4 mr-1" />
                                <span className="text-sm font-medium">+18.5h</span>
                              </div>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-1">
                              {findings.efficiencyMetrics.timeSavingsPotential}h
                            </h3>
                            <p className="text-slate-600 text-sm">Time Savings Daily</p>
                          </div>

                          <div className="metric-card p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl shadow-lg">
                                <Zap className="w-6 h-6 text-white" />
                              </div>
                              <div className="flex items-center text-green-600">
                                <ArrowUpRight className="w-4 h-4 mr-1" />
                                <span className="text-sm font-medium">+88%</span>
                              </div>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-1">
                              {findings.efficiencyMetrics.automationReadiness}%
                            </h3>
                            <p className="text-slate-600 text-sm">Automation Readiness</p>
                          </div>
                        </div>

                        {/* Process Analysis Chart */}
                        <div className="metric-card p-6">
                          <h3 className="text-xl font-bold text-slate-900 mb-6">Process Efficiency Analysis</h3>
                          <div className="space-y-4">
                            {findings.systemAnalysis.workflowStages.map((stage, index) => (
                              <div key={stage.stage} className="flex items-center space-x-4">
                                <div className="w-24 text-sm font-medium text-slate-700">{stage.stage}</div>
                                <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${stage.efficiency}%` }}
                                    transition={{ delay: index * 0.1, duration: 0.8 }}
                                    className={`h-full ${
                                      stage.efficiency >= 80 ? 'bg-green-500' :
                                      stage.efficiency >= 60 ? 'bg-amber-500' : 'bg-red-500'
                                    }`}
                                  />
                                </div>
                                <div className="w-16 text-right text-sm font-semibold text-slate-900">
                                  {stage.efficiency}%
                                </div>
                                <div className="w-20 text-right text-sm text-slate-600">
                                  {stage.time}m
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Quick Insights */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div className="metric-card p-6">
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                              <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                              Critical Issues
                            </h3>
                            <div className="space-y-3">
                              <div className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                                <div>
                                  <p className="text-sm font-medium text-slate-900">45K enterprise swivel chair instances</p>
                                  <p className="text-xs text-slate-600">Users switching between Salesforce and Oracle Financials</p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                                <div>
                                  <p className="text-sm font-medium text-slate-900">35% time loss in ServiceNow approvals</p>
                                  <p className="text-xs text-slate-600">Enterprise workflow bottlenecks across Fortune 500</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="metric-card p-6">
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                              Quick Wins
                            </h3>
                            <div className="space-y-3">
                              <div className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                                <div>
                                  <p className="text-sm font-medium text-slate-900">Enterprise field validation</p>
                                  <p className="text-xs text-slate-600">Reduce 28K SAP repeated edit cases</p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                                <div>
                                  <p className="text-sm font-medium text-slate-900">Salesforce-Oracle integration</p>
                                  <p className="text-xs text-slate-600">Eliminate Fortune 500 system switching</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                          </>
                        )}
                      </motion.div>
                    )}

                    {/* Behavior Patterns Tab */}
                    {activeTab === 'patterns' && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                      >
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">User Behavior Patterns</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {findings.userBehaviorPatterns.map((pattern, index) => (
                            <motion.div
                              key={pattern.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="metric-card p-6"
                            >
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <h3 className="text-lg font-bold text-slate-900 mb-2">{pattern.pattern}</h3>
                                  <p className="text-slate-600 text-sm">{pattern.description}</p>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getImpactColor(pattern.impact)}`}>
                                  {pattern.impact}
                                </div>
                              </div>
                              
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-slate-600">Frequency</span>
                                  <span className="text-lg font-bold text-slate-900">{pattern.frequency}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-slate-600">Time Lost</span>
                                  <span className="text-sm font-semibold text-red-600">{pattern.timeLost}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-slate-600">Cost Impact</span>
                                  <span className="text-sm font-semibold text-red-600">{pattern.costImpact}</span>
                                </div>
                              </div>
                              
                              <div className="mt-4 pt-4 border-t border-slate-100">
                                <p className="text-sm text-slate-700">
                                  <strong>Recommendation:</strong> {pattern.recommendation}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* System Analysis Tab */}
                    {activeTab === 'systems' && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                      >
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">System Analysis</h2>
                        
                        {/* System Usage Chart */}
                        <div className="metric-card p-6">
                          <h3 className="text-lg font-bold text-slate-900 mb-6">System Usage & Efficiency</h3>
                          <div className="space-y-4">
                            {findings.systemAnalysis.mostUsedSystems.map((system, index) => (
                              <div key={system.name} className="flex items-center space-x-4">
                                <div className="w-32 text-sm font-medium text-slate-700">{system.name}</div>
                                <div className="flex-1 bg-slate-100 rounded-full h-4 overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${system.usage}%` }}
                                    transition={{ delay: index * 0.1, duration: 0.8 }}
                                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                                  />
                                </div>
                                <div className="w-16 text-right text-sm font-semibold text-slate-900">
                                  {system.usage}%
                                </div>
                                <div className="w-16 text-right text-sm text-slate-600">
                                  {system.efficiency}% eff.
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Workflow Stages */}
                        <div className="metric-card p-6">
                          <h3 className="text-lg font-bold text-slate-900 mb-6">Workflow Stage Analysis</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {findings.systemAnalysis.workflowStages.map((stage, index) => (
                              <motion.div
                                key={stage.stage}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center p-4 bg-white/90 backdrop-blur-md rounded-xl border border-white/40 shadow-lg"
                              >
                                <h4 className="font-semibold text-slate-900 mb-2">{stage.stage}</h4>
                                <div className="text-2xl font-bold text-blue-600 mb-1">{stage.time}m</div>
                                <div className="text-sm text-slate-600">Average Time</div>
                                <div className="mt-2 text-sm font-medium text-slate-700">
                                  {stage.efficiency}% Efficiency
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Recommendations Tab */}
                    {activeTab === 'recommendations' && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                      >
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Automation Recommendations</h2>
                        <div className="space-y-6">
                          {findings.recommendations.map((rec, index) => (
                            <motion.div
                              key={rec.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="metric-card p-6"
                            >
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-3 mb-2">
                                    <h3 className="text-xl font-bold text-slate-900">{rec.title}</h3>
                                    <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(rec.priority)}`}>
                                      {rec.priority}
                                    </div>
                                  </div>
                                  <p className="text-slate-600 mb-4">{rec.description}</p>
                                </div>
                                <div className="text-right">
                                  <div className="text-2xl font-bold text-green-600">{rec.roi}%</div>
                                  <div className="text-sm text-slate-600">ROI</div>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div className="bg-white/90 backdrop-blur-md rounded-lg p-3 border border-white/40 shadow-sm">
                                  <div className="text-sm text-slate-600 mb-1">Implementation</div>
                                  <div className="font-semibold text-slate-900">{rec.implementation}</div>
                                </div>
                                <div className="bg-white/90 backdrop-blur-md rounded-lg p-3 border border-white/40 shadow-sm">
                                  <div className="text-sm text-slate-600 mb-1">Cost</div>
                                  <div className="font-semibold text-slate-900">{rec.cost}</div>
                                </div>
                                <div className="bg-white/90 backdrop-blur-md rounded-lg p-3 border border-white/40 shadow-sm">
                                  <div className="text-sm text-slate-600 mb-1">Impact</div>
                                  <div className="font-semibold text-slate-900">{rec.impact}</div>
                                </div>
                              </div>
                              
                              <div className="pt-4 border-t border-slate-100">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-slate-600">Expected ROI</span>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-24 bg-slate-200 rounded-full h-2">
                                      <div 
                                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                                        style={{ width: `${Math.min(rec.roi / 3, 100)}%` }}
                                      />
                                    </div>
                                    <span className="text-sm font-semibold text-green-600">{rec.roi}%</span>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* History Tab */}
                    {activeTab === 'history' && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                      >
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Analysis History</h2>
                        <div className="space-y-4">
                          {analysisHistory.map((item, index) => (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="metric-card p-6 cursor-pointer hover:shadow-lg transition-all duration-300"
                              onClick={() => {
                                if (onHistoryItemClick) {
                                  onHistoryItemClick(item.question);
                                }
                                setActiveTab('overview');
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <div className="text-3xl">{item.icon}</div>
                                  <div>
                                    <h3 className="text-lg font-bold text-slate-900">{item.question}</h3>
                                    <p className="text-sm text-slate-600 mt-1">{item.summary}</p>
                                    <div className="flex items-center space-x-4 mt-2">
                                      <span className="text-xs text-slate-500">
                                        {new Date(item.timestamp).toLocaleDateString()} at {new Date(item.timestamp).toLocaleTimeString()}
                                      </span>
                                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        item.status === 'completed' ? 'bg-green-100 text-green-700' :
                                        item.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                                        'bg-red-100 text-red-700'
                                      }`}>
                                        {item.status}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-xl font-bold text-blue-600">{item.keyMetric}</div>
                                  <div className="text-sm text-slate-600">Key Metric</div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AgentFindingsExplorer;
