import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

function App() {
  const [view, setView] = useState('landing');

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 font-sans relative">
      {/* Глобальный текстурный шум для всего приложения */}
      <div className="noise-overlay" />
      
      {view === 'landing' ? (
        <LandingPage onEnterDashboard={() => setView('dashboard')} />
      ) : (
        <Dashboard onGoBack={() => setView('landing')} />
      )}
    </div>
  );
}

export default App;
