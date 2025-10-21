import React, { useState, useRef, useEffect } from 'react';
import { Play, Search, Filter, Download, RefreshCw, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { EnterpriseRow } from '../../types';

interface EnterpriseTableProps {
  onRunAnalysis?: (row: EnterpriseRow) => void;
}

const enterpriseData: EnterpriseRow[] = [
  { no: 1, customerName: "Wells Fargo", enterpriseSystem: "Salesforce", dataCollectedFrom: "03/07/2023", dataCollectedTo: "10/21/2025", lastAnalysisDate: "08/15/2024", lastAnalysisResults: "250K cases analyzed; $1.2M savings; 1.8 min saving per case" },
  { no: 2, customerName: "Wells Fargo", enterpriseSystem: "Oracle Financials", dataCollectedFrom: "02/01/2023", dataCollectedTo: "09/15/2025", lastAnalysisDate: "07/10/2024", lastAnalysisResults: "1.1M transactions; $2.8M optimization" },
  { no: 3, customerName: "Wells Fargo", enterpriseSystem: "ServiceNow", dataCollectedFrom: "03/10/2023", dataCollectedTo: "10/20/2025", lastAnalysisDate: "08/25/2024", lastAnalysisResults: "320K incidents; $1.4M savings; 1.9 min faster closure" },
  { no: 4, customerName: "Walmart", enterpriseSystem: "SAP ERP", dataCollectedFrom: "01/01/2023", dataCollectedTo: "09/30/2025", lastAnalysisDate: "06/18/2024", lastAnalysisResults: "Not Analyzed yet" },
  { no: 5, customerName: "Walmart", enterpriseSystem: "Workday HCM", dataCollectedFrom: "04/15/2023", dataCollectedTo: "10/21/2025", lastAnalysisDate: "07/30/2024", lastAnalysisResults: "320K employees; $2.1M cost avoidance; 2.5% attrition reduction" },
  { no: 6, customerName: "Walmart", enterpriseSystem: "Salesforce", dataCollectedFrom: "02/10/2023", dataCollectedTo: "09/25/2025", lastAnalysisDate: "08/10/2024", lastAnalysisResults: "400K customer cases; $3.1M gain" },
  { no: 7, customerName: "Amazon", enterpriseSystem: "Oracle E-Business", dataCollectedFrom: "02/10/2023", dataCollectedTo: "09/25/2025", lastAnalysisDate: "08/10/2024", lastAnalysisResults: "Not Analyzed yet" },
  { no: 8, customerName: "Amazon", enterpriseSystem: "ServiceNow", dataCollectedFrom: "03/01/2023", dataCollectedTo: "10/20/2025", lastAnalysisDate: "09/01/2024", lastAnalysisResults: "480K incidents; $3.2M savings; 1.1 min per ticket" },
  { no: 9, customerName: "Amazon", enterpriseSystem: "SAP Ariba", dataCollectedFrom: "01/05/2023", dataCollectedTo: "09/28/2025", lastAnalysisDate: "07/02/2024", lastAnalysisResults: "900K procurement events; $2.9M savings" },
  { no: 10, customerName: "Apple Inc.", enterpriseSystem: "Oracle Fusion", dataCollectedFrom: "01/15/2023", dataCollectedTo: "10/12/2025", lastAnalysisDate: "07/12/2024", lastAnalysisResults: "Not Analyzed yet" },
  { no: 11, customerName: "Apple Inc.", enterpriseSystem: "Salesforce", dataCollectedFrom: "02/01/2023", dataCollectedTo: "09/28/2025", lastAnalysisDate: "06/22/2024", lastAnalysisResults: "Not Analyzed yet" },
  { no: 12, customerName: "Apple Inc.", enterpriseSystem: "Workday", dataCollectedFrom: "03/01/2023", dataCollectedTo: "09/30/2025", lastAnalysisDate: "07/01/2024", lastAnalysisResults: "Not Analyzed yet" },
  { no: 13, customerName: "JPMorgan Chase", enterpriseSystem: "Salesforce", dataCollectedFrom: "01/12/2023", dataCollectedTo: "10/21/2025", lastAnalysisDate: "09/10/2024", lastAnalysisResults: "1.1M financial entries; $3.5M optimization" },
  { no: 14, customerName: "JPMorgan Chase", enterpriseSystem: "Oracle Finance", dataCollectedFrom: "02/01/2023", dataCollectedTo: "09/30/2025", lastAnalysisDate: "07/03/2024", lastAnalysisResults: "900K journal entries; $3.2M efficiency gain" },
  { no: 15, customerName: "JPMorgan Chase", enterpriseSystem: "ServiceNow", dataCollectedFrom: "04/15/2023", dataCollectedTo: "10/18/2025", lastAnalysisDate: "08/20/2024", lastAnalysisResults: "450K tickets; $2.3M cost saving" },
  { no: 16, customerName: "Procter & Gamble", enterpriseSystem: "SAP S/4HANA", dataCollectedFrom: "03/15/2023", dataCollectedTo: "10/21/2025", lastAnalysisDate: "08/09/2024", lastAnalysisResults: "1.5M transactions; $5.1M reduction; 4.8% process gain" },
  { no: 17, customerName: "Procter & Gamble", enterpriseSystem: "Workday Payroll", dataCollectedFrom: "04/10/2023", dataCollectedTo: "09/29/2025", lastAnalysisDate: "07/22/2024", lastAnalysisResults: "100K employees; $1.3M payroll accuracy improvement" },
  { no: 18, customerName: "Procter & Gamble", enterpriseSystem: "Salesforce", dataCollectedFrom: "01/12/2023", dataCollectedTo: "09/15/2025", lastAnalysisDate: "06/30/2024", lastAnalysisResults: "350K customer cases; $1.9M retention gain" },
  { no: 19, customerName: "Toyota Motor Corp.", enterpriseSystem: "SAP ERP", dataCollectedFrom: "01/20/2023", dataCollectedTo: "10/21/2025", lastAnalysisDate: "08/01/2024", lastAnalysisResults: "2.2M supply events; $6.8M efficiency; 3.5% delivery improvement" },
  { no: 20, customerName: "Toyota Motor Corp.", enterpriseSystem: "ServiceNow", dataCollectedFrom: "02/05/2023", dataCollectedTo: "09/30/2025", lastAnalysisDate: "07/05/2024", lastAnalysisResults: "410K tickets; $1.9M saving; 1.4 min faster handling" },
  { no: 21, customerName: "Toyota Motor Corp.", enterpriseSystem: "Oracle SCM", dataCollectedFrom: "03/12/2023", dataCollectedTo: "10/10/2025", lastAnalysisDate: "08/02/2024", lastAnalysisResults: "950K items; $4.5M logistics optimization" },
  { no: 22, customerName: "PepsiCo", enterpriseSystem: "Oracle Cloud ERP", dataCollectedFrom: "03/03/2023", dataCollectedTo: "10/21/2025", lastAnalysisDate: "08/18/2024", lastAnalysisResults: "1.3M transactions; $3.9M optimization; 3.9% process improvement" },
  { no: 23, customerName: "PepsiCo", enterpriseSystem: "Workday", dataCollectedFrom: "01/25/2023", dataCollectedTo: "09/25/2025", lastAnalysisDate: "07/25/2024", lastAnalysisResults: "180K employees; $1.2M cost saving" },
  { no: 24, customerName: "PepsiCo", enterpriseSystem: "Salesforce", dataCollectedFrom: "02/10/2023", dataCollectedTo: "10/15/2025", lastAnalysisDate: "08/01/2024", lastAnalysisResults: "400K opportunities; $2.6M growth" },
  { no: 25, customerName: "General Electric", enterpriseSystem: "Oracle E-Business", dataCollectedFrom: "01/22/2023", dataCollectedTo: "10/21/2025", lastAnalysisDate: "08/10/2024", lastAnalysisResults: "950K supply events; $3.8M cost efficiency" },
  { no: 26, customerName: "General Electric", enterpriseSystem: "Workday", dataCollectedFrom: "02/18/2023", dataCollectedTo: "09/25/2025", lastAnalysisDate: "07/14/2024", lastAnalysisResults: "150K employees; $1.3M HR savings" },
  { no: 27, customerName: "General Electric", enterpriseSystem: "SAP Ariba", dataCollectedFrom: "03/04/2023", dataCollectedTo: "10/01/2025", lastAnalysisDate: "07/31/2024", lastAnalysisResults: "720K POs; $2.4M procurement gain" },
  { no: 28, customerName: "Siemens", enterpriseSystem: "SAP S/4HANA", dataCollectedFrom: "02/01/2023", dataCollectedTo: "09/30/2025", lastAnalysisDate: "06/30/2024", lastAnalysisResults: "1.4M entries; $3.7M savings" },
  { no: 29, customerName: "Siemens", enterpriseSystem: "ServiceNow", dataCollectedFrom: "03/10/2023", dataCollectedTo: "10/21/2025", lastAnalysisDate: "08/18/2024", lastAnalysisResults: "380K tickets; $1.5M efficiency" },
  { no: 30, customerName: "Siemens", enterpriseSystem: "Salesforce", dataCollectedFrom: "01/25/2023", dataCollectedTo: "09/15/2025", lastAnalysisDate: "07/03/2024", lastAnalysisResults: "275K cases; $1.8M customer retention" },
  { no: 31, customerName: "Microsoft", enterpriseSystem: "Dynamics 365", dataCollectedFrom: "02/15/2023", dataCollectedTo: "10/21/2025", lastAnalysisDate: "08/05/2024", lastAnalysisResults: "1.6M customer interactions; $4.2M efficiency gain" },
  { no: 32, customerName: "Microsoft", enterpriseSystem: "ServiceNow", dataCollectedFrom: "03/20/2023", dataCollectedTo: "09/30/2025", lastAnalysisDate: "07/15/2024", lastAnalysisResults: "520K tickets; $2.8M savings" },
  { no: 33, customerName: "Microsoft", enterpriseSystem: "Workday", dataCollectedFrom: "01/10/2023", dataCollectedTo: "10/10/2025", lastAnalysisDate: "08/22/2024", lastAnalysisResults: "210K employees; $1.7M HR optimization" },
  { no: 34, customerName: "Google", enterpriseSystem: "Salesforce", dataCollectedFrom: "02/28/2023", dataCollectedTo: "10/21/2025", lastAnalysisDate: "09/05/2024", lastAnalysisResults: "890K cases; $3.9M customer experience improvement" },
  { no: 35, customerName: "Google", enterpriseSystem: "Workday", dataCollectedFrom: "03/15/2023", dataCollectedTo: "09/28/2025", lastAnalysisDate: "07/20/2024", lastAnalysisResults: "190K employees; $1.5M talent optimization" },
  { no: 36, customerName: "Google", enterpriseSystem: "Oracle Cloud", dataCollectedFrom: "01/20/2023", dataCollectedTo: "10/15/2025", lastAnalysisDate: "08/12/2024", lastAnalysisResults: "Not Analyzed yet" },
  { no: 37, customerName: "Tesla", enterpriseSystem: "SAP ERP", dataCollectedFrom: "02/05/2023", dataCollectedTo: "10/21/2025", lastAnalysisDate: "08/28/2024", lastAnalysisResults: "1.8M supply chain events; $5.6M logistics savings" },
  { no: 38, customerName: "Tesla", enterpriseSystem: "ServiceNow", dataCollectedFrom: "03/12/2023", dataCollectedTo: "09/25/2025", lastAnalysisDate: "07/08/2024", lastAnalysisResults: "390K incidents; $2.1M resolution efficiency" },
  { no: 39, customerName: "Tesla", enterpriseSystem: "Salesforce", dataCollectedFrom: "01/18/2023", dataCollectedTo: "10/12/2025", lastAnalysisDate: "08/15/2024", lastAnalysisResults: "450K customer cases; $2.7M satisfaction gain" },
  { no: 40, customerName: "Meta", enterpriseSystem: "Workday", dataCollectedFrom: "02/22/2023", dataCollectedTo: "10/21/2025", lastAnalysisDate: "09/10/2024", lastAnalysisResults: "120K employees; $1.4M workforce optimization" },
  { no: 41, customerName: "Meta", enterpriseSystem: "Salesforce", dataCollectedFrom: "03/08/2023", dataCollectedTo: "09/30/2025", lastAnalysisDate: "07/25/2024", lastAnalysisResults: "670K business cases; $3.3M revenue impact" },
  { no: 42, customerName: "Meta", enterpriseSystem: "ServiceNow", dataCollectedFrom: "01/25/2023", dataCollectedTo: "10/18/2025", lastAnalysisDate: "08/05/2024", lastAnalysisResults: "Not Analyzed yet" },
  { no: 43, customerName: "Intel", enterpriseSystem: "Oracle E-Business", dataCollectedFrom: "02/12/2023", dataCollectedTo: "10/21/2025", lastAnalysisDate: "08/20/2024", lastAnalysisResults: "1.2M manufacturing events; $4.5M process efficiency" },
  { no: 44, customerName: "Intel", enterpriseSystem: "SAP S/4HANA", dataCollectedFrom: "03/18/2023", dataCollectedTo: "09/28/2025", lastAnalysisDate: "07/12/2024", lastAnalysisResults: "2.1M transactions; $6.2M cost reduction" },
  { no: 45, customerName: "Intel", enterpriseSystem: "Workday", dataCollectedFrom: "01/30/2023", dataCollectedTo: "10/10/2025", lastAnalysisDate: "08/08/2024", lastAnalysisResults: "130K employees; $1.6M HR savings" },
  { no: 46, customerName: "IBM", enterpriseSystem: "Salesforce", dataCollectedFrom: "02/08/2023", dataCollectedTo: "10/21/2025", lastAnalysisDate: "09/02/2024", lastAnalysisResults: "780K client interactions; $3.7M service improvement" },
  { no: 47, customerName: "IBM", enterpriseSystem: "ServiceNow", dataCollectedFrom: "03/22/2023", dataCollectedTo: "09/25/2025", lastAnalysisDate: "07/18/2024", lastAnalysisResults: "560K tickets; $2.9M efficiency gain" },
  { no: 48, customerName: "IBM", enterpriseSystem: "Oracle Cloud", dataCollectedFrom: "01/15/2023", dataCollectedTo: "10/15/2025", lastAnalysisDate: "08/10/2024", lastAnalysisResults: "1.4M financial records; $4.1M optimization" },
  { no: 49, customerName: "Samsung", enterpriseSystem: "SAP ERP", dataCollectedFrom: "02/18/2023", dataCollectedTo: "10/21/2025", lastAnalysisDate: "08/25/2024", lastAnalysisResults: "2.5M supply events; $7.2M logistics optimization" },
  { no: 50, customerName: "Samsung", enterpriseSystem: "Salesforce", dataCollectedFrom: "03/05/2023", dataCollectedTo: "09/30/2025", lastAnalysisDate: "07/22/2024", lastAnalysisResults: "920K customer cases; $4.1M retention impact" },
  { no: 51, customerName: "Samsung", enterpriseSystem: "Workday HCM", dataCollectedFrom: "01/22/2023", dataCollectedTo: "10/12/2025", lastAnalysisDate: "08/15/2024", lastAnalysisResults: "Not Analyzed yet" },
  { no: 52, customerName: "Oracle", enterpriseSystem: "Oracle Fusion", dataCollectedFrom: "02/25/2023", dataCollectedTo: "10/21/2025", lastAnalysisDate: "09/08/2024", lastAnalysisResults: "1.7M transactions; $5.3M process improvement" },
  { no: 53, customerName: "Oracle", enterpriseSystem: "ServiceNow", dataCollectedFrom: "03/15/2023", dataCollectedTo: "09/25/2025", lastAnalysisDate: "07/28/2024", lastAnalysisResults: "490K incidents; $2.6M support efficiency" },
  { no: 54, customerName: "Oracle", enterpriseSystem: "Workday", dataCollectedFrom: "01/12/2023", dataCollectedTo: "10/18/2025", lastAnalysisDate: "08/18/2024", lastAnalysisResults: "95K employees; $1.2M talent management gain" },
  { no: 55, customerName: "Cisco", enterpriseSystem: "SAP Ariba", dataCollectedFrom: "02/20/2023", dataCollectedTo: "10/21/2025", lastAnalysisDate: "08/30/2024", lastAnalysisResults: "1.1M procurement events; $3.8M savings" },
  { no: 56, customerName: "Cisco", enterpriseSystem: "Salesforce", dataCollectedFrom: "03/10/2023", dataCollectedTo: "09/28/2025", lastAnalysisDate: "07/15/2024", lastAnalysisResults: "650K partner cases; $3.2M channel optimization" },
  { no: 57, customerName: "Cisco", enterpriseSystem: "ServiceNow", dataCollectedFrom: "01/28/2023", dataCollectedTo: "10/15/2025", lastAnalysisDate: "08/22/2024", lastAnalysisResults: "420K tickets; $2.4M resolution efficiency" },
  { no: 58, customerName: "Accenture", enterpriseSystem: "Workday", dataCollectedFrom: "02/15/2023", dataCollectedTo: "10/21/2025", lastAnalysisDate: "09/05/2024", lastAnalysisResults: "280K employees; $2.3M workforce optimization" },
  { no: 59, customerName: "Accenture", enterpriseSystem: "Salesforce", dataCollectedFrom: "03/20/2023", dataCollectedTo: "09/30/2025", lastAnalysisDate: "07/30/2024", lastAnalysisResults: "1.2M client engagements; $5.1M delivery improvement" },
  { no: 60, customerName: "Accenture", enterpriseSystem: "ServiceNow", dataCollectedFrom: "01/18/2023", dataCollectedTo: "10/10/2025", lastAnalysisDate: "08/12/2024", lastAnalysisResults: "Not Analyzed yet" },
  { no: 61, customerName: "Deloitte", enterpriseSystem: "Oracle Cloud", dataCollectedFrom: "02/10/2023", dataCollectedTo: "10/21/2025", lastAnalysisDate: "08/28/2024", lastAnalysisResults: "1.5M financial entries; $4.7M audit efficiency" },
  { no: 62, customerName: "Deloitte", enterpriseSystem: "Workday", dataCollectedFrom: "03/12/2023", dataCollectedTo: "09/25/2025", lastAnalysisDate: "07/20/2024", lastAnalysisResults: "260K employees; $2.1M HR optimization" },
  { no: 63, customerName: "Deloitte", enterpriseSystem: "Salesforce", dataCollectedFrom: "01/20/2023", dataCollectedTo: "10/15/2025", lastAnalysisDate: "08/15/2024", lastAnalysisResults: "890K advisory cases; $4.3M client satisfaction" },
  { no: 64, customerName: "Pfizer", enterpriseSystem: "SAP S/4HANA", dataCollectedFrom: "02/22/2023", dataCollectedTo: "10/21/2025", lastAnalysisDate: "09/10/2024", lastAnalysisResults: "1.9M R&D events; $6.1M research efficiency" },
  { no: 65, customerName: "Pfizer", enterpriseSystem: "Oracle Life Sciences", dataCollectedFrom: "03/08/2023", dataCollectedTo: "09/28/2025", lastAnalysisDate: "07/25/2024", lastAnalysisResults: "830K clinical records; $3.9M compliance gain" },
  { no: 66, customerName: "Pfizer", enterpriseSystem: "Workday", dataCollectedFrom: "01/25/2023", dataCollectedTo: "10/12/2025", lastAnalysisDate: "08/08/2024", lastAnalysisResults: "110K employees; $1.5M talent optimization" },
  { no: 67, customerName: "Johnson & Johnson", enterpriseSystem: "SAP ERP", dataCollectedFrom: "02/12/2023", dataCollectedTo: "10/21/2025", lastAnalysisDate: "08/20/2024", lastAnalysisResults: "2.3M supply events; $7.5M logistics optimization" },
  { no: 68, customerName: "Johnson & Johnson", enterpriseSystem: "Salesforce", dataCollectedFrom: "03/18/2023", dataCollectedTo: "09/30/2025", lastAnalysisDate: "07/12/2024", lastAnalysisResults: "750K healthcare cases; $3.8M patient experience" },
  { no: 69, customerName: "Johnson & Johnson", enterpriseSystem: "Workday HCM", dataCollectedFrom: "01/30/2023", dataCollectedTo: "10/18/2025", lastAnalysisDate: "08/25/2024", lastAnalysisResults: "Not Analyzed yet" },
  { no: 70, customerName: "Visa", enterpriseSystem: "Oracle Finance", dataCollectedFrom: "02/08/2023", dataCollectedTo: "10/21/2025", lastAnalysisDate: "09/02/2024", lastAnalysisResults: "3.1M transactions; $8.2M fraud prevention" },
  { no: 71, customerName: "Visa", enterpriseSystem: "Salesforce", dataCollectedFrom: "03/22/2023", dataCollectedTo: "09/25/2025", lastAnalysisDate: "07/18/2024", lastAnalysisResults: "1.1M merchant cases; $4.6M service quality" },
  { no: 72, customerName: "Visa", enterpriseSystem: "ServiceNow", dataCollectedFrom: "01/15/2023", dataCollectedTo: "10/15/2025", lastAnalysisDate: "08/10/2024", lastAnalysisResults: "580K support tickets; $3.1M efficiency gain" }
];

const EnterpriseTable: React.FC<EnterpriseTableProps> = ({ onRunAnalysis }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSystem, setFilterSystem] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const uniqueSystems = Array.from(new Set(enterpriseData.map(row => row.enterpriseSystem)));

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredData = enterpriseData.filter(row => {
    const matchesSearch = 
      row.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.enterpriseSystem.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterSystem === 'all' || row.enterpriseSystem === filterSystem;
    return matchesSearch && matchesFilter;
  });

  const handleRunAnalysis = (row: EnterpriseRow) => {
    if (onRunAnalysis) {
      onRunAnalysis(row);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white">
      <div className="container mx-auto px-6 py-6">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Enterprise Analysis</h1>
          <p className="text-slate-600">Monitor and analyze data across all enterprise systems</p>
        </motion.div>

        {/* Filters and Actions */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="metric-card mb-6"
        >
          <div className="flex flex-wrap gap-4 items-center justify-between">
            {/* Search */}
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by customer or system..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
                />
              </div>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-3">
              <Filter className="text-slate-600 w-5 h-5" />
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center justify-between px-4 py-2.5 bg-white/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 hover:bg-white transition-colors min-w-[180px]"
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
                          className={`w-full text-left px-4 py-2.5 hover:bg-slate-50 transition-colors min-h-[44px] flex items-center ${
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
                            className={`w-full text-left px-4 py-2.5 hover:bg-slate-50 transition-colors min-h-[44px] flex items-center ${
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
            <div className="flex items-center gap-2">
              <button className="p-2.5 bg-white/80 hover:bg-white rounded-xl transition-colors shadow-sm border border-slate-200">
                <RefreshCw className="w-5 h-5 text-slate-600" />
              </button>
              <button className="p-2.5 bg-white/80 hover:bg-white rounded-xl transition-colors shadow-sm border border-slate-200">
                <Download className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-sm text-slate-600">
              Showing <span className="font-semibold text-slate-800">{filteredData.length}</span> of{' '}
              <span className="font-semibold text-slate-800">{enterpriseData.length}</span> records
            </p>
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="metric-card overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-4 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider bg-gradient-to-r from-blue-50/50 to-cyan-50/50">
                    No
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider bg-gradient-to-r from-blue-50/50 to-cyan-50/50">
                    Customer Name
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider bg-gradient-to-r from-blue-50/50 to-cyan-50/50">
                    Enterprise System
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider bg-gradient-to-r from-blue-50/50 to-cyan-50/50">
                    Data Collected From
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider bg-gradient-to-r from-blue-50/50 to-cyan-50/50">
                    Data Collected To
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider bg-gradient-to-r from-blue-50/50 to-cyan-50/50">
                    Last Analysis Date
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider bg-gradient-to-r from-blue-50/50 to-cyan-50/50">
                    Last Analysis Results
                  </th>
                  <th className="px-4 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider bg-gradient-to-r from-blue-50/50 to-cyan-50/50">
                    Run Analysis
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.map((row, index) => (
                  <motion.tr
                    key={row.no}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className="hover:bg-blue-50/30 transition-colors"
                  >
                    <td className="px-4 py-4 text-sm text-slate-700 font-medium">
                      {row.no}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-800 font-semibold">
                      {row.customerName}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border border-blue-200">
                        {row.enterpriseSystem}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600">
                      {row.dataCollectedFrom}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600">
                      {row.dataCollectedTo}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600">
                      {row.lastAnalysisDate}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-700 max-w-md">
                      <div className={`${row.lastAnalysisResults === 'Not Analyzed yet' ? 'text-orange-600 font-medium' : ''}`}>
                        {row.lastAnalysisResults}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => handleRunAnalysis(row)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-md hover:shadow-lg text-sm font-medium"
                      >
                        <Play className="w-4 h-4" />
                        Run
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EnterpriseTable;
