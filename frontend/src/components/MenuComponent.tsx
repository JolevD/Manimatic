import React, { useState, useRef, useEffect } from 'react';
import { User, HelpCircle, LogOut, GalleryVertical as Gallery, ChevronRight, Settings } from 'lucide-react';
import SettingsModal from './SettingsModal';

interface MenuComponentProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement>;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  user?: {
    name: string;
    email: string;
    avatar?: string;
    initials: string;
    plan: 'free' | 'pro';
    creditsUsed: number;
    creditsTotal: number;
  } | null;
  onLogout?: () => void;
  onNavigate?: (path: string) => void;
}

const MenuComponent: React.FC<MenuComponentProps> = ({
  isOpen,
  onClose,
  triggerRef,
  position = 'bottom-right',
  user,
  onLogout,
  onNavigate
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Default user data if none provided
  const defaultUser = {
    name: "Your Name",
    email: "your.email@example.com",
    initials: "YN",
    plan: 'free' as const,
    creditsUsed: 0,
    creditsTotal: 5
  };

  const userData = user || defaultUser;

  // Position calculation
  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'top-full left-0 mt-2';
      case 'top-right':
        return 'bottom-full right-0 mb-2';
      case 'top-left':
        return 'bottom-full left-0 mb-2';
      default:
        return 'top-full right-0 mt-2';
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) &&
        triggerRef?.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, triggerRef]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    onClose();
  };

  const handleNavigation = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    }
    onClose();
  };

  const handleSettingsClick = () => {
    setIsSettingsModalOpen(true);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        ref={menuRef}
        className={`absolute ${getPositionClasses()} z-dropdown-menu min-w-[280px] overflow-hidden rounded-xl border border-emerald-900/40 bg-slate-950/95 menu-blur p-1 text-slate-200 shadow-2xl shadow-slate-950/50 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200`}
        role="menu"
        aria-orientation="vertical"
        style={{ 
          pointerEvents: 'auto'
        }}
      >
        {/* User Profile Section - Display user's name and email at the top */}
        <div className="px-4 py-4 border-b border-emerald-900/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-lg flex items-center justify-center flex-shrink-0">
              {userData.avatar ? (
                <img src={userData.avatar} alt={userData.name} className="h-full w-full object-cover rounded-lg" />
              ) : (
                <span className="text-sm font-medium text-white">
                  {userData.initials}
                </span>
              )}
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <p className="text-sm font-medium text-slate-200 truncate">{userData.name}</p>
              <p className="text-xs text-slate-400 truncate">{userData.email}</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-2">
          {/* Gallery */}
          <button 
            onClick={() => handleNavigation('/gallery')}
            className="relative flex cursor-pointer select-none items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-200 outline-none transition-all duration-200 hover:bg-slate-800/40 focus:bg-slate-800/40 w-full group"
            style={{ pointerEvents: 'auto' }}
          >
            <Gallery className="shrink-0 h-5 w-5 text-slate-400 group-hover:text-emerald-400 transition-colors" />
            <p className="group-hover:text-emerald-200 transition-colors">Gallery</p>
          </button>

          {/* Help Center */}
          <button 
            onClick={() => handleNavigation('/help')}
            className="relative flex cursor-pointer select-none items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-200 outline-none transition-all duration-200 hover:bg-slate-800/40 focus:bg-slate-800/40 w-full group"
            style={{ pointerEvents: 'auto' }}
          >
            <HelpCircle className="shrink-0 h-5 w-5 text-slate-400 group-hover:text-emerald-400 transition-colors" />
            <p className="group-hover:text-emerald-200 transition-colors">Help Center</p>
          </button>

          {/* Settings */}
          <button 
            onClick={handleSettingsClick}
            className="relative flex cursor-pointer select-none items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-200 outline-none transition-all duration-200 hover:bg-slate-800/40 focus:bg-slate-800/40 w-full group"
            style={{ pointerEvents: 'auto' }}
          >
            <Settings className="shrink-0 h-5 w-5 text-slate-400 group-hover:text-emerald-400 transition-colors" />
            <p className="group-hover:text-emerald-200 transition-colors">Settings</p>
          </button>

          {/* Mobile Navigation Items - Only visible on smaller screens */}
          <div className="lg:hidden">
            {/* Separator */}
            <div className="h-px bg-emerald-900/30 my-2 mx-3" />
            
            {/* Docs */}
            <button 
              className="relative flex cursor-pointer select-none items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-200 outline-none transition-all duration-200 hover:bg-slate-800/40 focus:bg-slate-800/40 w-full group"
              style={{ pointerEvents: 'auto' }}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-emerald-400/60 rounded-full group-hover:bg-emerald-400 transition-colors"></div>
              </div>
              <p className="group-hover:text-emerald-200 transition-colors">Docs</p>
            </button>

            {/* API */}
            <button 
              className="relative flex cursor-pointer select-none items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-200 outline-none transition-all duration-200 hover:bg-slate-800/40 focus:bg-slate-800/40 w-full group"
              style={{ pointerEvents: 'auto' }}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-emerald-400/60 rounded-full group-hover:bg-emerald-400 transition-colors"></div>
              </div>
              <p className="group-hover:text-emerald-200 transition-colors">API</p>
            </button>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px bg-emerald-900/30 my-1 mx-3" />

        {/* Sign Out - Only visible when user is logged in */}
        <div className="py-2">
          <button 
            onClick={handleLogout}
            className="relative flex cursor-pointer select-none items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-200 outline-none transition-all duration-200 hover:bg-red-900/20 hover:text-red-300 focus:bg-red-900/20 focus:text-red-300 w-full group"
            style={{ pointerEvents: 'auto' }}
          >
            <LogOut className="shrink-0 h-5 w-5 text-slate-400 group-hover:text-red-400 transition-colors" />
            <p className="group-hover:text-red-200 transition-colors">Sign Out</p>
          </button>
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />
    </>
  );
};

export default MenuComponent;