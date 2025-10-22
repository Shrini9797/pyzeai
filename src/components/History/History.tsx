import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp, AlertTriangle, CheckCircle, Clock, DollarSign,
  Users, BarChart3, PieChart, Activity, Zap, Target,
  ArrowUpRight, ArrowDownRight, Minus, Eye, Brain,
  Database, Settings, FileText, Download, Share, X, ExternalLink,
  Search, Filter, RefreshCw, ChevronDown
} from 'lucide-react';
import { analysisHistory } from '../../services/mockData';
import { useAppContext } from '../../App';

interface DetailedReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  historyItem: any;
}

const DetailedReportModal: React.FC<DetailedReportModalProps> = ({
  isOpen,
  onClose,
  historyItem
}) => {
  if (!isOpen || !historyItem) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-100 via-blue-50 to-cyan-100 p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-white/40">
                <span className="text-2xl">{historyItem.icon}</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{historyItem.question}</h2>
                <p className="text-slate-600">{historyItem.customerName} - {historyItem.enterpriseSystem}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-white/90 backdrop-blur-md rounded-xl text-slate-600 hover:text-slate-800 hover:bg-white transition-all duration-200 border border-white/40 shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <Database className="w-6 h-6 text-blue-600" />
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-900">{historyItem.results.totalRecords.toLocaleString()}</div>
                  <div className="text-sm text-slate-600">Records Analyzed</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="w-6 h-6 text-green-600" />
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-900">{historyItem.results.costSavings}</div>
                  <div className="text-sm text-slate-600">Cost Savings</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-6 h-6 text-purple-600" />
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-900">{historyItem.results.roi}%</div>
                  <div className="text-sm text-slate-600">ROI</div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Analysis Summary</h3>
            <p className="text-slate-700 mb-4">{historyItem.summary}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-white/60 backdrop-blur-md rounded-lg p-4 border border-white/40">
                <div className="text-xl font-bold text-green-600">{historyItem.results.efficiencyGain}</div>
                <div className="text-sm text-slate-600">Efficiency Gain</div>
              </div>
              <div className="bg-white/60 backdrop-blur-md rounded-lg p-4 border border-white/40">
                <div className="text-xl font-bold text-blue-600">{historyItem.results.timesSaved}</div>
                <div className="text-sm text-slate-600">Time Saved</div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex items-center space-x-3">
                <Target className="w-5 h-5 text-orange-600" />
                <div>
                  <div className="font-medium text-slate-900">Automation Opportunities</div>
                  <div className="text-sm text-slate-600">
                    <span className="text-2xl font-bold text-orange-600">{historyItem.results.automationOpportunities}</span> processes identified for automation
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const History: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSystem, setFilterSystem] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<any>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Get navigation functions from App context
  const { navigateToMockReport, navigateToAgentExplorer, navigateToResultsReport } = useAppContext();

  const uniqueSystems = Array.from(new Set(analysisHistory.map(item => item.enterpriseSystem)));

  const filteredData = analysisHistory.filter(item => {
    const matchesSearch =
      item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.enterpriseSystem.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.question.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterSystem === 'all' || item.enterpriseSystem === filterSystem;
    return matchesSearch && matchesFilter;
  });

  const handleNavigateToReport = (historyItem: any) => {
    navigateToMockReport(historyItem.question);
  };

  const handleNavigateToAgentExplorer = (historyItem: any) => {
    navigateToAgentExplorer(historyItem.question, 'patterns');
  };

  const handleNavigateToResultsReport = (historyItem: any) => {
    navigateToResultsReport(historyItem.question);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white">
      <div className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/40">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-slate-800 mb-3">Analysis History</h1>
                <p className="text-lg text-slate-600">Review and manage completed enterprise analyses</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{analysisHistory.length}</div>
                  <div className="text-sm text-slate-500">Total Analyses</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{analysisHistory.filter(item => item.status === 'completed').length}</div>
                  <div className="text-sm text-slate-500">Completed</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/40 mb-6"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="flex-1 min-w-[300px]">
              <label className="block text-sm font-medium text-slate-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by customer, system, or analysis type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 shadow-sm"
                />
              </div>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-slate-700">Filter by System:</label>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center justify-between px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 hover:bg-slate-50 transition-colors min-w-[200px] shadow-sm"
                >
                  <span className="truncate">
                    {filterSystem === 'all' ? 'All Systems' : filterSystem}
                  </span>
                  <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl z-50 max-h-64 overflow-y-auto"
                    >
                      <div className="py-2">
                        <button
                          onClick={() => {
                            setFilterSystem('all');
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors flex items-center ${
                            filterSystem === 'all' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-slate-700'
                          }`}
                        >
                          All Systems
                        </button>
                        {uniqueSystems.map(system => (
                          <button
                            key={system}
                            onClick={() => {
                              setFilterSystem(system);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors flex items-center ${
                              filterSystem === system ? 'bg-blue-50 text-blue-600 font-medium' : 'text-slate-700'
                            }`}
                          >
                            {system}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button className="flex items-center space-x-2 px-4 py-3 bg-white hover:bg-slate-50 rounded-xl transition-colors shadow-sm border border-slate-200">
                <RefreshCw className="w-5 h-5 text-slate-600" />
                <span className="text-sm font-medium text-slate-600">Refresh</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-3 bg-white hover:bg-slate-50 rounded-xl transition-colors shadow-sm border border-slate-200">
                <Download className="w-5 h-5 text-slate-600" />
                <span className="text-sm font-medium text-slate-600">Export</span>
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">
                Showing <span className="font-semibold text-slate-800">{filteredData.length}</span> of{' '}
                <span className="font-semibold text-slate-800">{analysisHistory.length}</span> analyses
              </p>
              <div className="flex items-center space-x-4 text-sm text-slate-600">
                <span>Filter: <span className="font-medium text-slate-800">{filterSystem === 'all' ? 'All Systems' : filterSystem}</span></span>
                {searchTerm && <span>Search: <span className="font-medium text-slate-800">"{searchTerm}"</span></span>}
              </div>
            </div>
          </div>
        </motion.div>

        {/* History Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/40 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-gradient-to-r from-blue-50/50 to-cyan-50/50">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Customer Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Enterprise System
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Analysis Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Last Analysis Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Results
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className="hover:bg-blue-50/30 transition-colors group"
                  >
                    <td className="px-6 py-4 text-sm text-slate-800 font-semibold">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {item.customerName.charAt(0)}
                        </div>
                        <span>{item.customerName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border border-blue-200">
                        {item.enterpriseSystem}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{item.icon}</span>
                        <span className="font-medium">{item.question}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      <span className="px-2 py-1 bg-slate-100 rounded-md text-xs font-medium">
                        {item.lastAnalysisDate}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      <div className="space-y-1">
                        <div className="font-semibold text-green-600">{item.results.costSavings} saved</div>
                        <div className="text-xs text-slate-600">{item.results.totalRecords.toLocaleString()} records</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleNavigateToReport(item)}
                          className="inline-flex items-center gap-1 px-2 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-sm hover:shadow-md text-xs font-medium"
                          title="Executive Summary"
                        >
                          <FileText className="w-3 h-3" />
                          Summary
                        </button>

                        <button
                          onClick={() => handleNavigateToAgentExplorer(item)}
                          className="inline-flex items-center gap-1 px-2 py-1.5 bg-gradient-to-r from-slate-500 to-slate-600 text-white rounded-lg hover:from-slate-600 hover:to-slate-700 transition-all duration-300 shadow-sm hover:shadow-md text-xs font-medium"
                          title="Process Analysis"
                        >
                          <Brain className="w-3 h-3" />
                          Analysis
                        </button>

                        <button
                          onClick={() => handleNavigateToResultsReport(item)}
                          className="inline-flex items-center gap-1 px-2 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-sm hover:shadow-md text-xs font-medium"
                          title="Recommendations"
                        >
                          <BarChart3 className="w-3 h-3" />
                          Actions
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <div className="text-slate-400 mb-4">
                <Search className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-600 mb-2">No analyses found</h3>
                <p className="text-slate-500">Try adjusting your search or filter criteria</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Detailed Report Modal */}
      <AnimatePresence>
        {isReportModalOpen && (
          <DetailedReportModal
            isOpen={isReportModalOpen}
            onClose={() => {
              setIsReportModalOpen(false);
              setSelectedHistoryItem(null);
            }}
            historyItem={selectedHistoryItem}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default History;