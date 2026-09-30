import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { OnboardingModal } from './components/Onboarding/OnboardingModal';
import { Header } from './components/Header';
import { RecipeGenerator } from './components/RecipeGenerator/RecipeGenerator';
import { PantryManager } from './components/Pantry/PantryManager';
import { ChefChat } from './components/Chat/ChefChat';
import { FavoritesView } from './components/Saved/FavoritesView';
import { HistoryView } from './components/Saved/HistoryView';
import { SettingsView } from './components/Settings/SettingsView';
import { RecipeDetailModal } from './components/Recipe/RecipeDetailModal';
import { ChefHat, Heart, Sparkles } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { 
    onboardingCompleted, 
    activeTab, 
    setActiveTab, 
    selectedRecipe, 
    setSelectedRecipe, 
    t, 
    language,
    theme 
  } = useApp();

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-250 bg-[#FFF9F4] dark:bg-[#111111] text-[#171717] dark:text-[#FFFFFF]">
      
      {/* 1. ONBOARDING MODAL: Displayed exclusively when onboardingCompleted === false */}
      {!onboardingCompleted && <OnboardingModal />}

      {/* 2. MAIN APP CONTENT */}
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {activeTab === 'generator' && <RecipeGenerator />}
        {activeTab === 'pantry' && <PantryManager />}
        {activeTab === 'chat' && <ChefChat />}
        {activeTab === 'favorites' && <FavoritesView />}
        {activeTab === 'history' && <HistoryView />}
        {activeTab === 'settings' && <SettingsView />}
      </main>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <RecipeDetailModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-neutral-200/80 dark:border-neutral-800 bg-white/60 dark:bg-[#151515] py-8 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-lg">🍳</span>
            <span>AI Chef © 2026</span>
            <span>·</span>
            <span>{language === 'uz' ? 'O‘zbekcha' : language === 'ru' ? 'Русский' : 'English'}</span>
            <span>·</span>
            <span>{theme === 'light' ? '☀️ Light' : '🌙 Dark'}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className="hover:text-[#FF7A45] transition-colors font-medium"
            >
              {t.nav.settings}
            </button>
            <span>·</span>
            <span className="flex items-center gap-1">
              <span>Crafted for culinary lovers</span>
              <Heart className="w-3 h-3 text-[#FF7A45] fill-current" />
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
