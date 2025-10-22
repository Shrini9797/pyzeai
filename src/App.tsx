import React, { useState, createContext, useContext } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import EnterpriseTable from './components/EnterpriseTable/EnterpriseTable';
import History from './components/History/History';
import ChatBot from './components/ChatBot/ChatBot';
import ReportModal from './components/Report/ReportModal';
import AgentFindingsExplorer from './components/Report/AgentFindingsExplorer';
import Header from './components/Dashboard/Header';
import { generateReportPDF } from './utils/reportGenerator';
import { EnterpriseRow } from './types';

interface AppContextType {
  showReport: boolean;
  setShowReport: (show: boolean) => void;
  selectedQuestion?: string;
  setSelectedQuestion: (question: string) => void;
  showFindingsExplorer: boolean;
  setShowFindingsExplorer: (show: boolean) => void;
  findingsExplorerTab: string;
  setFindingsExplorerTab: (tab: string) => void;
  showDashboard: boolean;
  setShowDashboard: (show: boolean) => void;
  showHistory: boolean;
  setShowHistory: (show: boolean) => void;
  triggerAnalysis?: (row: EnterpriseRow) => void;
  navigateToMockReport: (question?: string) => void;
  navigateToAgentExplorer: (question?: string, tab?: string) => void;
  navigateToResultsReport: (question?: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

function App() {
  const [showReport, setShowReport] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');
  const [showFindingsExplorer, setShowFindingsExplorer] = useState(false);
  const [findingsExplorerTab, setFindingsExplorerTab] = useState('overview');
  const [showDashboard, setShowDashboard] = useState(false); // Default to EnterpriseTable view
  const [showHistory, setShowHistory] = useState(false);
  const [triggerAnalysisData, setTriggerAnalysisData] = useState<EnterpriseRow | null>(null);

  const handleDownloadReport = () => {
    generateReportPDF();
  };

  const handleHistoryItemClick = (question: string) => {
    setSelectedQuestion(question);
    setFindingsExplorerTab('overview');
  };

  const triggerAnalysis = (row: EnterpriseRow) => {
    setTriggerAnalysisData(row);
  };

  // Navigation functions
  const navigateToMockReport = (question?: string) => {
    if (question) {
      setSelectedQuestion(question);
    }
    setShowFindingsExplorer(false);
    setShowHistory(false);
    setShowReport(true);
  };

  const navigateToAgentExplorer = (question?: string, tab: string = 'patterns') => {
    if (question) {
      setSelectedQuestion(question);
    }
    setFindingsExplorerTab(tab);
    setShowReport(false);
    setShowHistory(false);
    setShowFindingsExplorer(true);
  };

  const navigateToResultsReport = (question?: string) => {
    if (question) {
      setSelectedQuestion(question);
    }
    setFindingsExplorerTab('recommendations');
    setShowReport(false);
    setShowHistory(false);
    setShowFindingsExplorer(true);
  };

  return (
    <AppContext.Provider value={{
      showReport,
      setShowReport,
      selectedQuestion,
      setSelectedQuestion,
      showFindingsExplorer,
      setShowFindingsExplorer,
      findingsExplorerTab,
      setFindingsExplorerTab,
      showDashboard,
      setShowDashboard,
      showHistory,
      setShowHistory,
      triggerAnalysis,
      navigateToMockReport,
      navigateToAgentExplorer,
      navigateToResultsReport
    }}>
      <div className="App">
        <Header />
        {showHistory ? (
          <History />
        ) : showDashboard ? (
          <Dashboard />
        ) : (
          <EnterpriseTable onRunAnalysis={triggerAnalysis} />
        )}
        <ChatBot triggerData={triggerAnalysisData} onTriggerComplete={() => setTriggerAnalysisData(null)} />
        <ReportModal
          isOpen={showReport}
          onClose={() => setShowReport(false)}
          onDownload={handleDownloadReport}
          selectedQuestion={selectedQuestion}
        />
        <AgentFindingsExplorer
          isOpen={showFindingsExplorer}
          onClose={() => setShowFindingsExplorer(false)}
          onDownload={handleDownloadReport}
          selectedQuestion={selectedQuestion}
          onHistoryItemClick={handleHistoryItemClick}
          initialTab={findingsExplorerTab}
        />
      </div>
    </AppContext.Provider>
  );
}

export default App;
