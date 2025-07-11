import React from 'react';

const BackgroundElements: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Subtle gradient orbs with obsidian green tones */}
      <div className="fade-in delay-100 absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-emerald-900/15 via-slate-900/10 to-transparent rounded-full blur-3xl animate-pulse duration-[8s]" />
      <div className="fade-in delay-300 absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-tl from-green-950/20 via-gray-900/15 to-transparent rounded-full blur-3xl animate-pulse duration-[12s] delay-[4s]" />
      <div className="fade-in delay-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-r from-slate-800/10 to-emerald-950/15 rounded-full blur-3xl animate-pulse duration-[10s] delay-[2s]" />
      
      {/* Minimal geometric accents */}
      <div className="fade-in delay-700 absolute top-24 right-32 w-1 h-1 bg-emerald-400/30 rounded-full animate-pulse duration-[6s]" />
      <div className="fade-in delay-800 absolute bottom-40 left-24 w-1.5 h-1.5 bg-slate-300/20 rounded-full animate-pulse duration-[8s] delay-[3s]" />
      
      {/* Subtle texture overlay */}
      <div className="fade-in absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2280%22 height=%2280%22 viewBox=%220 0 80 80%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.015%22%3E%3Ccircle cx=%2240%22 cy=%2240%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />
    </div>
  );
};

export default BackgroundElements;