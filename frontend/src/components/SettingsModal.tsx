import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Download, 
  Globe,
  Monitor,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { user, updateUser } = useAuth();
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Settings state
  const [settings, setSettings] = useState({
    theme: 'dark',
    notifications: true,
    soundEffects: true,
    autoPlay: true,
    defaultVideoQuality: 'high',
    showCodeByDefault: false,
    emailNotifications: true,
    communityUpdates: false,
    language: 'en'
  });

  // Profile settings
  const [profileSettings, setProfileSettings] = useState({
    displayName: user?.name || '',
    email: user?.email || '',
    bio: '',
    publicProfile: true
  });

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

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

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleProfileChange = (key: string, value: string | boolean) => {
    setProfileSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    // In production, this would save to backend
    console.log('Saving settings:', settings, profileSettings);
    
    // Update user profile if changed
    if (user && (profileSettings.displayName !== user.name || profileSettings.email !== user.email)) {
      updateUser({
        name: profileSettings.displayName,
        email: profileSettings.email
      });
    }
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 modal-backdrop">
      <div
        ref={modalRef}
        className="bg-slate-950/95 backdrop-blur-sm rounded-xl border border-emerald-900/20 max-w-2xl w-full max-h-[90vh] overflow-hidden modal-content"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-emerald-900/20">
          <h2 className="text-display text-xl text-slate-200 font-medium">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800/60 rounded-lg transition-colors duration-300"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-8 overflow-y-auto max-h-[calc(90vh-140px)] scrollbar-modal">
          {/* Profile Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <User className="w-5 h-5 text-emerald-400" />
              <h3 className="text-slate-200 font-medium">Profile</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Display Name</label>
                <input
                  type="text"
                  value={profileSettings.displayName}
                  onChange={(e) => handleProfileChange('displayName', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900/40 border border-emerald-900/20 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-600/50 focus:border-emerald-600/50 transition-all duration-300"
                />
              </div>
              
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={profileSettings.email}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900/40 border border-emerald-900/20 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-600/50 focus:border-emerald-600/50 transition-all duration-300"
                />
              </div>
              
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Bio</label>
                <textarea
                  value={profileSettings.bio}
                  onChange={(e) => handleProfileChange('bio', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-900/40 border border-emerald-900/20 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-600/50 focus:border-emerald-600/50 transition-all duration-300 resize-none scrollbar-modal"
                  placeholder="Tell us about yourself..."
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-slate-200 font-medium">Public Profile</h4>
                  <p className="text-slate-400 text-sm">Allow others to see your profile and videos</p>
                </div>
                <button
                  onClick={() => handleProfileChange('publicProfile', !profileSettings.publicProfile)}
                  className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                    profileSettings.publicProfile 
                      ? 'bg-gradient-to-r from-emerald-700 to-emerald-600' 
                      : 'bg-slate-700'
                  }`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-lg transition-transform duration-300 ${
                    profileSettings.publicProfile ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          {/* Appearance Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Palette className="w-5 h-5 text-emerald-400" />
              <h3 className="text-slate-200 font-medium">Appearance</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-3">Theme</label>
                <div className="flex gap-3">
                  {[
                    { value: 'dark', label: 'Dark', icon: Moon },
                    { value: 'light', label: 'Light', icon: Sun },
                    { value: 'system', label: 'System', icon: Monitor }
                  ].map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      onClick={() => handleSettingChange('theme', value)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-all duration-300 ${
                        settings.theme === value
                          ? 'bg-emerald-700/60 border-emerald-600/50 text-slate-100'
                          : 'bg-slate-800/40 border-slate-700/30 text-slate-300 hover:bg-slate-700/40'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Video Settings Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Download className="w-5 h-5 text-emerald-400" />
              <h3 className="text-slate-200 font-medium">Video Settings</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-3">Default Video Quality</label>
                <select
                  value={settings.defaultVideoQuality}
                  onChange={(e) => handleSettingChange('defaultVideoQuality', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900/40 border border-emerald-900/20 rounded-lg text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-600/50"
                >
                  <option value="low">Low (480p)</option>
                  <option value="medium">Medium (720p)</option>
                  <option value="high">High (1080p)</option>
                  <option value="ultra">Ultra (4K)</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-slate-200 font-medium">Auto-play videos</h4>
                  <p className="text-slate-400 text-sm">Automatically play videos when opened</p>
                </div>
                <button
                  onClick={() => handleSettingChange('autoPlay', !settings.autoPlay)}
                  className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                    settings.autoPlay 
                      ? 'bg-gradient-to-r from-emerald-700 to-emerald-600' 
                      : 'bg-slate-700'
                  }`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-lg transition-transform duration-300 ${
                    settings.autoPlay ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-slate-200 font-medium">Show code by default</h4>
                  <p className="text-slate-400 text-sm">Display Manim code when opening videos</p>
                </div>
                <button
                  onClick={() => handleSettingChange('showCodeByDefault', !settings.showCodeByDefault)}
                  className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                    settings.showCodeByDefault 
                      ? 'bg-gradient-to-r from-emerald-700 to-emerald-600' 
                      : 'bg-slate-700'
                  }`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-lg transition-transform duration-300 ${
                    settings.showCodeByDefault ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-5 h-5 text-emerald-400" />
              <h3 className="text-slate-200 font-medium">Notifications</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-slate-200 font-medium">Push notifications</h4>
                  <p className="text-slate-400 text-sm">Receive notifications in your browser</p>
                </div>
                <button
                  onClick={() => handleSettingChange('notifications', !settings.notifications)}
                  className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                    settings.notifications 
                      ? 'bg-gradient-to-r from-emerald-700 to-emerald-600' 
                      : 'bg-slate-700'
                  }`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-lg transition-transform duration-300 ${
                    settings.notifications ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-slate-200 font-medium">Email notifications</h4>
                  <p className="text-slate-400 text-sm">Receive updates via email</p>
                </div>
                <button
                  onClick={() => handleSettingChange('emailNotifications', !settings.emailNotifications)}
                  className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                    settings.emailNotifications 
                      ? 'bg-gradient-to-r from-emerald-700 to-emerald-600' 
                      : 'bg-slate-700'
                  }`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-lg transition-transform duration-300 ${
                    settings.emailNotifications ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-slate-200 font-medium">Sound effects</h4>
                  <p className="text-slate-400 text-sm">Play sounds for interactions</p>
                </div>
                <button
                  onClick={() => handleSettingChange('soundEffects', !settings.soundEffects)}
                  className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                    settings.soundEffects 
                      ? 'bg-gradient-to-r from-emerald-700 to-emerald-600' 
                      : 'bg-slate-700'
                  }`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-lg transition-transform duration-300 ${
                    settings.soundEffects ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          {/* Privacy Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-5 h-5 text-emerald-400" />
              <h3 className="text-slate-200 font-medium">Privacy & Security</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-slate-200 font-medium">Community updates</h4>
                  <p className="text-slate-400 text-sm">Receive updates about new features and community</p>
                </div>
                <button
                  onClick={() => handleSettingChange('communityUpdates', !settings.communityUpdates)}
                  className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                    settings.communityUpdates 
                      ? 'bg-gradient-to-r from-emerald-700 to-emerald-600' 
                      : 'bg-slate-700'
                  }`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-lg transition-transform duration-300 ${
                    settings.communityUpdates ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
              
              <div>
                <button className="flex items-center gap-3 text-slate-300 hover:text-emerald-300 transition-colors duration-300">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm">Download my data</span>
                </button>
              </div>
              
              <div>
                <button className="flex items-center gap-3 text-red-400 hover:text-red-300 transition-colors duration-300">
                  <X className="w-4 h-4" />
                  <span className="text-sm">Delete account</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-emerald-900/20">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-300 hover:text-slate-200 transition-colors duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveSettings}
            className="px-6 py-2 bg-gradient-to-r from-emerald-700 to-emerald-600 hover:from-emerald-600 hover:to-emerald-500 text-white rounded-lg transition-all duration-300 shadow-lg"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;