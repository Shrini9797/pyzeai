import React, { useState, createContext, useContext } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import ChatBot from './components/ChatBot/ChatBot';
import ReportModal from './components/Report/ReportModal';
import { generatePDFReport } from './utils/reportGenerator';

interface AppContextType {
  showReport: boolean;
  setShowReport: (show: boolean) => void;
  selectedQuestion?: string;
  setSelectedQuestion: (question: string) => void;
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

  const handleDownloadReport = () => {
    generatePDFReport(selectedQuestion);
  };

  return (
    <AppContext.Provider value={{ showReport, setShowReport, selectedQuestion, setSelectedQuestion }}>
      <div className="App">
        <Dashboard />
        <ChatBot />
        <ReportModal
          isOpen={showReport}
          onClose={() => setShowReport(false)}
          onDownload={handleDownloadReport}
        />
      </div>
    </AppContext.Provider>
  );
}

export default App;
