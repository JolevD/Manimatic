import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, LogIn } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import MenuComponent from './MenuComponent';

const Header: React.FC = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, isAuthenticated, login, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const userMenuTriggerRef = useRef<HTMLButtonElement>(null);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const closeUserMenu = () => {
    setIsUserMenuOpen(false);
  };

  // Demo login function - in production this would be a proper auth flow
  const handleDemoLogin = () => {
    const demoUser = {
      id: '1',
      name: "Alex Chen",
      email: "alex.chen@example.com",
      initials: "AC",
      plan: 'free' as const,
      creditsUsed: 2,
      creditsTotal: 5
    };
    login(demoUser);
  };

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeUserMenu();
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isUserMenuOpen]);

  const handleNavigation = (path: string) => {
    navigate(path);
    closeUserMenu();
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="relative z-[100] px-4 sm:px-6 py-4">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-8">
          {/* Logo */}
          <button
            onClick={() => handleNavigation('/')}
            className="slide-in-left flex items-center gap-3 transition-all duration-300 group"
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-emerald-600/80 to-slate-700/60 rounded-lg flex items-center justify-center backdrop-blur-sm border border-emerald-500/20 group-hover:border-emerald-400/40 transition-all duration-300">
              <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-200 group-hover:text-emerald-100 transition-colors duration-300" />
            </div>
            <span className="text-lg sm:text-xl font-display font-medium text-slate-100 tracking-tight group-hover:text-emerald-100 transition-colors duration-300">ManimAI</span>
          </button>
          
          {/* Navigation Links - Always visible on larger screens */}
          <div className="fade-in delay-200 hidden lg:flex items-center gap-6 xl:gap-8">
            <button
              onClick={() => handleNavigation('/gallery')}
              className={`transition-colors duration-500 text-ui text-sm ${
                isActive('/gallery')
                  ? 'text-emerald-200'
                  : 'text-slate-300 hover:text-emerald-200'
              }`}
            >
              Gallery
            </button>
            <button
              onClick={() => handleNavigation('/help')}
              className={`transition-colors duration-500 text-ui text-sm ${
                isActive('/help')
                  ? 'text-emerald-200'
                  : 'text-slate-300 hover:text-emerald-200'
              }`}
            >
              Help
            </button>
            <a href="#" className="text-slate-300 hover:text-emerald-200 transition-colors duration-500 text-ui text-sm">Docs</a>
            <a href="#" className="text-slate-300 hover:text-emerald-200 transition-colors duration-500 text-ui text-sm">API</a>
          </div>
        </div>
        
        {/* Right side buttons */}
        <div className="slide-in-right flex items-center gap-2 sm:gap-3">
          {isAuthenticated ? (
            <>
              {/* User Menu Button */}
              <div className="relative z-[110]">
                <button
                  ref={userMenuTriggerRef}
                  onClick={toggleUserMenu}
                  className="flex items-center gap-2 px-3 py-2 bg-slate-800/40 hover:bg-slate-700/50 rounded-lg transition-all duration-300 backdrop-blur-sm border border-slate-700/30 hover:border-emerald-700/40 group z-[110]"
                  style={{ position: 'relative', zIndex: 110 }}
                >
                  <div className="w-6 h-6 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-medium text-white">{user?.initials}</span>
                  </div>
                  <span className="text-slate-300 group-hover:text-emerald-200 transition-colors duration-300 text-ui text-sm hidden sm:inline">
                    {user?.name.split(' ')[0]}
                  </span>
                </button>
                
                {/* User Menu */}
                <MenuComponent
                  isOpen={isUserMenuOpen}
                  onClose={closeUserMenu}
                  triggerRef={userMenuTriggerRef}
                  position="bottom-right"
                  user={user}
                  onLogout={logout}
                  onNavigate={handleNavigation}
                />
              </div>
            </>
          ) : (
            <>
              {/* Login button for non-authenticated users */}
              <button
                onClick={handleDemoLogin}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 text-slate-300 hover:text-emerald-200 transition-colors duration-500 text-ui text-sm"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
              
              {/* Get Started button - only for non-authenticated users */}
              <button
                onClick={() => handleNavigation('/')}
                className="px-4 sm:px-6 py-2 bg-gradient-to-r from-emerald-700 to-emerald-600 hover:from-emerald-600 hover:to-emerald-500 text-white rounded-lg transition-all duration-300 shadow-lg backdrop-blur-sm border border-emerald-600/50 hover:border-emerald-500/60 text-ui text-xs sm:text-sm"
              >
                Get Started
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;