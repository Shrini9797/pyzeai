import React from 'react';
import { Settings, Bell, User, History } from 'lucide-react';
import { useAppContext } from '../../App';

const Header: React.FC = () => {
  const { setShowFindingsExplorer, setFindingsExplorerTab } = useAppContext();
  
  const handleHistoryClick = () => {
    setFindingsExplorerTab('history');
    setShowFindingsExplorer(true);
  };

  return (
    <header className="border-b border-white/30 bg-white/60 backdrop-blur-xl shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div>
              <h1 className="text-xl font-bold text-slate-800">PyZe AI</h1>
              <p className="text-xs text-slate-500">Automation Dashboard</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleHistoryClick}
              className="p-2.5 bg-white/80 rounded-xl hover:bg-white transition-colors shadow-sm"
              title="View Analysis History"
            >
              <History className="w-5 h-5 text-slate-600" />
            </button>
            <button className="p-2.5 bg-white/80 rounded-xl hover:bg-white transition-colors shadow-sm">
              <Bell className="w-5 h-5 text-slate-600" />
            </button>
            <button className="p-2.5 bg-white/80 rounded-xl hover:bg-white transition-colors shadow-sm">
              <Settings className="w-5 h-5 text-slate-600" />
            </button>
            <button className="p-2.5 bg-white/80 rounded-xl hover:bg-white transition-colors shadow-sm">
              <User className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;