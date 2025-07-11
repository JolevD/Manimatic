import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Download, Share2, Play, Code, Sparkles, Upload, Globe, Lock } from 'lucide-react';
import ChatInterface from '../components/ChatInterface';
import VideoPlayer from '../components/VideoPlayer';
import ManimCodeDisplay from '../components/ManimCodeDisplay';

const VideoGeneratorPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(true);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [publishSettings, setPublishSettings] = useState({
    title: '',
    description: '',
    category: 'Mathematics',
    tags: '',
    isPublic: true
  });
  
  const initialPrompt = location.state?.prompt || '';

  useEffect(() => {
    if (!initialPrompt) {
      navigate('/');
      return;
    }

    // Simulate video generation
    const timer = setTimeout(() => {
      setIsGenerating(false);
      // Using a sample video URL - in production this would come from your backend
      setVideoUrl('https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4');
      // Pre-fill publish form with generated content
      setPublishSettings(prev => ({
        ...prev,
        title: `Animation: ${initialPrompt}`,
        description: `Mathematical animation created from the prompt: "${initialPrompt}"`
      }));
    }, 3000);

    return () => clearTimeout(timer);
  }, [initialPrompt, navigate]);

  const handleBack = () => {
    navigate('/');
  };

  const handlePublish = () => {
    setShowPublishModal(true);
  };

  const handlePublishSubmit = () => {
    // In production, this would send the video data to your backend
    console.log('Publishing video with settings:', publishSettings);
    
    // Simulate API call
    setTimeout(() => {
      setShowPublishModal(false);
      // Show success message or redirect to gallery
      alert('Video published successfully!');
    }, 1000);
  };

  const categories = [
    'Mathematics',
    'Geometry',
    'Algorithms',
    'Linear Algebra',
    'Signal Processing',
    'Calculus',
    'Data Structures',
    'Physics',
    'Statistics'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-gray-950 background-fade flex flex-col">
      {/* Fixed Header */}
      <header className="fade-in-down flex-shrink-0 bg-slate-950/60 backdrop-blur-sm border-b border-emerald-900/20 z-50">
        <div className="px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          {/* ManimAI Logo - Clickable Home Button */}
          <button
            onClick={handleBack}
            className="flex items-center gap-3 transition-all duration-300 group"
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-emerald-600/80 to-slate-700/60 rounded-lg flex items-center justify-center backdrop-blur-sm border border-emerald-500/20 group-hover:border-emerald-400/40 transition-all duration-300">
              <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-200 group-hover:text-emerald-100 transition-colors duration-300" />
            </div>
            <span className="text-lg sm:text-xl font-display font-medium text-slate-100 tracking-tight group-hover:text-emerald-100 transition-colors duration-300">ManimAI</span>
          </button>
          
          <div className="flex items-center gap-2 sm:gap-3">
            {videoUrl && (
              <>
                <button 
                  onClick={handlePublish}
                  className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-emerald-700 to-emerald-600 hover:from-emerald-600 hover:to-emerald-500 rounded-lg transition-all duration-300 backdrop-blur-sm border border-emerald-600/50 hover:border-emerald-500/60"
                >
                  <Upload className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                  <span className="hidden sm:inline text-ui text-white text-xs sm:text-sm">Publish</span>
                </button>
                <button className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-emerald-800/60 hover:bg-emerald-700/70 rounded-lg transition-all duration-500 backdrop-blur-sm border border-emerald-700/30">
                  <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-200" />
                  <span className="hidden sm:inline text-ui text-slate-200 text-xs sm:text-sm">Download</span>
                </button>
                <button className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-800/60 hover:bg-slate-700/70 rounded-lg transition-all duration-500 backdrop-blur-sm border border-slate-700/30">
                  <Share2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-200" />
                  <span className="hidden sm:inline text-ui text-slate-200 text-xs sm:text-sm">Share</span>
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area - Responsive Layout with proper scrolling */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0 page-scroll">
        {/* Video/Code Area - Mobile: First, Desktop: Left */}
        <div className="fade-in-up delay-200 flex-1 lg:flex-[2] p-4 sm:p-6 lg:p-8 flex flex-col order-1 lg:order-1 mobile-video-container lg:min-h-0">
          <div className="bg-slate-950/40 backdrop-blur-sm rounded-xl border border-emerald-900/20 flex-1 flex flex-col overflow-hidden min-h-[50vh] lg:min-h-0">
            {/* Toggle Buttons - Fixed Header */}
            {videoUrl && !isGenerating && (
              <div className="fade-in flex items-center justify-center p-4 border-b border-emerald-900/20 flex-shrink-0">
                <div className="flex items-center bg-slate-900/40 rounded-lg p-1 backdrop-blur-sm border border-emerald-900/30">
                  <button
                    onClick={() => setShowCode(false)}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md transition-all duration-300 text-sm ${
                      !showCode
                        ? 'bg-emerald-700/60 text-slate-100 shadow-lg'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                    }`}
                  >
                    <Play className="w-4 h-4" />
                    <span className="text-ui hidden sm:inline">Video</span>
                  </button>
                  <button
                    onClick={() => setShowCode(true)}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md transition-all duration-300 text-sm ${
                      showCode
                        ? 'bg-emerald-700/60 text-slate-100 shadow-lg'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                    }`}
                  >
                    <Code className="w-4 h-4" />
                    <span className="text-ui hidden sm:inline">Code</span>
                  </button>
                </div>
              </div>
            )}

            {/* Content Area - Flexible Height with proper scrolling */}
            <div className="flex-1 min-h-0 overflow-hidden">
              {showCode && videoUrl && !isGenerating ? (
                <div className="w-full h-full scrollbar-code">
                  <ManimCodeDisplay prompt={initialPrompt} />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center p-4 overflow-auto scrollbar-thin">
                  <VideoPlayer 
                    videoUrl={videoUrl} 
                    isGenerating={isGenerating}
                    prompt={initialPrompt}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Chat Area - Mobile: Second, Desktop: Right */}
        <div className="fade-in-up delay-300 flex-1 lg:flex-[1] border-t lg:border-t-0 lg:border-l border-emerald-900/20 order-2 lg:order-2 flex flex-col mobile-chat-container lg:h-full">
          {/* Mobile: Fixed height with scrolling, Desktop: Full height */}
          <div className="h-full flex flex-col overflow-hidden">
            <ChatInterface 
              initialPrompt={initialPrompt}
            />
          </div>
        </div>
      </div>

      {/* Publish Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 modal-backdrop">
          <div className="bg-slate-950/95 backdrop-blur-sm rounded-xl border border-emerald-900/20 max-w-2xl w-full max-h-[90vh] overflow-hidden modal-content">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-emerald-900/20">
              <h2 className="text-display text-xl text-slate-200 font-medium">Publish to Gallery</h2>
              <button
                onClick={() => setShowPublishModal(false)}
                className="p-2 hover:bg-slate-800/60 rounded-lg transition-colors duration-300"
              >
                <span className="sr-only">Close</span>
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)] scrollbar-modal">
              {/* Visibility Toggle */}
              <div className="flex items-center justify-between p-4 bg-slate-900/40 rounded-lg border border-emerald-900/20">
                <div className="flex items-center gap-3">
                  {publishSettings.isPublic ? (
                    <Globe className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Lock className="w-5 h-5 text-slate-400" />
                  )}
                  <div>
                    <h3 className="text-slate-200 font-medium">
                      {publishSettings.isPublic ? 'Public' : 'Private'}
                    </h3>
                    <p className="text-slate-400 text-sm">
                      {publishSettings.isPublic 
                        ? 'Visible to everyone in the community gallery'
                        : 'Only visible in your personal gallery'
                      }
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setPublishSettings(prev => ({ ...prev, isPublic: !prev.isPublic }))}
                  className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                    publishSettings.isPublic 
                      ? 'bg-gradient-to-r from-emerald-700 to-emerald-600' 
                      : 'bg-slate-700'
                  }`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-lg transition-transform duration-300 ${
                    publishSettings.isPublic ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              {/* Title */}
              <div>
                <label className="block text-slate-200 font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={publishSettings.title}
                  onChange={(e) => setPublishSettings(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-900/40 border border-emerald-900/20 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-600/50 focus:border-emerald-600/50 transition-all duration-300"
                  placeholder="Enter a descriptive title..."
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-slate-200 font-medium mb-2">Description</label>
                <textarea
                  value={publishSettings.description}
                  onChange={(e) => setPublishSettings(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-900/40 border border-emerald-900/20 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-600/50 focus:border-emerald-600/50 transition-all duration-300 resize-none scrollbar-modal"
                  placeholder="Describe what this animation demonstrates..."
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-slate-200 font-medium mb-2">Category</label>
                <select
                  value={publishSettings.category}
                  onChange={(e) => setPublishSettings(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-900/40 border border-emerald-900/20 rounded-lg text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-600/50 focus:border-emerald-600/50 transition-all duration-300"
                >
                  {categories.map((category) => (
                    <option key={category} value={category} className="bg-slate-900">
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-slate-200 font-medium mb-2">Tags</label>
                <input
                  type="text"
                  value={publishSettings.tags}
                  onChange={(e) => setPublishSettings(prev => ({ ...prev, tags: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-900/40 border border-emerald-900/20 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-600/50 focus:border-emerald-600/50 transition-all duration-300"
                  placeholder="theorem, geometry, proof (comma separated)"
                />
                <p className="text-slate-500 text-sm mt-1">Separate tags with commas</p>
              </div>

              {/* Original Prompt Display */}
              <div>
                <label className="block text-slate-200 font-medium mb-2">Original Prompt</label>
                <div className="p-4 bg-slate-900/40 rounded-lg border border-emerald-900/20">
                  <p className="text-slate-300 text-sm leading-relaxed">{initialPrompt}</p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-emerald-900/20">
              <button
                onClick={() => setShowPublishModal(false)}
                className="px-4 py-2 text-slate-300 hover:text-slate-200 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handlePublishSubmit}
                disabled={!publishSettings.title.trim()}
                className="px-6 py-2 bg-gradient-to-r from-emerald-700 to-emerald-600 hover:from-emerald-600 hover:to-emerald-500 disabled:from-slate-700 disabled:to-slate-600 text-white rounded-lg transition-all duration-300 disabled:opacity-50 shadow-lg disabled:shadow-none"
              >
                Publish Video
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoGeneratorPage;