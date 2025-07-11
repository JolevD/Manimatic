import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Sparkles, Loader2, Zap } from 'lucide-react';

interface ConversationalInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const ConversationalInput: React.FC<ConversationalInputProps> = ({
  prompt,
  setPrompt,
  onSubmit,
}) => {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const samplePrompts = [
    "Explain Pythagorean theorem",
    "Explain bubble sort algorithm", 
    "Explain matrix multiplication",
    "Explain calculus derivatives",
    "Explain Fourier transforms"
  ];

  // Auto-resize textarea based on content
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      const maxHeight = 200; // max-height in pixels
      const minHeight = 76; // min-height in pixels
      
      if (scrollHeight > maxHeight) {
        textarea.style.height = `${maxHeight}px`;
        textarea.style.overflowY = 'auto';
      } else {
        textarea.style.height = `${Math.max(scrollHeight, minHeight)}px`;
        textarea.style.overflowY = 'hidden';
      }
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [prompt]);

  const handlePromptClick = (selectedPrompt: string) => {
    setPrompt(selectedPrompt);
  };

  const handleEnhancePrompt = async () => {
    if (!prompt.trim()) return;
    
    setIsEnhancing(true);
    
    try {
      const response = await fetch('/api/enhance-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt.trim()
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server response:', response.status, errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.enhancedPrompt) {
        setPrompt(data.enhancedPrompt);
      } else {
        console.error('No enhancedPrompt in response:', data);
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error enhancing prompt:', error);
      // Show user-friendly error message
      alert('Failed to enhance prompt. Please check if the backend server is running on port 3000.');
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (prompt.trim()) {
        onSubmit(e);
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Main Input Form - Bolt Style */}
      <div className="scale-in bg-slate-950/60 backdrop-blur-sm rounded-lg border border-emerald-900/20 shadow-xl">
        {/* Input Area */}
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your idea and we'll bring it to life"
            className="w-full pl-4 pt-4 pr-16 focus:outline-none resize-none text-slate-200 placeholder-slate-500 bg-transparent text-body scrollbar-thin scrollbar-thumb-emerald-800/50 scrollbar-track-transparent"
            style={{ 
              minHeight: '76px',
              maxHeight: '200px',
              height: '76px'
            }}
          />
        </div>

        {/* Bottom Controls */}
        <div className="flex justify-between items-center text-sm p-4 pt-2">
          {/* Left Side - Enhance Prompt Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleEnhancePrompt}
              disabled={!prompt.trim() || isEnhancing}
              className="flex items-center justify-center w-8 h-8 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-600 disabled:opacity-50 rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
              title="Enhance Prompt"
            >
              {isEnhancing ? (
                <Loader2 className="w-4 h-4 text-white animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 text-white" />
              )}
            </button>
          </div>

          {/* Right Side - Generate Button */}
          <div className="flex items-center gap-3">
            <button
              type="submit"
              onClick={onSubmit}
              disabled={!prompt.trim()}
              className="flex items-center justify-center w-8 h-8 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-600 disabled:opacity-50 rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
              title="Generate Video"
            >
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Powered by Manim CE */}
      <div className="fade-in delay-600 text-center mt-6 mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900/30 backdrop-blur-sm rounded-full border border-emerald-900/30">
          <Zap className="w-3 h-3 text-emerald-400" />
          <span className="text-xs text-slate-300 text-ui">Powered by Manim CE</span>
        </div>
      </div>

      {/* Try Prompts Section - Bolt Style */}
      <div className="fade-in delay-700 flex flex-wrap items-center justify-center gap-2 mx-4">
        {samplePrompts.map((samplePrompt, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handlePromptClick(samplePrompt)}
            className="border border-emerald-900/30 rounded-full bg-slate-950/40 hover:bg-slate-900/60 text-slate-400 hover:text-slate-200 px-3 py-1 text-ui text-xs transition-all duration-200 hover:border-emerald-700/40"
          >
            {samplePrompt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ConversationalInput;