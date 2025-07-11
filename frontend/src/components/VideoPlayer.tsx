import React from 'react';
import { Play, Loader2, Film } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string | null;
  isGenerating: boolean;
  prompt: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, isGenerating, prompt }) => {
  if (isGenerating) {
    return (
      <div className="w-full h-full flex items-center justify-center p-4 sm:p-8">
        <div className="text-center">
          <div className="fade-in-up inline-flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 animate-spin" />
            <span className="text-display text-lg sm:text-xl font-light text-slate-200">Generating your video...</span>
          </div>
          
          <div className="fade-in delay-400 flex items-center justify-center gap-2 sm:gap-3 text-slate-400">
            <Film className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="text-ui text-xs sm:text-sm">This may take a few moments...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!videoUrl) {
    return (
      <div className="w-full h-full flex items-center justify-center p-4 sm:p-8">
        <div className="text-center">
          <div className="fade-in-up w-10 h-10 sm:w-12 sm:h-12 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 backdrop-blur-sm border border-red-800/30">
            <Film className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
          </div>
          <p className="fade-in-up delay-200 text-body text-slate-300 text-sm sm:text-base">Failed to generate video. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-4 sm:p-8">
      {/* 16:9 Aspect Ratio Container */}
      <div className="scale-in w-full max-w-4xl">
        <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
          <div className="absolute inset-0 bg-slate-950 rounded-xl overflow-hidden shadow-2xl shadow-emerald-950/30 border border-emerald-900/20">
            {/* Video content area with 16:9 ratio maintained */}
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-emerald-950">
              <div className="text-center px-4">
                <div className="fade-in-up w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-700/80 to-slate-700/80 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg backdrop-blur-sm">
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 text-slate-100 ml-1" />
                </div>
                <h3 className="fade-in-up delay-200 text-display text-slate-200 text-lg sm:text-xl font-medium mb-2 sm:mb-3">Video Ready!</h3>
                <p className="fade-in-up delay-300 text-body text-slate-400 max-w-md leading-relaxed text-sm sm:text-base">Your Manim animation has been generated successfully.</p>
                
                {/* In production, replace this with actual video element */}
                <div className="fade-in delay-500 mt-6 sm:mt-8 p-3 sm:p-4 bg-emerald-900/20 rounded-lg border border-emerald-800/30 backdrop-blur-sm">
                  <p className="text-ui text-emerald-300 text-xs sm:text-sm">
                    Demo Mode: In production, the generated video would play here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;