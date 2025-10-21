import html2pdf from 'html2pdf.js';
import { mockAnalysisData } from '../services/mockData';

export const generateReportPDF = async () => {
  // Get the report modal content - capture the EXACT same report as shown in chat
  const reportElement = document.querySelector('.bg-white.rounded-3xl') as HTMLElement;
  
  if (!reportElement) {
    console.error('Report modal element not found');
    return;
  }

  // Capture the exact same report as displayed - no modifications, no regeneration
  const options = {
    margin: [5, 5, 5, 5] as [number, number, number, number],
    filename: `PyZe_AI_Report_${new Date().toISOString().split('T')[0]}.pdf`,
    image: { type: 'jpeg' as const, quality: 0.95 },
    html2canvas: {
      scale: 1.5, // Lower scale for exact capture
      useCORS: true,
      letterRendering: true,
      allowTaint: true,
      backgroundColor: null, // Keep original background
      logging: false,
      // Capture exact report dimensions
      width: reportElement.scrollWidth,
      height: reportElement.scrollHeight,
      scrollX: 0,
      scrollY: 0,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    },
    jsPDF: {
      unit: 'mm' as const,
      format: 'a4' as const,
      orientation: 'portrait' as const,
      compress: true
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };

  try {
    // Capture the exact same report without any modifications
    await html2pdf().set(options).from(reportElement).save();
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};

export const generatePDFReport = async (selectedQuestion?: string) => {
  // Generate the HTML content
  const htmlContent = generateDetailedHTMLReport(selectedQuestion);

  // Create a temporary div to hold the HTML
  const element = document.createElement('div');
  element.innerHTML = htmlContent;
  element.style.width = '210mm'; // A4 width
  element.style.margin = '0 auto';
  element.style.backgroundColor = 'white';

  // Temporarily add to DOM for html2pdf processing
  document.body.appendChild(element);

  const options = {
    margin: [10, 10, 10, 10] as [number, number, number, number],
    filename: `PyZe_AI_Analysis_Report_${new Date().toISOString().split('T')[0]}.pdf`,
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
      width: 794, // A4 width in pixels at 96 DPI
      height: 1123 // A4 height in pixels at 96 DPI
    },
    jsPDF: {
      unit: 'mm' as const,
      format: 'a4' as const,
      orientation: 'portrait' as const,
      compress: true
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };

  try {
    await html2pdf().set(options).from(element).save();
  } finally {
    // Clean up - remove the temporary element
    document.body.removeChild(element);
  }
};

export const generateDetailedHTMLReport = (selectedQuestion?: string) => {
  const reportData = {
    title: 'PyZe AI Automation - Agent Findings Explorer',
    timestamp: new Date().toISOString(),
    selectedQuestion,
    insights: mockAnalysisData.insights,
    automationOpportunities: mockAnalysisData.automationOpportunities,
    correlationFilter: mockAnalysisData.correlationFilter,
    patternAnalysis: mockAnalysisData.patternAnalysis
  };

  // Generate detailed analysis based on the selected question
  const getQuestionSpecificAnalysis = () => {
    if (!selectedQuestion) return '';

    switch (selectedQuestion.toLowerCase()) {
      case 'identify swivel chair patterns':
        return `
          <div class="section">
            <h2 class="section-title">🔄 Swivel Chair Pattern Analysis</h2>
            <div class="detailed-analysis">
              <div class="analysis-card">
                <h3>Customer Profile System Integration Issues</h3>
                <p><strong>Identified Pattern:</strong> 291 instances of users switching between the main application and Customer Profile system</p>
                <p><strong>Average Time Lost:</strong> 45 seconds per switch (total: 3.6 hours daily across team)</p>
                <p><strong>Peak Times:</strong> 9:00-11:00 AM and 2:00-4:00 PM when customer inquiries are highest</p>
                <p><strong>Most Affected Users:</strong> Customer Service Representatives and Account Managers</p>
              </div>

              <div class="analysis-card">
                <h3>Secondary System Switches</h3>
                <ul>
                  <li>Billing System: 156 manual switches per day</li>
                  <li>Inventory Management: 89 switches per day</li>
                  <li>Help Desk System: 67 switches per day</li>
                </ul>
              </div>

              <div class="analysis-card">
                <h3>Automation Recommendation</h3>
                <p><strong>Solution:</strong> API integration to embed Customer Profile data directly into main workflow</p>
                <p><strong>Implementation Time:</strong> 2-3 months</p>
                <p><strong>Expected Reduction:</strong> 85% of manual switches eliminated</p>
                <p><strong>ROI:</strong> $285,000 annually</p>
              </div>
            </div>
          </div>
        `;

      case 'find repeated edit instances':
        return `
          <div class="section">
            <h2 class="section-title">✏️ Repeated Edit Pattern Analysis</h2>
            <div class="detailed-analysis">
              <div class="analysis-card">
                <h3>Field Validation Issues</h3>
                <p><strong>Total Repeated Edits:</strong> 156 instances identified</p>
                <p><strong>Most Problematic Fields:</strong></p>
                <ul>
                  <li>Customer Address (42% of all repeated edits)</li>
                  <li>Product Configuration (28% of all repeated edits)</li>
                  <li>Pricing Information (18% of all repeated edits)</li>
                  <li>Contact Details (12% of all repeated edits)</li>
                </ul>
              </div>

              <div class="analysis-card">
                <h3>Root Cause Analysis</h3>
                <p><strong>Validation Timing:</strong> Most validation errors occur after form submission rather than real-time</p>
                <p><strong>User Frustration Points:</strong> Users report unclear error messages and lack of field-level guidance</p>
                <p><strong>Time Impact:</strong> Average 3.2 minutes per repeated edit cycle</p>
              </div>

              <div class="analysis-card">
                <h3>Smart Validation Solution</h3>
                <p><strong>Real-time Validation:</strong> Implement immediate field-level feedback</p>
                <p><strong>Auto-correction:</strong> Address formatting and common data entry errors</p>
                <p><strong>Expected Improvement:</strong> 70% reduction in repeated edits</p>
                <p><strong>ROI:</strong> $180,000 annually from time savings</p>
              </div>
            </div>
          </div>
        `;

      case 'analyze inefficient routing':
        return `
          <div class="section">
            <h2 class="section-title">🎯 Routing Efficiency Analysis</h2>
            <div class="detailed-analysis">
              <div class="analysis-card">
                <h3>Misrouted Cases</h3>
                <p><strong>Incorrect Department Assignment:</strong> 23% of cases initially routed to wrong department</p>
                <p><strong>Most Common Misroutes:</strong></p>
                <ul>
                  <li>Technical Support → Customer Service: 45% of misroutes</li>
                  <li>Sales → Billing: 28% of misroutes</li>
                  <li>General Inquiry → Specialized Teams: 27% of misroutes</li>
                </ul>
              </div>

              <div class="analysis-card">
                <h3>Resolution Time Impact</h3>
                <p><strong>Correctly Routed Cases:</strong> Average 2.3 hours to resolution</p>
                <p><strong>Misrouted Cases:</strong> Average 4.7 hours to resolution (104% increase)</p>
                <p><strong>Customer Satisfaction Impact:</strong> 18% lower CSAT scores for misrouted cases</p>
              </div>

              <div class="analysis-card">
                <h3>AI-Powered Routing Solution</h3>
                <p><strong>Machine Learning Classification:</strong> Analyze case content and route automatically</p>
                <p><strong>Dynamic Load Balancing:</strong> Consider team capacity and expertise</p>
                <p><strong>Expected Accuracy:</strong> 92% correct routing (vs. current 77%)</p>
                <p><strong>ROI:</strong> $125,000 annually from improved efficiency</p>
              </div>
            </div>
          </div>
        `;

      case 'detect unnecessary approvals':
        return `
          <div class="section">
            <h2 class="section-title">✅ Approval Process Analysis</h2>
            <div class="detailed-analysis">
              <div class="analysis-card">
                <h3>Approval Bottlenecks</h3>
                <p><strong>Time Loss in Approval Stages:</strong> 45% of total workflow time</p>
                <p><strong>Approval Types Analyzed:</strong></p>
                <ul>
                  <li>Discount Approvals: Average 2.4 hours wait time</li>
                  <li>Account Changes: Average 1.8 hours wait time</li>
                  <li>Refund Requests: Average 3.1 hours wait time</li>
                  <li>Credit Adjustments: Average 2.7 hours wait time</li>
                </ul>
              </div>

              <div class="analysis-card">
                <h3>Unnecessary Approval Analysis</h3>
                <p><strong>Auto-Approvable Cases:</strong> 34% of approvals could be automated based on business rules</p>
                <p><strong>Low-Risk Thresholds:</strong> 67% of approvals are under $500 value</p>
                <p><strong>Manager Availability:</strong> Average response time varies from 30 minutes to 4+ hours</p>
              </div>

              <div class="analysis-card">
                <h3>Automated Approval Solution</h3>
                <p><strong>Rule-Based Automation:</strong> Auto-approve low-risk, standard requests</p>
                <p><strong>Escalation Matrix:</strong> Route high-value cases to appropriate approval level</p>
                <p><strong>Expected Time Reduction:</strong> 65% faster approval processing</p>
                <p><strong>ROI:</strong> $220,000 annually from workflow acceleration</p>
              </div>
            </div>
          </div>
        `;

      case 'generate efficiency report':
        return `
          <div class="section">
            <h2 class="section-title">📈 Comprehensive Efficiency Analysis</h2>
            <div class="detailed-analysis">
              <div class="analysis-card">
                <h3>Overall Efficiency Metrics</h3>
                <p><strong>Current Efficiency Score:</strong> 67/100</p>
                <p><strong>Industry Benchmark:</strong> 78/100</p>
                <p><strong>Improvement Potential:</strong> 16% efficiency gain possible</p>
                <p><strong>Total Automation Opportunities:</strong> 12 high-impact areas identified</p>
              </div>

              <div class="analysis-card">
                <h3>Cost-Benefit Analysis</h3>
                <p><strong>Current Annual Operational Cost:</strong> $2.4M</p>
                <p><strong>Identified Waste:</strong> $415,000 annually</p>
                <p><strong>Automation Investment Required:</strong> $180,000</p>
                <p><strong>Net Annual Savings:</strong> $235,000 (131% ROI)</p>
              </div>

              <div class="analysis-card">
                <h3>Priority Implementation Plan</h3>
                <p><strong>Quick Wins (0-3 months):</strong> Field validation, basic automation rules</p>
                <p><strong>Medium Term (3-6 months):</strong> System integration, routing optimization</p>
                <p><strong>Long Term (6-12 months):</strong> Advanced AI, full workflow automation</p>
                <p><strong>Expected Timeline to ROI:</strong> 8 months</p>
              </div>
            </div>
          </div>
        `;

      default:
        return '';
    }
  };

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>PyZe AI Analysis Report</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #1a202c;
                background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
                font-size: 12px;
                margin: 0;
                padding: 20px;
            }
            .container {
                max-width: 210mm;
                margin: 0 auto;
                padding: 25px;
                background: white;
                border-radius: 12px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px 20px;
                margin-bottom: 30px;
                border-radius: 12px;
                page-break-after: avoid;
            }
            .title {
                color: white;
                font-size: 32px;
                font-weight: bold;
                margin-bottom: 8px;
                text-shadow: 0 2px 4px rgba(0,0,0,0.3);
            }
            .subtitle {
                color: rgba(255,255,255,0.9);
                font-size: 18px;
                margin-bottom: 12px;
            }
            .date {
                color: rgba(255,255,255,0.8);
                font-size: 13px;
            }
            .section {
                margin-bottom: 30px;
                page-break-inside: avoid;
            }
            .section-title {
                color: #2d3748;
                font-size: 22px;
                font-weight: bold;
                margin-bottom: 15px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                border-left: 4px solid #667eea;
                padding-left: 15px;
                page-break-after: avoid;
            }
            .metrics-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
                margin-bottom: 20px;
            }
            .metric-card {
                background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
                padding: 18px;
                border-radius: 12px;
                border: 1px solid #e2e8f0;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
                page-break-inside: avoid;
            }
            .metric-value {
                font-size: 28px;
                font-weight: bold;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                margin-bottom: 5px;
            }
            .metric-label {
                color: #2d3748;
                font-size: 14px;
                font-weight: 600;
                margin-bottom: 5px;
            }
            .metric-description {
                color: #4a5568;
                font-size: 11px;
            }
            .opportunity {
                background: linear-gradient(135deg, #f0fff4 0%, #ecfdf5 100%);
                padding: 18px;
                border-radius: 12px;
                margin-bottom: 15px;
                border: 1px solid #a7f3d0;
                border-left: 4px solid #10b981;
                box-shadow: 0 2px 4px rgba(16, 185, 129, 0.1);
                page-break-inside: avoid;
            }
            .opportunity-title {
                font-weight: bold;
                color: #065f46;
                margin-bottom: 8px;
                font-size: 15px;
            }
            .opportunity-meta {
                font-size: 11px;
                color: #047857;
                margin-bottom: 8px;
                font-weight: 500;
            }
            .opportunity-description {
                font-size: 12px;
                color: #064e3b;
                line-height: 1.5;
            }
            .findings-list {
                list-style: none;
                padding: 0;
            }
            .findings-list li {
                background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
                padding: 15px;
                margin-bottom: 10px;
                border-radius: 8px;
                border: 1px solid #fde68a;
                border-left: 4px solid #f59e0b;
                font-size: 12px;
                box-shadow: 0 2px 4px rgba(245, 158, 11, 0.1);
                page-break-inside: avoid;
            }
            .roadmap-phase {
                background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
                padding: 18px;
                border-radius: 12px;
                margin-bottom: 15px;
                border: 1px solid #c4b5fd;
                border-left: 4px solid #8b5cf6;
                box-shadow: 0 2px 4px rgba(139, 92, 246, 0.1);
                page-break-inside: avoid;
            }
            .phase-title {
                font-weight: bold;
                color: #581c87;
                margin-bottom: 8px;
                font-size: 15px;
            }
            .phase-description {
                color: #6b46c1;
                margin-bottom: 8px;
                font-size: 12px;
                line-height: 1.5;
            }
            .roi-highlight {
                color: #059669;
                font-weight: bold;
                font-size: 14px;
                background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
                padding: 4px 8px;
                border-radius: 6px;
                display: inline-block;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
                color: #6b7280;
                font-size: 10px;
                page-break-inside: avoid;
            }
            .detailed-analysis {
                margin-top: 15px;
            }
            .analysis-card {
                background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
                border: 1px solid #cbd5e1;
                border-radius: 12px;
                padding: 18px;
                margin-bottom: 15px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
                page-break-inside: avoid;
            }
            .analysis-card h3 {
                color: #1e293b;
                font-size: 15px;
                margin-bottom: 12px;
                font-weight: 700;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            .analysis-card p {
                margin-bottom: 8px;
                font-size: 12px;
                color: #334155;
                line-height: 1.5;
            }
            .analysis-card ul {
                margin-left: 15px;
                margin-bottom: 8px;
            }
            .analysis-card li {
                font-size: 12px;
                color: #475569;
                margin-bottom: 4px;
                line-height: 1.4;
            }
            .two-column {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
                margin-bottom: 20px;
            }
            @media print {
                body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                .container { margin: 0; padding: 15px; }
                .page-break { page-break-before: always; }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1 class="title">PyZe AI Automation</h1>
                <p class="subtitle">Agent Findings Explorer Report</p>
                <p class="date">Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
                ${reportData.selectedQuestion ? `<p class="date">Analysis Focus: ${reportData.selectedQuestion}</p>` : ''}
            </div>

            ${getQuestionSpecificAnalysis()}

            <div class="section">
                <h2 class="section-title">Executive Summary</h2>
                <div class="metrics-grid">
                    ${reportData.insights.map(insight => `
                        <div class="metric-card">
                            <div class="metric-value">${insight.value}</div>
                            <div class="metric-label">${insight.title}</div>
                            <div class="metric-description">${insight.description}</div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="section">
                <h2 class="section-title">Process Analysis Details</h2>
                <div class="two-column">
                    <div class="metric-card">
                        <div class="metric-value">${reportData.correlationFilter.totalRecords.toLocaleString()}</div>
                        <div class="metric-label">Total Records Processed</div>
                        <div class="metric-description">Complete dataset analysis across all workflow touchpoints</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value">${reportData.correlationFilter.actionableInsights}</div>
                        <div class="metric-label">Actionable Insights Found</div>
                        <div class="metric-description">High-confidence automation opportunities identified</div>
                    </div>
                </div>
                <div class="two-column">
                    <div class="metric-card">
                        <div class="metric-value">${reportData.patternAnalysis.swivelChairCases}</div>
                        <div class="metric-label">Swivel Chair Cases</div>
                        <div class="metric-description">Manual system switching instances detected</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value">${reportData.patternAnalysis.repeatedEdits}</div>
                        <div class="metric-label">Repeated Edit Instances</div>
                        <div class="metric-description">Form validation and data entry inefficiencies</div>
                    </div>
                </div>
            </div>

            <div class="section">
                <h2 class="section-title">Key Findings & Inefficiencies</h2>
                <ul class="findings-list">
                    <li><strong>Swivel Chair Behavior:</strong> 291 instances of manual switching to Customer Profile system causing workflow interruptions and context loss</li>
                    <li><strong>Validation Issues:</strong> 156 cases of repeated field edits indicating inadequate real-time validation and user guidance</li>
                    <li><strong>Approval Bottlenecks:</strong> 45% time loss in approval workflow stages due to unnecessary manual reviews and routing delays</li>
                    <li><strong>Routing Inefficiencies:</strong> 23% of cases initially routed to incorrect departments, causing resolution delays</li>
                    <li><strong>System Integration Gaps:</strong> Multiple manual handoffs between systems that could be automated</li>
                    <li><strong>Data Entry Redundancy:</strong> Same information entered multiple times across different systems</li>
                </ul>
            </div>

            <div class="section page-break">
                <h2 class="section-title">Automation Opportunities</h2>
                ${reportData.automationOpportunities.map((opportunity, index) => `
                    <div class="opportunity">
                        <div class="opportunity-title">${index + 1}. ${opportunity.title}</div>
                        <div class="opportunity-meta">
                            Category: ${opportunity.category} |
                            Impact: ${opportunity.impact} |
                            Effort: ${opportunity.effort} |
                            <span class="roi-highlight">ROI: ${opportunity.roi}%</span>
                        </div>
                        <div class="opportunity-description">${opportunity.description}</div>
                    </div>
                `).join('')}
            </div>

            <div class="section">
                <h2 class="section-title">Implementation Roadmap</h2>
                <div class="roadmap-phase">
                    <div class="phase-title">Phase 1: Quick Wins (1-2 months)</div>
                    <div class="phase-description">Implement smart field validation, basic automation rules, and simple workflow optimizations</div>
                    <div class="roi-highlight">Expected ROI: $45,000 annually</div>
                </div>
                <div class="roadmap-phase">
                    <div class="phase-title">Phase 2: System Integration (3-4 months)</div>
                    <div class="phase-description">Customer Profile system integration, predictive routing, and API connections between core systems</div>
                    <div class="roi-highlight">Expected ROI: $65,000 annually</div>
                </div>
                <div class="roadmap-phase">
                    <div class="phase-title">Phase 3: Advanced Automation (5-6 months)</div>
                    <div class="phase-description">Full workflow automation, AI-powered decision making, and intelligent process optimization</div>
                    <div class="roi-highlight">Expected ROI: $127,000 annually</div>
                </div>
            </div>

            <div class="section">
                <h2 class="section-title">Technical Recommendations</h2>
                <div class="analysis-card">
                    <h3>Immediate Actions (0-30 days)</h3>
                    <ul>
                        <li>Implement real-time field validation on high-error forms</li>
                        <li>Create approval thresholds for low-value transactions</li>
                        <li>Set up basic workflow routing rules</li>
                        <li>Enable audit trails for all manual interventions</li>
                    </ul>
                </div>
                <div class="analysis-card">
                    <h3>Short-term Improvements (1-3 months)</h3>
                    <ul>
                        <li>Develop API integrations for Customer Profile system</li>
                        <li>Implement intelligent case routing algorithms</li>
                        <li>Create automated approval workflows for standard requests</li>
                        <li>Deploy user behavior analytics for continuous optimization</li>
                    </ul>
                </div>
                <div class="analysis-card">
                    <h3>Long-term Transformation (3-12 months)</h3>
                    <ul>
                        <li>Machine learning models for predictive routing and decision support</li>
                        <li>Complete workflow orchestration platform</li>
                        <li>Advanced analytics and continuous improvement framework</li>
                        <li>Integration with enterprise systems and external APIs</li>
                    </ul>
                </div>
            </div>

            <div class="footer">
                <p>Generated by PyZe AI Automation Platform | Agent Findings Explorer</p>
                <p>For more information, visit www.pyze.ai | Contact: support@pyze.ai</p>
            </div>
        </div>
    </body>
    </html>
  `;

  return htmlContent;
};

export const generateHTMLReport = () => {
  const reportData = {
    title: 'PyZe AI Automation - Agent Findings Explorer',
    timestamp: new Date().toISOString(),
    insights: mockAnalysisData.insights,
    automationOpportunities: mockAnalysisData.automationOpportunities,
    correlationFilter: mockAnalysisData.correlationFilter,
    patternAnalysis: mockAnalysisData.patternAnalysis
  };

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>PyZe AI Analysis Report</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; background: #f5f5f5; }
            .container { max-width: 1200px; margin: 0 auto; background: white; padding: 40px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
            .header { text-align: center; border-bottom: 3px solid #6366f1; padding-bottom: 20px; margin-bottom: 30px; }
            .title { color: #6366f1; font-size: 2.5em; margin-bottom: 10px; }
            .subtitle { color: #666; font-size: 1.2em; }
            .section { margin-bottom: 40px; }
            .section-title { color: #333; font-size: 1.8em; margin-bottom: 20px; border-left: 4px solid #6366f1; padding-left: 15px; }
            .metrics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px; }
            .metric-card { background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #6366f1; }
            .metric-value { font-size: 2em; font-weight: bold; color: #6366f1; }
            .metric-label { color: #666; font-size: 0.9em; }
            .opportunity { background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #10b981; }
            .opportunity-title { font-weight: bold; color: #333; margin-bottom: 10px; }
            .opportunity-meta { font-size: 0.9em; color: #666; margin-bottom: 10px; }
            .findings-list { list-style: none; padding: 0; }
            .findings-list li { background: #f8fafc; padding: 15px; margin-bottom: 10px; border-radius: 8px; border-left: 4px solid #f59e0b; }
            .roadmap-phase { background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #8b5cf6; }
            .phase-title { font-weight: bold; color: #333; margin-bottom: 10px; }
            .roi-highlight { color: #10b981; font-weight: bold; }
            .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #666; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1 class="title">PyZe AI Automation</h1>
                <p class="subtitle">Agent Findings Explorer Report</p>
                <p style="color: #666;">Generated on ${new Date().toLocaleDateString()}</p>
            </div>

            <div class="section">
                <h2 class="section-title">Executive Summary</h2>
                <div class="metrics-grid">
                    ${reportData.insights.map(insight => `
                        <div class="metric-card">
                            <div class="metric-value">${insight.value}</div>
                            <div class="metric-label">${insight.title}</div>
                            <p style="font-size: 0.8em; color: #666; margin-top: 10px;">${insight.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="section">
                <h2 class="section-title">Process Analysis</h2>
                <div class="metrics-grid">
                    <div class="metric-card">
                        <div class="metric-value">${reportData.correlationFilter.totalRecords.toLocaleString()}</div>
                        <div class="metric-label">Total Records Processed</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value">${reportData.correlationFilter.actionableInsights}</div>
                        <div class="metric-label">Actionable Insights Found</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value">${reportData.patternAnalysis.swivelChairCases}</div>
                        <div class="metric-label">Swivel Chair Cases</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value">${reportData.patternAnalysis.repeatedEdits}</div>
                        <div class="metric-label">Repeated Edit Instances</div>
                    </div>
                </div>
            </div>

            <div class="section">
                <h2 class="section-title">Key Findings</h2>
                <ul class="findings-list">
                    <li><strong>Process Inefficiencies:</strong> 291 instances of swivel chair behavior to Customer Profile system</li>
                    <li><strong>Validation Issues:</strong> 156 cases of repeated field edits indicating validation problems</li>
                    <li><strong>Workflow Bottlenecks:</strong> 45% time loss in approval workflow stages</li>
                    <li><strong>Automation Potential:</strong> High-impact opportunities identified for system integration</li>
                </ul>
            </div>

            <div class="section">
                <h2 class="section-title">Automation Opportunities</h2>
                ${reportData.automationOpportunities.map(opportunity => `
                    <div class="opportunity">
                        <div class="opportunity-title">${opportunity.title}</div>
                        <div class="opportunity-meta">
                            Category: ${opportunity.category} |
                            Impact: ${opportunity.impact} |
                            Effort: ${opportunity.effort} |
                            <span class="roi-highlight">ROI: ${opportunity.roi}%</span>
                        </div>
                        <p>${opportunity.description}</p>
                    </div>
                `).join('')}
            </div>

            <div class="section">
                <h2 class="section-title">Implementation Roadmap</h2>
                <div class="roadmap-phase">
                    <div class="phase-title">Phase 1: Quick Wins (1-2 months)</div>
                    <p>Implement smart field validation and basic automation rules</p>
                    <p class="roi-highlight">Expected ROI: $45,000</p>
                </div>
                <div class="roadmap-phase">
                    <div class="phase-title">Phase 2: System Integration (3-4 months)</div>
                    <p>Customer Profile system integration and predictive routing</p>
                    <p class="roi-highlight">Expected ROI: $65,000</p>
                </div>
                <div class="roadmap-phase">
                    <div class="phase-title">Phase 3: Advanced Automation (5-6 months)</div>
                    <p>Full workflow automation and AI-powered decision making</p>
                    <p class="roi-highlight">Expected ROI: $127,000</p>
                </div>
            </div>

            <div class="footer">
                <p>Generated by PyZe AI Automation Platform</p>
            </div>
        </div>
    </body>
    </html>
  `;

  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'PyZe_AI_Analysis_Report.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};