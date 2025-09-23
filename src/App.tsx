import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import DemoPage from './components/DemoPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'login':
        return <LoginPage onNavigate={setCurrentPage} />;
      case 'demo':
        return <DemoPage onNavigate={setCurrentPage} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen">
      {currentPage !== 'demo' && (
        <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      )}
      {renderPage()}
    </div>
  );
}

export default App;