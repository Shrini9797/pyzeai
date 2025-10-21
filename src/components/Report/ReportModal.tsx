import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, Share, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { mockAnalysisData } from '../../services/mockData';
import InsightCard from './InsightCard';
import AutomationOpportunity from './AutomationOpportunity';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, onDownload }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white rounded-t-2xl">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Agent Findings Explorer</h2>
                  <p className="text-white/80">Comprehensive Process Analysis Report</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={onDownload}
                  className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-300 border border-white/30"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
                <button className="p-2 text-white/70 hover:text-white transition-colors duration-200">
                  <Share className="w-5 h-5" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 text-white/70 hover:text-white transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-100px)]">
              <div className="p-6 space-y-8">
                {/* Executive Summary */}
                <section>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <TrendingUp className="w-6 h-6 mr-2 text-indigo-600" />
                    Executive Summary
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    {mockAnalysisData.insights.map((insight) => (
                      <InsightCard key={insight.id} insight={insight} />
                    ))}
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Findings</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="text-red-600 font-medium mb-2">Process Inefficiencies</h5>
                        <ul className="space-y-2 text-gray-700 text-sm">
                          <li className="flex items-start">
                            <AlertTriangle className="w-4 h-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>291 instances of swivel chair behavior to Customer Profile system</span>
                          </li>
                          <li className="flex items-start">
                            <AlertTriangle className="w-4 h-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>156 cases of repeated field edits indicating validation issues</span>
                          </li>
                          <li className="flex items-start">
                            <AlertTriangle className="w-4 h-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>45% time loss in approval workflow stages</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-green-600 font-medium mb-2">Automation Opportunities</h5>
                        <ul className="space-y-2 text-gray-700 text-sm">
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Customer Profile system integration can eliminate manual switches</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Smart field validation can reduce edit iterations</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Automated approval routing can streamline workflows</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Process Analysis */}
                <section>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Process Analysis Details</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                      <h4 className="text-lg font-semibold text-blue-900 mb-4">Correlation Filter Results</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-blue-700">Total Records Processed</span>
                          <span className="text-blue-900 font-semibold">{mockAnalysisData.correlationFilter.totalRecords.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-blue-700">Actionable Insights Found</span>
                          <span className="text-indigo-600 font-semibold">{mockAnalysisData.correlationFilter.actionableInsights}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-blue-700">Processing Time</span>
                          <span className="text-green-600 font-semibold">{mockAnalysisData.correlationFilter.processingTime}s</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                      <h4 className="text-lg font-semibold text-purple-900 mb-4">Pattern Analysis Summary</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-purple-700">Swivel Chair Cases</span>
                          <span className="text-orange-600 font-semibold">{mockAnalysisData.patternAnalysis.swivelChairCases}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-purple-700">Repeated Edits</span>
                          <span className="text-orange-600 font-semibold">{mockAnalysisData.patternAnalysis.repeatedEdits}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-purple-700">Workflow Bottlenecks</span>
                          <span className="text-red-600 font-semibold">{mockAnalysisData.patternAnalysis.workflowBottlenecks}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Automation Opportunities */}
                <section>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Automation Opportunities</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {mockAnalysisData.automationOpportunities.map((opportunity) => (
                      <AutomationOpportunity key={opportunity.id} opportunity={opportunity} />
                    ))}
                  </div>
                </section>

                {/* Implementation Roadmap */}
                <section>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Implementation Roadmap</h3>
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">1</div>
                        <div>
                          <h5 className="text-gray-900 font-semibold">Phase 1: Quick Wins (1-2 months)</h5>
                          <p className="text-gray-700 text-sm">Implement smart field validation and basic automation rules</p>
                          <p className="text-green-600 text-sm font-medium">Expected ROI: $45,000</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">2</div>
                        <div>
                          <h5 className="text-gray-900 font-semibold">Phase 2: System Integration (3-4 months)</h5>
                          <p className="text-gray-700 text-sm">Customer Profile system integration and predictive routing</p>
                          <p className="text-blue-600 text-sm font-medium">Expected ROI: $65,000</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">3</div>
                        <div>
                          <h5 className="text-gray-900 font-semibold">Phase 3: Advanced Automation (5-6 months)</h5>
                          <p className="text-gray-700 text-sm">Full workflow automation and AI-powered decision making</p>
                          <p className="text-purple-600 text-sm font-medium">Expected ROI: $127,000</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReportModal;