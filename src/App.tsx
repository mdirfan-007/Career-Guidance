import React, { useEffect } from 'react';
import './index.css';
import Header from './components/Header';
import SurveyForm from './components/SurveyForm';
import Footer from './components/Footer';

export function App() {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col text-white relative overflow-hidden">
      {/* Animated background shapes */}
      <div className="floating-shape shape-1"></div>
      <div className="floating-shape shape-2"></div>
      <div className="floating-shape shape-3"></div>
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a1215]/80 z-0"></div>
      
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col relative z-10">
        {/* Header with form title and description */}
        <Header />
        
        {/* Main survey form */}
        <main className="flex-1 mb-8">
          <div className="glass-card rounded-xl p-6 md:p-8 border border-[#11cb5f]/20">
            <SurveyForm />
          </div>
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
