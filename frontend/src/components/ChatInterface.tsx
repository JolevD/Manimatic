import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, User, Bot, Sparkles, Loader2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatInterfaceProps {
  initialPrompt: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ initialPrompt }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: initialPrompt,
      sender: 'user',
      timestamp: new Date(),
    },
    {
      id: '2',
      content: `I'm generating an animation for: "${initialPrompt}". The video will include mathematical visualizations with smooth transitions and clear explanations. You can ask me to modify specific aspects or generate additional variations.`,
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-resize textarea based on content
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      const maxHeight = 120; // max-height in pixels
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
  }, [newMessage]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "I understand your request. I'll modify the animation accordingly. The updated video will be generated shortly with your specified changes.",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleEnhancePrompt = async () => {
    if (!newMessage.trim()) return;
    
    setIsEnhancing(true);
    
    try {
      const response = await fetch('/api/enhance-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          prompt: newMessage.trim()
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server response:', response.status, errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.enhancedPrompt) {
        setNewMessage(data.enhancedPrompt);
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
    setNewMessage(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (newMessage.trim()) {
        handleSendMessage(e);
      }
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-950/40 backdrop-blur-sm overflow-hidden">
      {/* Messages - Independent Scrollable Container */}
      <div className="fade-in delay-100 flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6 scrollbar-chat min-h-0">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`fade-in-up flex gap-3 sm:gap-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {message.sender === 'ai' && (
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-emerald-600/60 to-slate-700/60 rounded-lg flex items-center justify-center shrink-0 backdrop-blur-sm">
                <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-200" />
              </div>
            )}
            
            <div
              className={`max-w-[85%] sm:max-w-xs rounded-xl px-3 sm:px-5 py-3 sm:py-4 ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-emerald-800/60 to-slate-800/60 text-slate-100 backdrop-blur-sm'
                  : 'bg-slate-900/40 text-slate-200 border border-emerald-900/20 backdrop-blur-sm'
              }`}
            >
              <p className="text-body text-xs sm:text-sm leading-relaxed">{message.content}</p>
              <p className="text-xs opacity-60 mt-2 sm:mt-3 text-mono">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>

            {message.sender === 'user' && (
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-slate-800/60 rounded-lg flex items-center justify-center shrink-0 backdrop-blur-sm border border-slate-700/30">
                <User className="w-3 h-3 sm:w-4 sm:h-4 text-slate-300" />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input - Fixed at Bottom */}
      <form onSubmit={handleSendMessage} className="fade-in-up delay-300 p-4 sm:p-6 border-t border-emerald-900/20 flex-shrink-0">
        <div className="bg-slate-950/60 backdrop-blur-sm rounded-lg border border-emerald-900/20 shadow-xl">
          {/* Input Area */}
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={newMessage}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask for modifications or improvements..."
              className="w-full pl-4 pt-4 pr-16 focus:outline-none resize-none text-slate-200 placeholder-slate-500 bg-transparent text-body scrollbar-thin"
              style={{ 
                minHeight: '76px',
                maxHeight: '120px',
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
                disabled={!newMessage.trim() || isEnhancing}
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

            {/* Right Side - Send Button */}
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="flex items-center justify-center w-8 h-8 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-600 disabled:opacity-50 rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
                title="Send Message"
              >
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;