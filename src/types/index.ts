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