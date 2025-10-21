import React from 'react';
import { Brain } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-facebook-500 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">PyZe AI</h1>
              <p className="text-xs text-gray-500">Automation Platform</p>
            </div>
          </div>

          {/* Simple Status */}
          <div className="text-right">
            <p className="text-sm text-gray-600">Status: Active</p>
            <p className="text-xs text-gray-400">Ready for analysis</p>
          </div>
        </div>
      </div>
    </header>
  );
};


export default Header;