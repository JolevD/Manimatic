import React from 'react';
import { ArrowRight, Info } from 'lucide-react';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  mode: 'basic' | 'explanatory';
  setMode: (mode: 'basic' | 'explanatory') => void;
  onSubmit: (e: React.FormEvent) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({
  prompt,
  setPrompt,
  mode,
  setMode,
  onSubmit,
}) => {
  return (
    <div className="relative">
      <div className="bg-slate-950/40 backdrop-blur-xl rounded-2xl border border-emerald-900/30 p-4 sm:p-6 shadow-2xl shadow-emerald-950/20">
        {/* Mode Toggle - Right Aligned */}
        <div className="flex items-center justify-end mb-3 sm:mb-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className={`text-xs sm:text-sm font-light tracking-wide transition-colors duration-500 ${
              mode === 'basic' ? 'text-slate-200' : 'text-slate-500'
            }`}>
              Basic
            </span>
            
            <button
              type="button"
              onClick={() => setMode(mode === 'basic' ? 'explanatory' : 'basic')}
              className={`relative w-7 h-3.5 sm:w-8 sm:h-4 rounded-full transition-all duration-500 ${
                mode === 'explanatory' 
                  ? 'bg-gradient-to-r from-emerald-700 to-emerald-600' 
                  : 'bg-slate-800/60'
              }`}
            >
              <div className={`absolute top-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-slate-100 rounded-full shadow-lg transition-transform duration-500 ${
                mode === 'explanatory' ? 'translate-x-3.5 sm:translate-x-4' : 'translate-x-0.5'
              }`} />
            </button>
            
            <span className={`text-xs sm:text-sm font-light tracking-wide transition-colors duration-500 ${
              mode === 'explanatory' ? 'text-slate-200' : 'text-slate-500'
            }`}>
              Explanatory
            </span>
            
            <div className="group relative">
              <Info className="w-3 h-3 text-slate-400 cursor-help" />
              <div className="absolute bottom-5 right-0 w-40 sm:w-48 p-2 sm:p-3 bg-slate-900/95 backdrop-blur-sm rounded-xl border border-emerald-900/30 text-xs text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                <strong className="text-emerald-300">Basic:</strong> Simple animations<br />
                <strong className="text-emerald-300">Explanatory:</strong> Detailed breakdowns
              </div>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your mathematical concept..."
            className="w-full h-16 sm:h-20 bg-slate-900/30 border border-emerald-900/20 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-slate-200 placeholder-slate-500 resize-none focus:outline-none focus:ring-1 focus:ring-emerald-600/50 focus:border-emerald-600/50 transition-all duration-500 font-light leading-relaxed"
            rows={3}
          />
        </div>

        {/* Example Prompts and Generate Button Row */}
        <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
          {/* Example Prompts - Left Side */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 flex-1">
            {!prompt && (
              <>
                <span className="text-xs text-slate-500 mr-1 font-light">Try:</span>
                {[
                  "Pythagorean theorem",
                  "Sorting algorithms",
                  "Matrix multiplication"
                ].map((example, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setPrompt(example)}
                    className="px-2 sm:px-3 py-1 bg-slate-800/40 hover:bg-emerald-900/30 rounded-lg text-xs text-slate-400 hover:text-emerald-300 transition-all duration-500 border border-slate-700/30 hover:border-emerald-700/30 font-light"
                  >
                    {example}
                  </button>
                ))}
              </>
            )}
          </div>

          {/* Generate Button - Right Side */}
          <button
            type="submit"
            onClick={onSubmit}
            disabled={!prompt.trim()}
            className="group flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-r from-emerald-700 to-emerald-600 hover:from-emerald-600 hover:to-emerald-500 disabled:from-slate-700 disabled:to-slate-600 rounded-xl transition-all duration-300 disabled:opacity-50 shadow-lg disabled:shadow-none backdrop-blur-sm border border-emerald-600/50 hover:border-emerald-500/60 disabled:border-slate-600/30 ml-0 sm:ml-4 self-end sm:self-auto"
          >
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptInput;