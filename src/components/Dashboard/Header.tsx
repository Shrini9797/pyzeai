import React from 'react';
import { Settings, Bell, User, History, LayoutDashboard, ArrowLeft, Table } from 'lucide-react';
import { useAppContext } from '../../App';

const Header: React.FC = () => {
  const { showDashboard, setShowDashboard, showHistory, setShowHistory } = useAppContext();

  const handleHistoryClick = () => {
    setShowDashboard(false);
    setShowHistory(true);
  };

  const handleDashboardToggle = () => {
    setShowDashboard(!showDashboard);
  };

  return (
    <header className="border-b border-white/30 bg-white/60 backdrop-blur-xl shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            {/* Back Button */}
            <button 
              onClick={() => setShowDashboard(!showDashboard)}
              className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg text-slate-700 hover:text-slate-900 border border-slate-300/50"
              title={showDashboard ? "Back to Enterprise Table" : "Back to Dashboard"}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <button 
              onClick={() => setShowDashboard(false)}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <div>
                <h1 className="text-xl font-bold text-slate-800">PyZe AI</h1>
                <p className="text-xs text-slate-500">Automation Dashboard</p>
              </div>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Table Button */}
            <button
              onClick={() => {
                setShowDashboard(false);
                setShowHistory(false);
              }}
              className={`flex items-center space-x-2 px-3 py-2.5 rounded-xl transition-colors shadow-sm ${
                !showDashboard && !showHistory
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                  : 'bg-white/80 hover:bg-white text-slate-600'
              }`}
              title="View Enterprise Table"
            >
              <Table className="w-5 h-5" />
              <span className="text-sm font-medium">Table</span>
            </button>

            {/* Dashboard Button */}
            <button
              onClick={() => {
                setShowDashboard(true);
                setShowHistory(false);
              }}
              className={`flex items-center space-x-2 px-3 py-2.5 rounded-xl transition-colors shadow-sm ${
                showDashboard
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                  : 'bg-white/80 hover:bg-white text-slate-600'
              }`}
              title="View Dashboard"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="text-sm font-medium">Dashboard</span>
            </button>

            {/* History Button */}
            <button
              onClick={handleHistoryClick}
              className={`flex items-center space-x-2 px-3 py-2.5 rounded-xl transition-colors shadow-sm ${
                showHistory
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                  : 'bg-white/80 hover:bg-white text-slate-600'
              }`}
              title="View Analysis History"
            >
              <History className="w-5 h-5" />
              <span className="text-sm font-medium">History</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2.5 bg-white/80 rounded-xl hover:bg-white transition-colors shadow-sm">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="text-sm font-medium text-slate-600">Notifications</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2.5 bg-white/80 rounded-xl hover:bg-white transition-colors shadow-sm">
              <Settings className="w-5 h-5 text-slate-600" />
              <span className="text-sm font-medium text-slate-600">Settings</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2.5 bg-white/80 rounded-xl hover:bg-white transition-colors shadow-sm">
              <User className="w-5 h-5 text-slate-600" />
              <span className="text-sm font-medium text-slate-600">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;