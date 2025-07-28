import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import BasicRules from './components/BasicRules';
import Terminology from './components/Terminology';
import RegionalDifferences from './components/RegionalDifferences';
import Tips from './components/Tips';
import Practice from './components/Practice';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'rules':
        return <BasicRules />;
      case 'terminology':
        return <Terminology />;
      case 'regional':
        return <RegionalDifferences />;
      case 'tips':
        return <Tips />;
      case 'practice':
        return <Practice />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Header 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      <Navigation 
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      <main className="container mx-auto px-4 py-8 lg:px-8">
        {renderCurrentPage()}
      </main>
      
      <footer className="bg-green-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-green-200">© 2025 麻将新手教学网站 - 让学习麻将变得简单有趣</p>
        </div>
      </footer>
    </div>
  );
}

export default App;