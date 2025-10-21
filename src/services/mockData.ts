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

export const questionSpecificData = {
  'swivel-chair': {
    title: 'Swivel Chair Pattern Analysis',
    description: 'Detect frequent app switching behaviors and inefficient transitions',
    icon: '🔄',
    findings: {
      totalSwitches: 1247,
      avgSwitchesPerUser: 8.3,
      peakSwitchingHours: ['9:00-11:00 AM', '2:00-4:00 PM'],
      mostSwitchedSystems: [
        { system: 'CRM ↔ Customer Profile', switches: 291, timeLost: '2.3 min/case' },
        { system: 'CRM ↔ Billing System', switches: 156, timeLost: '1.8 min/case' },
        { system: 'Customer Profile ↔ Inventory', switches: 89, timeLost: '1.5 min/case' },
        { system: 'Billing ↔ Help Desk', switches: 67, timeLost: '1.2 min/case' }
      ],
      userImpact: {
        highImpactUsers: 23,
        mediumImpactUsers: 45,
        lowImpactUsers: 32,
        avgContextLossTime: '45 seconds'
      },
      recommendations: [
        {
          title: 'Single-View Customer Dashboard',
          description: 'Integrate Customer Profile data directly into CRM interface',
          impact: 'Eliminates 85% of CRM ↔ Customer Profile switches',
          effort: 'Medium',
          timeline: '2-3 months',
          cost: '$25,000',
          roi: 285
        },
        {
          title: 'Universal Search Integration',
          description: 'Cross-system search capability to reduce manual navigation',
          impact: 'Reduces 60% of system switching',
          effort: 'Low',
          timeline: '1-2 months',
          cost: '$8,000',
          roi: 180
        }
      ]
    }
  },
  'repeated-edits': {
    title: 'Repeated Edit Instance Analysis',
    description: 'Analyze cases with multiple revision cycles and rework patterns',
    icon: '✏️',
    findings: {
      totalRepeatedEdits: 456,
      avgEditsPerCase: 3.2,
      mostProblematicFields: [
        { field: 'Customer Address', edits: 156, percentage: 34 },
        { field: 'Product Configuration', edits: 89, percentage: 20 },
        { field: 'Pricing Information', edits: 67, percentage: 15 },
        { field: 'Contact Details', edits: 45, percentage: 10 },
        { field: 'Order Specifications', edits: 99, percentage: 21 }
      ],
      editPatterns: {
        validationErrors: 234,
        userConfusion: 123,
        systemGlitches: 67,
        dataSyncIssues: 32
      },
      timeImpact: {
        avgTimePerEditCycle: '3.2 minutes',
        totalTimeLost: '24.3 hours/week',
        userFrustrationScore: 7.8
      },
      recommendations: [
        {
          title: 'Real-Time Field Validation',
          description: 'Implement immediate validation feedback and auto-correction',
          impact: 'Reduces 70% of repeated edits',
          effort: 'Medium',
          timeline: '1-2 months',
          cost: '$12,000',
          roi: 220
        },
        {
          title: 'Smart Auto-Complete',
          description: 'AI-powered field suggestions based on historical data',
          impact: 'Prevents 50% of validation errors',
          effort: 'High',
          timeline: '3-4 months',
          cost: '$35,000',
          roi: 150
        }
      ]
    }
  },
  'inefficient-routing': {
    title: 'Inefficient Routing Analysis',
    description: 'Identify wrong department assignments and routing bottlenecks',
    icon: '🎯',
    findings: {
      totalMisroutes: 234,
      misrouteRate: 23,
      avgResolutionTime: {
        correctRoute: '2.3 hours',
        misroute: '4.7 hours',
        difference: '104% increase'
      },
      commonMisroutes: [
        { from: 'Technical Support', to: 'Customer Service', count: 105, percentage: 45 },
        { from: 'Sales', to: 'Billing', count: 67, percentage: 29 },
        { from: 'General Inquiry', to: 'Specialized Teams', count: 45, percentage: 19 },
        { from: 'Billing', to: 'Technical Support', count: 17, percentage: 7 }
      ],
      impactMetrics: {
        customerSatisfactionDrop: 18,
        escalationRate: 34,
        resolutionTimeIncrease: 104,
        costPerMisroute: '$45'
      },
      recommendations: [
        {
          title: 'AI-Powered Case Classification',
          description: 'Machine learning model for automatic case routing',
          impact: 'Reduces misroutes by 85%',
          effort: 'High',
          timeline: '4-5 months',
          cost: '$45,000',
          roi: 200
        },
        {
          title: 'Dynamic Load Balancing',
          description: 'Intelligent routing based on team capacity and expertise',
          impact: 'Improves resolution time by 40%',
          effort: 'Medium',
          timeline: '2-3 months',
          cost: '$18,000',
          roi: 175
        }
      ]
    }
  },
  'unnecessary-approvals': {
    title: 'Unnecessary Approval Analysis',
    description: 'Find excessive manager approval bottlenecks in workflows',
    icon: '✅',
    findings: {
      totalApprovals: 567,
      unnecessaryApprovals: 193,
      unnecessaryRate: 34,
      approvalTypes: [
        { type: 'Discount Approvals', avgWait: '2.4 hours', unnecessary: 45 },
        { type: 'Account Changes', avgWait: '1.8 hours', unnecessary: 38 },
        { type: 'Refund Requests', avgWait: '3.1 hours', unnecessary: 67 },
        { type: 'Credit Adjustments', avgWait: '2.7 hours', unnecessary: 43 }
      ],
      bottleneckAnalysis: {
        managerAvailability: '30 min - 4+ hours',
        lowRiskThreshold: '$500',
        autoApprovableCases: 34,
        peakApprovalTimes: ['10:00-12:00 PM', '3:00-5:00 PM']
      },
      recommendations: [
        {
          title: 'Rule-Based Auto-Approval',
          description: 'Automated approval for low-risk, standard requests',
          impact: 'Eliminates 65% of unnecessary approvals',
          effort: 'Medium',
          timeline: '2-3 months',
          cost: '$22,000',
          roi: 250
        },
        {
          title: 'Escalation Matrix',
          description: 'Smart routing to appropriate approval levels',
          impact: 'Reduces approval time by 60%',
          effort: 'Low',
          timeline: '1-2 months',
          cost: '$8,000',
          roi: 300
        }
      ]
    }
  },
  'efficiency-report': {
    title: 'Comprehensive Efficiency Analysis',
    description: 'Comprehensive findings summary of all identified inefficiencies',
    icon: '📈',
    findings: {
      overallEfficiency: 67,
      industryBenchmark: 78,
      improvementPotential: 16,
      totalWasteIdentified: 415000,
      automationInvestment: 180000,
      netAnnualSavings: 235000,
      roi: 131,
      priorityAreas: [
        { area: 'System Integration', impact: 'High', effort: 'Medium', roi: 285 },
        { area: 'Process Automation', impact: 'High', effort: 'Low', roi: 220 },
        { area: 'Workflow Optimization', impact: 'Medium', effort: 'Medium', roi: 180 },
        { area: 'Data Synchronization', impact: 'Medium', effort: 'High', roi: 150 }
      ],
      implementationPhases: [
        {
          phase: 'Quick Wins',
          timeline: '0-3 months',
          investment: '$45,000',
          savings: '$45,000',
          initiatives: ['Field validation', 'Basic automation rules', 'Approval thresholds']
        },
        {
          phase: 'System Integration',
          timeline: '3-6 months',
          investment: '$75,000',
          savings: '$65,000',
          initiatives: ['API integrations', 'Intelligent routing', 'Automated workflows']
        },
        {
          phase: 'Advanced Automation',
          timeline: '6-12 months',
          investment: '$60,000',
          savings: '$127,000',
          initiatives: ['ML models', 'Workflow orchestration', 'Advanced analytics']
        }
      ]
    }
  }
};

export const analysisHistory = [
  {
    id: '1',
    question: 'Identify swivel chair patterns',
    questionKey: 'swivel-chair',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    status: 'completed' as const,
    summary: 'Found 1,247 system switches with 291 CRM ↔ Customer Profile switches',
    keyMetric: '1,247 switches',
    icon: '🔄'
  },
  {
    id: '2',
    question: 'Find repeated edit instances',
    questionKey: 'repeated-edits',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    status: 'completed' as const,
    summary: 'Identified 456 repeated edits with Customer Address being most problematic',
    keyMetric: '456 edits',
    icon: '✏️'
  },
  {
    id: '3',
    question: 'Analyze inefficient routing',
    questionKey: 'inefficient-routing',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    status: 'completed' as const,
    summary: '23% misroute rate with 104% increase in resolution time',
    keyMetric: '23% misroute',
    icon: '🎯'
  },
  {
    id: '4',
    question: 'Detect unnecessary approvals',
    questionKey: 'unnecessary-approvals',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    status: 'completed' as const,
    summary: '34% unnecessary approval rate with 193 unnecessary approvals',
    keyMetric: '34% unnecessary',
    icon: '✅'
  },
  {
    id: '5',
    question: 'Generate efficiency report',
    questionKey: 'efficiency-report',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    status: 'completed' as const,
    summary: '67% overall efficiency with $235,000 annual savings potential',
    keyMetric: '67% efficiency',
    icon: '📈'
  },
  {
    id: '6',
    question: 'Identify swivel chair patterns',
    questionKey: 'swivel-chair',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    status: 'completed' as const,
    summary: 'Previous analysis showed 1,156 switches with similar patterns',
    keyMetric: '1,156 switches',
    icon: '🔄'
  }
];

export const detailedFindings = {
  userBehaviorPatterns: [
    {
      id: '1',
      pattern: 'Swivel Chair Behavior',
      frequency: 291,
      impact: 'high' as const,
      description: 'Users frequently switch between CRM and Customer Profile systems',
      timeLost: '2.3 minutes per case',
      costImpact: '$45,000 annually',
      recommendation: 'Implement single-view customer dashboard'
    },
    {
      id: '2',
      pattern: 'Repeated Field Edits',
      frequency: 156,
      impact: 'medium' as const,
      description: 'Users edit the same fields multiple times due to validation issues',
      timeLost: '1.8 minutes per case',
      costImpact: '$28,000 annually',
      recommendation: 'Enhance field validation and auto-complete'
    },
    {
      id: '3',
      pattern: 'Approval Bottlenecks',
      frequency: 89,
      impact: 'high' as const,
      description: 'Cases stuck in approval workflows for extended periods',
      timeLost: '4.2 minutes per case',
      costImpact: '$52,000 annually',
      recommendation: 'Implement automated approval routing'
    },
    {
      id: '4',
      pattern: 'Manual Data Entry',
      frequency: 234,
      impact: 'medium' as const,
      description: 'Redundant data entry across multiple systems',
      timeLost: '3.1 minutes per case',
      costImpact: '$38,000 annually',
      recommendation: 'Create data synchronization automation'
    }
  ],
  efficiencyMetrics: {
    overallEfficiency: 67,
    processCompletionRate: 78,
    averageCaseTime: 12.4,
    automationReadiness: 84,
    costSavingsPotential: 127000,
    timeSavingsPotential: 8.2
  },
  systemAnalysis: {
    mostUsedSystems: [
      { name: 'CRM System', usage: 45, efficiency: 72 },
      { name: 'Customer Profile', usage: 38, efficiency: 68 },
      { name: 'Approval Workflow', usage: 28, efficiency: 54 },
      { name: 'Reporting Dashboard', usage: 22, efficiency: 81 }
    ],
    workflowStages: [
      { stage: 'Data Entry', time: 3.2, efficiency: 75 },
      { stage: 'Validation', time: 2.8, efficiency: 68 },
      { stage: 'Approval', time: 4.1, efficiency: 54 },
      { stage: 'Processing', time: 2.3, efficiency: 82 }
    ]
  },
  recommendations: [
    {
      id: '1',
      priority: 'critical' as const,
      title: 'Customer Profile Integration',
      description: 'Eliminate manual switching between CRM and Customer Profile systems',
      implementation: '3-4 months',
      cost: '$25,000',
      roi: 285,
      impact: 'Eliminates 291 swivel chair instances'
    },
    {
      id: '2',
      priority: 'high' as const,
      title: 'Smart Field Validation',
      description: 'Implement intelligent form validation to reduce repeated edits',
      implementation: '1-2 months',
      cost: '$8,000',
      roi: 180,
      impact: 'Reduces 156 repeated edit cases'
    },
    {
      id: '3',
      priority: 'high' as const,
      title: 'Automated Approval Routing',
      description: 'Streamline approval processes with intelligent routing',
      implementation: '2-3 months',
      cost: '$15,000',
      roi: 220,
      impact: 'Recovers 45% time loss in approvals'
    },
    {
      id: '4',
      priority: 'medium' as const,
      title: 'Predictive Data Entry',
      description: 'AI-powered auto-completion and data synchronization',
      implementation: '4-5 months',
      cost: '$35,000',
      roi: 125,
      impact: 'Reduces manual data entry by 60%'
    }
  ]
};