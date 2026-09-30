import React, { useState, useRef, useEffect } from 'react';
import { 
  ChefHat, 
  Sun, 
  Moon, 
  Globe, 
  Bookmark, 
  History, 
  Settings as SettingsIcon, 
  Sparkles, 
  Refrigerator, 
  MessageSquare,
  Menu,
  X,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';

export const Header: React.FC = () => {
  const { 
    language, 
    setLanguage, 
    theme, 
    toggleTheme, 
    activeTab, 
    setActiveTab, 
    t, 
    favorites 
  } = useApp();

  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languageList: { code: Language; label: string; flag: string }[] = [
    { code: 'uz', label: 'O‘zbekcha', flag: '🇺🇿' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
  ];

  const currentLangObj = languageList.find(l => l.code === language) || languageList[0];

  interface NavItem {
    id: 'generator' | 'pantry' | 'chat' | 'favorites' | 'history' | 'settings';
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
  }

  const navItems: NavItem[] = [
    { id: 'generator', label: t.nav.recipes, icon: Sparkles },
    { id: 'pantry', label: t.nav.pantry, icon: Refrigerator },
    { id: 'chat', label: t.nav.chat, icon: MessageSquare },
    { 
      id: 'favorites', 
      label: t.nav.favorites, 
      icon: Bookmark, 
      badge: favorites.length > 0 ? favorites.length : undefined 
    },
    { id: 'history', label: t.nav.history, icon: History },
    { id: 'settings', label: t.nav.settings, icon: SettingsIcon },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b backdrop-blur-md transition-colors duration-250 border-neutral-200/80 dark:border-neutral-800 bg-[#FFF9F4]/90 dark:bg-[#111111]/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Name */}
        <button
          type="button"
          onClick={() => setActiveTab('generator')}
          className="flex items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A45] rounded-xl p-1"
        >
          <div className="w-11 h-11 rounded-2xl bg-[#FF7A45] text-white flex items-center justify-center shadow-md shadow-orange-500/25 transition-transform hover:scale-105 active:scale-95">
            <span className="text-2xl" role="img" aria-label="AI Chef logo">🍳</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-black text-xl tracking-tight text-neutral-900 dark:text-white">
              <span>AI Chef</span>
              <span className="text-xs px-1.5 py-0.5 rounded-md font-semibold bg-orange-100 dark:bg-orange-950/80 text-[#FF7A45] border border-orange-200/70 dark:border-orange-800/40">
                PRO
              </span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium hidden sm:block">
              {t.header.tagline}
            </p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-neutral-100/70 dark:bg-neutral-900/80 p-1.5 rounded-2xl border border-neutral-200/60 dark:border-neutral-800">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`relative px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#FF7A45] text-white shadow-sm shadow-orange-500/30'
                    : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-white/70 dark:hover:bg-neutral-800/70'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span
                    className={`ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                      isActive
                        ? 'bg-white text-[#FF7A45]'
                        : 'bg-orange-100 dark:bg-orange-950 text-[#FF7A45]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Language Switcher, Theme Switcher, Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Language Selector Dropdown */}
          <div className="relative" ref={langMenuRef}>
            <button
              type="button"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#181818] text-neutral-800 dark:text-neutral-200 hover:border-orange-300 dark:hover:border-neutral-700 transition-colors shadow-xs"
              aria-label="Select Language"
              aria-expanded={langMenuOpen}
            >
              <span className="text-base sm:text-lg">{currentLangObj.flag}</span>
              <span className="hidden sm:inline">{currentLangObj.label}</span>
              <Globe className="w-3.5 h-3.5 text-neutral-400" />
            </button>

            {langMenuOpen && (
              <div 
                className="absolute right-0 mt-2 w-48 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#202020] p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                role="menu"
              >
                <div className="px-3 py-1.5 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                  {t.header.language}
                </div>
                {languageList.map((lang) => {
                  const isCurrent = language === lang.code;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                        isCurrent
                          ? 'bg-orange-50 dark:bg-neutral-800 text-[#FF7A45]'
                          : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">{lang.flag}</span>
                        <span>{lang.label}</span>
                      </div>
                      {isCurrent && <Check className="w-4 h-4 text-[#FF7A45]" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Theme Switcher Toggle (☀️ Light / 🌙 Dark) */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#181818] text-neutral-800 dark:text-neutral-200 hover:border-orange-300 dark:hover:border-neutral-700 transition-colors shadow-xs flex items-center gap-2"
            aria-label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} mode`}
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} mode`}
          >
            {theme === 'light' ? (
              <>
                <Sun className="w-4 h-4 text-amber-500 fill-amber-500/20" />
                <span className="hidden md:inline font-bold text-xs">{t.header.light}</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-[#FF7A45] fill-orange-500/20" />
                <span className="hidden md:inline font-bold text-xs">{t.header.dark}</span>
              </>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#181818] text-neutral-800 dark:text-neutral-200"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#181818] px-4 pt-3 pb-5 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                  isActive
                    ? 'bg-[#FF7A45] text-white shadow-sm'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      isActive
                        ? 'bg-white text-[#FF7A45]'
                        : 'bg-orange-100 dark:bg-orange-950 text-[#FF7A45]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
