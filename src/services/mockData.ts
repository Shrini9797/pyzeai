import { MockData } from '../types';

export const mockAnalysisData: MockData = {
  correlationFilter: {
    totalRecords: 1275,
    actionableInsights: 847,
    processingTime: 3.2
  },
  patternAnalysis: {
    swivelChairCases: 291,
    repeatedEdits: 156,
    workflowBottlenecks: 45
  },
  automationOpportunities: [
    {
      id: '1',
      title: 'Customer Profile Integration',
      description: 'Automate data sync between CRM and Customer Profile system to eliminate 291 manual switches',
      impact: 'high',
      effort: 'medium',
      roi: 285,
      category: 'System Integration'
    },
    {
      id: '2',
      title: 'Smart Field Validation',
      description: 'Implement intelligent form validation to reduce 156 repeated edit instances',
      impact: 'high',
      effort: 'low',
      roi: 180,
      category: 'Process Optimization'
    },
    {
      id: '3',
      title: 'Approval Workflow Automation',
      description: 'Streamline approval processes to recover 45% time loss in workflow stages',
      impact: 'medium',
      effort: 'high',
      roi: 220,
      category: 'Workflow Management'
    },
    {
      id: '4',
      title: 'Predictive Routing',
      description: 'AI-powered case routing to eliminate wrong department assignments',
      impact: 'medium',
      effort: 'medium',
      roi: 125,
      category: 'Intelligent Routing'
    }
  ],
  insights: [
    {
      id: '1',
      title: 'Workflow Efficiency Score',
      description: 'Current operational efficiency with identified improvement areas',
      value: '67/100',
      trend: 'up',
      importance: 'critical'
    },
    {
      id: '2',
      title: 'Annual Cost Recovery',
      description: 'Potential cost savings through process automation',
      value: '$127,000',
      trend: 'up',
      importance: 'critical'
    },
    {
      id: '3',
      title: 'Time Savings',
      description: 'Average time saved per case through automation',
      value: '2.3 minutes',
      trend: 'up',
      importance: 'important'
    },
    {
      id: '4',
      title: 'Process Completion Rate',
      description: 'Cases completed without manual intervention',
      value: '78%',
      trend: 'stable',
      importance: 'important'
    }
  ]
};

export const predefinedQuestions = [
  {
    id: '1',
    text: 'Identify swivel chair patterns',
    description: 'Detect frequent app switching behaviors and inefficient transitions',
    icon: '🔄'
  },
  {
    id: '2',
    text: 'Find repeated edit instances',
    description: 'Analyze cases with multiple revision cycles and rework patterns',
    icon: '✏️'
  },
  {
    id: '3',
    text: 'Analyze inefficient routing',
    description: 'Identify wrong department assignments and routing bottlenecks',
    icon: '🎯'
  },
  {
    id: '4',
    text: 'Detect unnecessary approvals',
    description: 'Find excessive manager approval bottlenecks in workflows',
    icon: '✅'
  },
  {
    id: '5',
    text: 'Generate efficiency report',
    description: 'Comprehensive findings summary of all identified inefficiencies',
    icon: '📈'
  }
];

export const agentConfigurations = [
  {
    id: 'correlation-filter',
    name: 'Data Intelligence Engine',
    description: 'Advanced correlation analysis and insight extraction',
    duration: 3000,
    steps: [
      'Loading 1,275 records...',
      'Applying correlation filters...',
      'Identifying actionable insights...',
      'Found 847 actionable correlations'
    ]
  },
  {
    id: 'pattern-analysis',
    name: 'Behavioral Pattern Detective',
    description: 'AI-powered workflow inefficiency detection',
    duration: 4000,
    steps: [
      'Scanning user behavior patterns...',
      'Detecting swivel chair instances...',
      'Analyzing repeated edit patterns...',
      'Identified 291 swivel chair cases to Customer Profile system'
    ]
  },
  {
    id: 'hypothesis-generation',
    name: 'Automation Opportunity Scout',
    description: 'Intelligent automation strategy development',
    duration: 3000,
    steps: [
      'Generating automation hypotheses...',
      'Ranking by impact and effort...',
      'Calculating ROI potential...',
      'Generated 12 high-impact automation opportunities'
    ]
  },
  {
    id: 'root-cause-analysis',
    name: 'Process Optimization Analyst',
    description: 'Deep-dive workflow bottleneck investigation',
    duration: 5000,
    steps: [
      'Analyzing workflow bottlenecks...',
      'Identifying root causes...',
      'Calculating time and cost impact...',
      'Analysis complete: 45% time loss in approval workflows'
    ]
  },
  {
    id: 'report-generation',
    name: 'Executive Intelligence Reporter',
    description: 'AI-powered strategic insights compilation',
    duration: 2000,
    steps: [
      'Compiling analysis results...',
      'Generating executive summary...',
      'Creating visualizations...',
      'Comprehensive report ready for review'
    ]
  }
];