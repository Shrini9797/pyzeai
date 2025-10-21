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
            className="bg-white rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 text-white rounded-t-2xl">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Agent Findings Explorer</h2>
                  <p className="text-white/90 text-sm">Comprehensive Process Analysis Report</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={onDownload}
                  className="flex items-center space-x-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30 shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  <span className="font-medium">Download PDF</span>
                </button>
                <button className="p-2.5 bg-white/10 rounded-xl text-white/80 hover:text-white hover:bg-white/20 transition-all duration-200">
                  <Share className="w-5 h-5" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2.5 bg-white/10 rounded-xl text-white/80 hover:text-white hover:bg-white/20 transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-100px)] bg-gradient-to-br from-blue-50/30 via-white to-cyan-50/30">
              <div className="p-8 space-y-8">
                {/* Executive Summary */}
                <section>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl mr-3 shadow-md">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    Executive Summary
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    {mockAnalysisData.insights.map((insight) => (
                      <InsightCard key={insight.id} insight={insight} />
                    ))}
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg">
                    <h4 className="text-xl font-bold text-slate-900 mb-6">Key Findings</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h5 className="text-red-600 font-bold text-base mb-4 flex items-center">
                          <AlertTriangle className="w-5 h-5 mr-2" />
                          Process Inefficiencies
                        </h5>
                        <ul className="space-y-3 text-slate-700 text-sm">
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
                        <h5 className="text-green-600 font-bold text-base mb-4 flex items-center">
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Automation Opportunities
                        </h5>
                        <ul className="space-y-3 text-slate-700 text-sm">
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
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Process Analysis Details</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
                      <h4 className="text-lg font-bold text-blue-900 mb-6">Correlation Filter Results</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center pb-3 border-b border-blue-100">
                          <span className="text-slate-700 font-medium">Total Records Processed</span>
                          <span className="text-blue-900 font-bold text-lg">{mockAnalysisData.correlationFilter.totalRecords.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center pb-3 border-b border-blue-100">
                          <span className="text-slate-700 font-medium">Actionable Insights Found</span>
                          <span className="text-cyan-600 font-bold text-lg">{mockAnalysisData.correlationFilter.actionableInsights}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-700 font-medium">Processing Time</span>
                          <span className="text-green-600 font-bold text-lg">{mockAnalysisData.correlationFilter.processingTime}s</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-cyan-200 shadow-lg hover:shadow-xl transition-shadow">
                      <h4 className="text-lg font-bold text-cyan-900 mb-6">Pattern Analysis Summary</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center pb-3 border-b border-cyan-100">
                          <span className="text-slate-700 font-medium">Swivel Chair Cases</span>
                          <span className="text-orange-600 font-bold text-lg">{mockAnalysisData.patternAnalysis.swivelChairCases}</span>
                        </div>
                        <div className="flex justify-between items-center pb-3 border-b border-cyan-100">
                          <span className="text-slate-700 font-medium">Repeated Edits</span>
                          <span className="text-orange-600 font-bold text-lg">{mockAnalysisData.patternAnalysis.repeatedEdits}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-700 font-medium">Workflow Bottlenecks</span>
                          <span className="text-red-600 font-bold text-lg">{mockAnalysisData.patternAnalysis.workflowBottlenecks}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Automation Opportunities */}
                <section>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Automation Opportunities</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {mockAnalysisData.automationOpportunities.map((opportunity) => (
                      <AutomationOpportunity key={opportunity.id} opportunity={opportunity} />
                    ))}
                  </div>
                </section>

                {/* Implementation Roadmap */}
                <section>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Implementation Roadmap</h3>
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg">
                    <div className="space-y-8">
                      <div className="flex items-start space-x-5">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg flex-shrink-0">1</div>
                        <div className="flex-1">
                          <h5 className="text-slate-900 font-bold text-lg mb-2">Phase 1: Quick Wins (1-2 months)</h5>
                          <p className="text-slate-700 text-sm mb-2">Implement smart field validation and basic automation rules</p>
                          <div className="inline-block px-4 py-2 bg-green-50 rounded-lg">
                            <p className="text-green-700 text-sm font-bold">Expected ROI: $45,000</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-5">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg flex-shrink-0">2</div>
                        <div className="flex-1">
                          <h5 className="text-slate-900 font-bold text-lg mb-2">Phase 2: System Integration (3-4 months)</h5>
                          <p className="text-slate-700 text-sm mb-2">Customer Profile system integration and predictive routing</p>
                          <div className="inline-block px-4 py-2 bg-blue-50 rounded-lg">
                            <p className="text-blue-700 text-sm font-bold">Expected ROI: $65,000</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-5">
                        <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg flex-shrink-0">3</div>
                        <div className="flex-1">
                          <h5 className="text-slate-900 font-bold text-lg mb-2">Phase 3: Advanced Automation (5-6 months)</h5>
                          <p className="text-slate-700 text-sm mb-2">Full workflow automation and AI-powered decision making</p>
                          <div className="inline-block px-4 py-2 bg-cyan-50 rounded-lg">
                            <p className="text-cyan-700 text-sm font-bold">Expected ROI: $127,000</p>
                          </div>
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