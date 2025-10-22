import { MockData } from '../types';

export const mockAnalysisData: MockData = {
  correlationFilter: {
    totalRecords: 2800000,
    actionableInsights: 1850000,
    processingTime: 4.7
  },
  patternAnalysis: {
    swivelChairCases: 125000,
    repeatedEdits: 89000,
    workflowBottlenecks: 15000
  },
  automationOpportunities: [
    {
      id: '1',
      title: 'Salesforce-Oracle Financials Integration',
      description: 'Automate data sync between Salesforce and Oracle Financials to eliminate 125,000 manual switches across enterprise systems',
      impact: 'high',
      effort: 'medium',
      roi: 285,
      category: 'System Integration'
    },
    {
      id: '2',
      title: 'Enterprise Form Validation',
      description: 'Implement intelligent form validation across SAP ERP and Workday to reduce 89,000 repeated edit instances',
      impact: 'high',
      effort: 'low',
      roi: 380,
      category: 'Process Optimization'
    },
    {
      id: '3',
      title: 'ServiceNow Approval Automation',
      description: 'Streamline ServiceNow approval processes to recover 65% time loss affecting 15,000 enterprise workflow bottlenecks',
      impact: 'high',
      effort: 'high',
      roi: 320,
      category: 'Workflow Management'
    },
    {
      id: '4',
      title: 'Enterprise AI Routing',
      description: 'AI-powered case routing across Oracle E-Business and SAP Ariba to eliminate wrong department assignments in Fortune 500 operations',
      impact: 'high',
      effort: 'medium',
      roi: 245,
      category: 'Intelligent Routing'
    }
  ],
  insights: [
    {
      id: '1',
      title: 'Enterprise Efficiency Score',
      description: 'Current operational efficiency across Fortune 500 enterprise systems',
      value: '73/100',
      trend: 'up',
      importance: 'critical'
    },
    {
      id: '2',
      title: 'Annual Cost Recovery',
      description: 'Potential cost savings through enterprise automation (based on Wells Fargo, Toyota scale)',
      value: '$6.8M',
      trend: 'up',
      importance: 'critical'
    },
    {
      id: '3',
      title: 'Time Savings',
      description: 'Average time saved per case through enterprise automation',
      value: '1.9 minutes',
      trend: 'up',
      importance: 'important'
    },
    {
      id: '4',
      title: 'Process Completion Rate',
      description: 'Enterprise transactions completed without manual intervention',
      value: '84%',
      trend: 'up',
      importance: 'important'
    }
  ]
};

export const predefinedQuestions = [
  {
    id: '1',
    text: 'Swivel Chair Patterns',
    description: 'Detect app switching inefficiencies',
    icon: '🔄',
    category: 'Process Efficiency',
    impact: 'High',
    estimatedTime: '2-3 min',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: '2',
    text: 'Repeated Edits',
    description: 'Find revision cycles and rework',
    icon: '✏️',
    category: 'Quality Control',
    impact: 'High',
    estimatedTime: '1-2 min',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: '3',
    text: 'Inefficient Routing',
    description: 'Identify wrong assignments',
    icon: '🎯',
    category: 'Workflow Optimization',
    impact: 'Medium',
    estimatedTime: '2-4 min',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: '4',
    text: 'Unnecessary Approvals',
    description: 'Find approval bottlenecks',
    icon: '✅',
    category: 'Approval Management',
    impact: 'High',
    estimatedTime: '1-3 min',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: '5',
    text: 'Efficiency Report',
    description: 'Comprehensive findings summary',
    icon: '📈',
    category: 'Analytics & Reporting',
    impact: 'High',
    estimatedTime: '3-5 min',
    color: 'from-indigo-500 to-purple-500'
  }
];

export const agentConfigurations = [
  {
    id: 'correlation-filter',
    name: 'Data Intelligence Engine',
    description: 'Advanced correlation analysis and insight extraction',
    duration: 3000,
    steps: [
      'Loading 2.8M enterprise records...',
      'Applying correlation filters across Fortune 500 systems...',
      'Identifying actionable insights...',
      'Found 1.85M actionable correlations'
    ]
  },
  {
    id: 'pattern-analysis',
    name: 'Behavioral Pattern Detective',
    description: 'AI-powered workflow inefficiency detection',
    duration: 4000,
    steps: [
      'Scanning enterprise user behavior patterns...',
      'Detecting swivel chair instances across Salesforce-Oracle-SAP...',
      'Analyzing repeated edit patterns...',
      'Identified 125K swivel chair cases across enterprise systems'
    ]
  },
  {
    id: 'hypothesis-generation',
    name: 'Automation Opportunity Scout',
    description: 'Intelligent automation strategy development',
    duration: 3000,
    steps: [
      'Generating enterprise automation hypotheses...',
      'Ranking by enterprise impact and effort...',
      'Calculating Fortune 500 ROI potential...',
      'Generated 18 high-impact enterprise automation opportunities'
    ]
  },
  {
    id: 'root-cause-analysis',
    name: 'Process Optimization Analyst',
    description: 'Deep-dive workflow bottleneck investigation',
    duration: 5000,
    steps: [
      'Analyzing enterprise workflow bottlenecks...',
      'Identifying root causes across ServiceNow-SAP-Oracle...',
      'Calculating enterprise time and cost impact...',
      'Analysis complete: 35% time loss in enterprise approval workflows'
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
      totalSwitches: 125000,
      avgSwitchesPerUser: 18.7,
      peakSwitchingHours: ['9:00-11:00 AM', '2:00-4:00 PM'],
      mostSwitchedSystems: [
        { system: 'Salesforce ↔ Oracle Financials', switches: 45000, timeLost: '1.8 min/case' },
        { system: 'SAP ERP ↔ Workday HCM', switches: 28000, timeLost: '1.9 min/case' },
        { system: 'Oracle E-Business ↔ ServiceNow', switches: 22000, timeLost: '1.4 min/case' },
        { system: 'ServiceNow ↔ SAP Ariba', switches: 18000, timeLost: '1.6 min/case' }
      ],
      userImpact: {
        highImpactUsers: 2300,
        mediumImpactUsers: 4500,
        lowImpactUsers: 3200,
        avgContextLossTime: '52 seconds'
      },
      recommendations: [
        {
          title: 'Salesforce-Oracle Integration Portal',
          description: 'Integrate Oracle Financials data directly into Salesforce interface for Fortune 500',
          impact: 'Eliminates 85% of Salesforce ↔ Oracle Financials switches',
          effort: 'Medium',
          timeline: '3-4 months',
          cost: '$185,000',
          roi: 285
        },
        {
          title: 'Enterprise Universal Search',
          description: 'Cross-system search across SAP-Oracle-Salesforce for enterprise users',
          impact: 'Reduces 65% of enterprise system switching',
          effort: 'Medium',
          timeline: '2-3 months',
          cost: '$95,000',
          roi: 380
        }
      ]
    }
  },
  'repeated-edits': {
    title: 'Repeated Edit Instance Analysis',
    description: 'Analyze cases with multiple revision cycles and rework patterns',
    icon: '✏️',
    findings: {
      totalRepeatedEdits: 89000,
      avgEditsPerCase: 2.8,
      mostProblematicFields: [
        { field: 'SAP Financial Account Numbers', edits: 28000, percentage: 31 },
        { field: 'Oracle Product Configurations', edits: 19000, percentage: 21 },
        { field: 'Workday Employee Information', edits: 15000, percentage: 17 },
        { field: 'Salesforce Contact Details', edits: 12000, percentage: 13 },
        { field: 'ServiceNow Ticket Classifications', edits: 15000, percentage: 17 }
      ],
      editPatterns: {
        validationErrors: 34000,
        userConfusion: 22000,
        systemGlitches: 18000,
        dataSyncIssues: 15000
      },
      timeImpact: {
        avgTimePerEditCycle: '2.8 minutes',
        totalTimeLost: '425 hours/week',
        userFrustrationScore: 6.9
      },
      recommendations: [
        {
          title: 'Enterprise Real-Time Validation',
          description: 'Implement immediate validation across SAP-Oracle-Workday systems',
          impact: 'Reduces 72% of repeated edits across enterprise systems',
          effort: 'Medium',
          timeline: '2-3 months',
          cost: '$145,000',
          roi: 245
        },
        {
          title: 'AI-Powered Enterprise Auto-Complete',
          description: 'Fortune 500 AI suggestions based on enterprise historical data',
          impact: 'Prevents 58% of validation errors across enterprise',
          effort: 'High',
          timeline: '4-5 months',
          cost: '$285,000',
          roi: 350
        }
      ]
    }
  },
  'inefficient-routing': {
    title: 'Inefficient Routing Analysis',
    description: 'Identify wrong department assignments and routing bottlenecks',
    icon: '🎯',
    findings: {
      totalMisroutes: 18500,
      misrouteRate: 18,
      avgResolutionTime: {
        correctRoute: '1.9 hours',
        misroute: '3.8 hours',
        difference: '85% increase'
      },
      commonMisroutes: [
        { from: 'ServiceNow Technical', to: 'Oracle Financial Support', count: 8200, percentage: 44 },
        { from: 'SAP Sales Module', to: 'Workday HR', count: 5400, percentage: 29 },
        { from: 'Salesforce General', to: 'Oracle Specialized Teams', count: 3100, percentage: 17 },
        { from: 'Oracle Billing', to: 'SAP Technical', count: 1800, percentage: 10 }
      ],
      impactMetrics: {
        customerSatisfactionDrop: 15,
        escalationRate: 28,
        resolutionTimeIncrease: 85,
        costPerMisroute: '$125'
      },
      recommendations: [
        {
          title: 'Enterprise AI Case Classification',
          description: 'ML model for automatic routing across ServiceNow-Oracle-SAP enterprise systems',
          impact: 'Reduces enterprise misroutes by 88%',
          effort: 'High',
          timeline: '5-6 months',
          cost: '$365,000',
          roi: 195
        },
        {
          title: 'Enterprise Dynamic Load Balancing',
          description: 'Intelligent routing across Fortune 500 team capacity and expertise',
          impact: 'Improves enterprise resolution time by 45%',
          effort: 'Medium',
          timeline: '3-4 months',
          cost: '$195,000',
          roi: 245
        }
      ]
    }
  },
  'unnecessary-approvals': {
    title: 'Unnecessary Approval Analysis',
    description: 'Find excessive manager approval bottlenecks in workflows',
    icon: '✅',
    findings: {
      totalApprovals: 45000,
      unnecessaryApprovals: 12600,
      unnecessaryRate: 28,
      approvalTypes: [
        { type: 'SAP Financial Approvals', avgWait: '2.1 hours', unnecessary: 3800 },
        { type: 'Oracle Account Changes', avgWait: '1.6 hours', unnecessary: 3200 },
        { type: 'Workday Refund Requests', avgWait: '2.8 hours', unnecessary: 3100 },
        { type: 'Salesforce Credit Adjustments', avgWait: '2.3 hours', unnecessary: 2500 }
      ],
      bottleneckAnalysis: {
        managerAvailability: '45 min - 6+ hours',
        lowRiskThreshold: '$5,000',
        autoApprovableCases: 28,
        peakApprovalTimes: ['10:00-12:00 PM', '3:00-5:00 PM']
      },
      recommendations: [
        {
          title: 'Enterprise Rule-Based Auto-Approval',
          description: 'Automated approval for low-risk requests across SAP-Oracle-Workday',
          impact: 'Eliminates 68% of unnecessary enterprise approvals',
          effort: 'Medium',
          timeline: '3-4 months',
          cost: '$175,000',
          roi: 185
        },
        {
          title: 'Enterprise Escalation Matrix',
          description: 'Smart routing across Fortune 500 approval hierarchies',
          impact: 'Reduces enterprise approval time by 65%',
          effort: 'Medium',
          timeline: '2-3 months',
          cost: '$125,000',
          roi: 220
        }
      ]
    }
  },
  'efficiency-report': {
    title: 'Comprehensive Efficiency Analysis',
    description: 'Comprehensive findings summary of all identified inefficiencies',
    icon: '📈',
    findings: {
      overallEfficiency: 73,
      industryBenchmark: 82,
      improvementPotential: 12,
      totalWasteIdentified: 8200000,
      automationInvestment: 1850000,
      netAnnualSavings: 6800000,
      roi: 268,
      priorityAreas: [
        { area: 'Enterprise System Integration', impact: 'High', effort: 'Medium', roi: 285 },
        { area: 'Fortune 500 Process Automation', impact: 'High', effort: 'Medium', roi: 245 },
        { area: 'Enterprise Workflow Optimization', impact: 'High', effort: 'Medium', roi: 380 },
        { area: 'Multi-System Data Synchronization', impact: 'High', effort: 'High', roi: 350 }
      ],
      implementationPhases: [
        {
          phase: 'Enterprise Quick Wins',
          timeline: '0-4 months',
          investment: '$485,000',
          savings: '$1,200,000',
          initiatives: ['Enterprise field validation', 'Multi-system automation rules', 'Approval thresholds']
        },
        {
          phase: 'Fortune 500 System Integration',
          timeline: '4-8 months',
          investment: '$785,000',
          savings: '$2,400,000',
          initiatives: ['Salesforce-Oracle-SAP integrations', 'Enterprise intelligent routing', 'Automated workflows']
        },
        {
          phase: 'Advanced Enterprise Automation',
          timeline: '8-15 months',
          investment: '$580,000',
          savings: '$3,200,000',
          initiatives: ['Enterprise ML models', 'Multi-system workflow orchestration', 'Fortune 500 analytics']
        }
      ]
    }
  }
};

export const analysisHistory = [
  {
    id: '1',
    customerName: 'Wells Fargo',
    enterpriseSystem: 'Salesforce',
    question: 'Identify swivel chair patterns',
    questionKey: 'swivel-chair',
    timestamp: new Date('2024-10-20T14:30:00').toISOString(),
    lastAnalysisDate: '10/20/2024',
    status: 'completed' as const,
    summary: 'Found 45K system switches between Salesforce ↔ Oracle Financials',
    keyMetric: '45K switches',
    icon: '🔄',
    results: {
      totalRecords: 1250000,
      costSavings: '$2.4M',
      timesSaved: '2.3 min/case',
      efficiencyGain: '24%',
      automationOpportunities: 8,
      roi: 285
    }
  },
  {
    id: '2',
    customerName: 'Toyota Motor Corp.',
    enterpriseSystem: 'SAP ERP',
    question: 'Efficiency Report Generation',
    questionKey: 'efficiency-report',
    timestamp: new Date('2024-10-18T11:20:00').toISOString(),
    lastAnalysisDate: '10/18/2024',
    status: 'completed' as const,
    summary: 'Comprehensive analysis of 2.2M supply chain events with $6.8M efficiency gains',
    keyMetric: '$6.8M savings',
    icon: '📈',
    results: {
      totalRecords: 2200000,
      costSavings: '$8.2M',
      timesSaved: '4.2% delivery improvement',
      efficiencyGain: '28%',
      automationOpportunities: 15,
      roi: 320
    }
  },
  {
    id: '3',
    customerName: 'JPMorgan Chase',
    enterpriseSystem: 'Oracle Finance',
    question: 'Find repeated edit instances',
    questionKey: 'repeated-edits',
    timestamp: new Date('2024-10-17T16:45:00').toISOString(),
    lastAnalysisDate: '10/17/2024',
    status: 'completed' as const,
    summary: 'Identified 28K repeated edits in financial journal entries',
    keyMetric: '28K edits',
    icon: '✏️',
    results: {
      totalRecords: 890000,
      costSavings: '$3.8M',
      timesSaved: '2.8 min/edit',
      efficiencyGain: '31%',
      automationOpportunities: 6,
      roi: 245
    }
  },
  {
    id: '4',
    customerName: 'Microsoft',
    enterpriseSystem: 'ServiceNow',
    question: 'Analyze inefficient routing',
    questionKey: 'inefficient-routing',
    timestamp: new Date('2024-10-16T13:10:00').toISOString(),
    lastAnalysisDate: '10/16/2024',
    status: 'completed' as const,
    summary: '18% misroute rate in ServiceNow ticket routing with $2.8M savings potential',
    keyMetric: '18% misroute',
    icon: '🎯',
    results: {
      totalRecords: 520000,
      costSavings: '$3.1M',
      timesSaved: '1.7 min faster resolution',
      efficiencyGain: '22%',
      automationOpportunities: 5,
      roi: 195
    }
  },
  {
    id: '5',
    customerName: 'Walmart',
    enterpriseSystem: 'Workday HCM',
    question: 'Detect unnecessary approvals',
    questionKey: 'unnecessary-approvals',
    timestamp: new Date('2024-10-15T09:15:00').toISOString(),
    lastAnalysisDate: '10/15/2024',
    status: 'completed' as const,
    summary: '28% unnecessary approval rate in HR workflows affecting 320K employees',
    keyMetric: '28% unnecessary',
    icon: '✅',
    results: {
      totalRecords: 320000,
      costSavings: '$2.8M',
      timesSaved: '3.2% attrition reduction',
      efficiencyGain: '18%',
      automationOpportunities: 7,
      roi: 185
    }
  }
];

export const detailedFindings = {
  userBehaviorPatterns: [
    {
      id: '1',
      pattern: 'Enterprise Swivel Chair Behavior',
      frequency: 45000,
      impact: 'high' as const,
      description: 'Users frequently switch between Salesforce and Oracle Financials enterprise systems',
      timeLost: '1.8 minutes per case',
      costImpact: '$2.4M annually',
      recommendation: 'Implement Salesforce-Oracle integration portal'
    },
    {
      id: '2',
      pattern: 'SAP Field Edit Repetition',
      frequency: 28000,
      impact: 'high' as const,
      description: 'Users edit SAP financial fields multiple times due to validation complexity',
      timeLost: '1.9 minutes per case',
      costImpact: '$1.8M annually',
      recommendation: 'Enhance SAP-Oracle field validation and auto-complete'
    },
    {
      id: '3',
      pattern: 'ServiceNow Approval Bottlenecks',
      frequency: 12600,
      impact: 'high' as const,
      description: 'Enterprise cases stuck in ServiceNow approval workflows',
      timeLost: '2.8 minutes per case',
      costImpact: '$1.5M annually',
      recommendation: 'Implement enterprise automated approval routing'
    },
    {
      id: '4',
      pattern: 'Multi-System Data Entry',
      frequency: 22000,
      impact: 'high' as const,
      description: 'Redundant data entry across Oracle-SAP-Workday enterprise systems',
      timeLost: '2.1 minutes per case',
      costImpact: '$1.1M annually',
      recommendation: 'Create enterprise data synchronization automation'
    }
  ],
  efficiencyMetrics: {
    overallEfficiency: 73,
    processCompletionRate: 84,
    averageCaseTime: 9.8,
    automationReadiness: 88,
    costSavingsPotential: 6800000,
    timeSavingsPotential: 18.5
  },
  systemAnalysis: {
    mostUsedSystems: [
      { name: 'Salesforce Enterprise', usage: 48, efficiency: 78 },
      { name: 'Oracle Financials', usage: 42, efficiency: 74 },
      { name: 'SAP ERP', usage: 39, efficiency: 71 },
      { name: 'ServiceNow', usage: 35, efficiency: 69 },
      { name: 'Workday HCM', usage: 28, efficiency: 82 }
    ],
    workflowStages: [
      { stage: 'Enterprise Data Entry', time: 2.8, efficiency: 79 },
      { stage: 'Multi-System Validation', time: 2.1, efficiency: 74 },
      { stage: 'Fortune 500 Approval', time: 3.2, efficiency: 65 },
      { stage: 'Enterprise Processing', time: 1.7, efficiency: 86 }
    ]
  },
  recommendations: [
    {
      id: '1',
      priority: 'critical' as const,
      title: 'Salesforce-Oracle Enterprise Integration',
      description: 'Eliminate manual switching between Salesforce and Oracle Financials across Fortune 500',
      implementation: '4-5 months',
      cost: '$185,000',
      roi: 285,
      impact: 'Eliminates 45,000 enterprise swivel chair instances'
    },
    {
      id: '2',
      priority: 'critical' as const,
      title: 'Enterprise Field Validation',
      description: 'Implement intelligent validation across SAP-Oracle-Workday systems',
      implementation: '2-3 months',
      cost: '$145,000',
      roi: 245,
      impact: 'Reduces 28,000 SAP repeated edit cases'
    },
    {
      id: '3',
      priority: 'high' as const,
      title: 'ServiceNow Enterprise Approval Routing',
      description: 'Streamline Fortune 500 approval processes with intelligent routing',
      implementation: '3-4 months',
      cost: '$175,000',
      roi: 185,
      impact: 'Recovers 65% time loss in enterprise approvals'
    },
    {
      id: '4',
      priority: 'high' as const,
      title: 'Multi-System Data Orchestration',
      description: 'AI-powered data synchronization across Oracle-SAP-Workday enterprise systems',
      implementation: '5-6 months',
      cost: '$285,000',
      roi: 350,
      impact: 'Reduces enterprise manual data entry by 72%'
    }
  ]
};