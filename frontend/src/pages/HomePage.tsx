import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundElements from '../components/BackgroundElements';
import ConversationalInput from '../components/ConversationalInput';
import Header from '../components/Header';

const HomePage: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      // Add "Explain - " prefix to the prompt
      const prefixedPrompt = `Explain - ${prompt.trim()}`;
      navigate('/generate', { state: { prompt: prefixedPrompt } });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden background-fade">
      <BackgroundElements />
      
      <div className="fade-in-down z-header">
        <Header />
      </div>
      
      {/* Main content with proper scroll container */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 sm:px-6 py-8 sm:py-12 page-scroll">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="fade-in-up text-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light bg-gradient-to-r from-slate-100 via-emerald-100 to-slate-200 bg-clip-text text-transparent mb-4 leading-tight px-4">
            Create Videos with AI
          </h1>
          
          <p className="fade-in-up delay-200 text-body text-base sm:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed px-4">
            Transform mathematical concepts into animated videos using natural language
          </p>
        </div>

        <form onSubmit={handleSubmit} className="fade-in-up delay-400 w-full px-4">
          <ConversationalInput
            prompt={prompt}
            setPrompt={setPrompt}
            onSubmit={handleSubmit}
          />
        </form>
      </main>
    </div>
  );
};

export default HomePage;