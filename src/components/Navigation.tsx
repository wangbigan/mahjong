import React from 'react';
import { Home, BookOpen, Search, MapPin, Lightbulb, Target } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  currentPage, 
  onNavigate, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen 
}) => {
  const menuItems = [
    { id: 'home', label: '首页', icon: Home },
    { id: 'rules', label: '基础规则', icon: BookOpen },
    { id: 'terminology', label: '术语大全', icon: Search },
    { id: 'regional', label: '地区差异', icon: MapPin },
    { id: 'tips', label: '实用口诀', icon: Lightbulb },
    { id: 'practice', label: '实战练习', icon: Target },
  ];

  const handleNavigation = (pageId: string) => {
    onNavigate(pageId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:block bg-green-700 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`flex items-center space-x-2 py-4 px-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-white border-b-2 border-white'
                      : 'text-green-100 hover:text-white hover:bg-green-600 rounded-t-md'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className={`lg:hidden bg-white shadow-lg transition-all duration-300 ${
        isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="container mx-auto px-4 py-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`flex items-center space-x-3 w-full py-3 px-3 text-left rounded-md transition-colors ${
                  isActive
                    ? 'bg-green-100 text-green-800 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Navigation;