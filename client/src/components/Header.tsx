import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PlusIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Purple Survey</h1>
              <p className="text-xs text-gray-500">Survey Builder</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-purple-700 bg-purple-100' 
                  : 'text-gray-700 hover:text-purple-700 hover:bg-purple-50'
              }`}
            >
              Home
            </Link>
            <Link
              to="/surveys"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/surveys') 
                  ? 'text-purple-700 bg-purple-100' 
                  : 'text-gray-700 hover:text-purple-700 hover:bg-purple-50'
              }`}
            >
              My Surveys
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Link
              to="/create"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Create Survey
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden mt-4 flex space-x-4">
          <Link
            to="/"
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive('/') 
                ? 'text-purple-700 bg-purple-100' 
                : 'text-gray-700 hover:text-purple-700 hover:bg-purple-50'
            }`}
          >
            Home
          </Link>
          <Link
            to="/surveys"
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
              isActive('/surveys') 
                ? 'text-purple-700 bg-purple-100' 
                : 'text-gray-700 hover:text-purple-700 hover:bg-purple-50'
            }`}
          >
            <ClipboardDocumentListIcon className="w-4 h-4 mr-1" />
            My Surveys
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;