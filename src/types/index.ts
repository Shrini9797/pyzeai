export interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export interface Agent {
  id: string;
  name: string;
  status: 'idle' | 'processing' | 'completed';
  progress: number;
  result?: string;
  metrics?: AgentMetrics;
}

export interface AgentMetrics {
  recordsProcessed?: number;
  patternsFound?: number;
  timeSpent?: number;
  efficiency?: number;
}

export interface AnalysisResult {
  totalRecords: number;
  swivelChairCases: number;
  repeatedEdits: number;
  workflowEfficiency: number;
  costImpact: number;
  automationOpportunities: AutomationOpportunity[];
  insights: Insight[];
}

export interface AutomationOpportunity {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'high' | 'medium' | 'low';
  roi: number;
  category: string;
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  value: string;
  trend: 'up' | 'down' | 'stable';
  importance: 'critical' | 'important' | 'moderate';
}

export interface ChatState {
  messages: Message[];
  isProcessing: boolean;
  agents: Agent[];
  analysisResult?: AnalysisResult;
  currentStep: number;
  showReport: boolean;
}

export interface MockData {
  correlationFilter: {
    totalRecords: number;
    actionableInsights: number;
    processingTime: number;
  };
  patternAnalysis: {
    swivelChairCases: number;
    repeatedEdits: number;
    workflowBottlenecks: number;
  };
  automationOpportunities: AutomationOpportunity[];
  insights: Insight[];
}

export interface UserBehaviorPattern {
  id: string;
  pattern: string;
  frequency: number;
  impact: 'high' | 'medium' | 'low';
  description: string;
  timeLost: string;
  costImpact: string;
  recommendation: string;
}

export interface EfficiencyMetrics {
  overallEfficiency: number;
  processCompletionRate: number;
  averageCaseTime: number;
  automationReadiness: number;
  costSavingsPotential: number;
  timeSavingsPotential: number;
}

export interface SystemUsage {
  name: string;
  usage: number;
  efficiency: number;
}

export interface WorkflowStage {
  stage: string;
  time: number;
  efficiency: number;
}

export interface DetailedRecommendation {
  id: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  implementation: string;
  cost: string;
  roi: number;
  impact: string;
}

export interface AnalysisHistoryItem {
  id: string;
  question: string;
  questionKey: string;
  timestamp: string;
  status: 'completed' | 'in-progress' | 'failed';
  summary: string;
  keyMetric: string;
  icon: string;
}

export interface DetailedFindings {
  userBehaviorPatterns: UserBehaviorPattern[];
  efficiencyMetrics: EfficiencyMetrics;
  systemAnalysis: {
    mostUsedSystems: SystemUsage[];
    workflowStages: WorkflowStage[];
  };
  recommendations: DetailedRecommendation[];
}

export interface QuestionSpecificData {
  title: string;
  description: string;
  icon: string;
  findings: any; // This will be typed based on the specific question type
}

export interface SwivelChairData {
  totalSwitches: number;
  avgSwitchesPerUser: number;
  peakSwitchingHours: string[];
  mostSwitchedSystems: Array<{
    system: string;
    switches: number;
    timeLost: string;
  }>;
  userImpact: {
    highImpactUsers: number;
    mediumImpactUsers: number;
    lowImpactUsers: number;
    avgContextLossTime: string;
  };
  recommendations: DetailedRecommendation[];
}

export interface RepeatedEditsData {
  totalRepeatedEdits: number;
  avgEditsPerCase: number;
  mostProblematicFields: Array<{
    field: string;
    edits: number;
    percentage: number;
  }>;
  editPatterns: {
    validationErrors: number;
    userConfusion: number;
    systemGlitches: number;
    dataSyncIssues: number;
  };
  timeImpact: {
    avgTimePerEditCycle: string;
    totalTimeLost: string;
    userFrustrationScore: number;
  };
  recommendations: DetailedRecommendation[];
}

export interface InefficientRoutingData {
  totalMisroutes: number;
  misrouteRate: number;
  avgResolutionTime: {
    correctRoute: string;
    misroute: string;
    difference: string;
  };
  commonMisroutes: Array<{
    from: string;
    to: string;
    count: number;
    percentage: number;
  }>;
  impactMetrics: {
    customerSatisfactionDrop: number;
    escalationRate: number;
    resolutionTimeIncrease: number;
    costPerMisroute: string;
  };
  recommendations: DetailedRecommendation[];
}

export interface UnnecessaryApprovalsData {
  totalApprovals: number;
  unnecessaryApprovals: number;
  unnecessaryRate: number;
  approvalTypes: Array<{
    type: string;
    avgWait: string;
    unnecessary: number;
  }>;
  bottleneckAnalysis: {
    managerAvailability: string;
    lowRiskThreshold: string;
    autoApprovableCases: number;
    peakApprovalTimes: string[];
  };
  recommendations: DetailedRecommendation[];
}

export interface EfficiencyReportData {
  overallEfficiency: number;
  industryBenchmark: number;
  improvementPotential: number;
  totalWasteIdentified: number;
  automationInvestment: number;
  netAnnualSavings: number;
  roi: number;
  priorityAreas: Array<{
    area: string;
    impact: string;
    effort: string;
    roi: number;
  }>;
  implementationPhases: Array<{
    phase: string;
    timeline: string;
    investment: string;
    savings: string;
    initiatives: string[];
  }>;
}