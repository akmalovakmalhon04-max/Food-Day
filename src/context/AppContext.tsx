import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Theme, Recipe } from '../types';
import { translations, Translations, getTranslation } from '../locales';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  onboardingCompleted: boolean;
  completeOnboarding: (finalLanguage?: Language, finalTheme?: Theme) => void;
  resetOnboarding: () => void;
  t: Translations;
  activeTab: 'generator' | 'pantry' | 'chat' | 'favorites' | 'history' | 'settings';
  setActiveTab: (tab: 'generator' | 'pantry' | 'chat' | 'favorites' | 'history' | 'settings') => void;
  
  // Pantry
  pantryItems: string[];
  togglePantryItem: (item: string) => void;
  setPantryItems: React.Dispatch<React.SetStateAction<string[]>>;
  clearPantry: () => void;

  // Recipes
  favorites: Recipe[];
  history: Recipe[];
  toggleFavorite: (recipe: Recipe) => void;
  isFavorite: (recipeId: string) => boolean;
  addRecipeToHistory: (recipe: Recipe) => void;
  clearHistory: () => void;
  clearAllData: () => void;

  // Selected recipe to view
  selectedRecipe: Recipe | null;
  setSelectedRecipe: (recipe: Recipe | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  LANGUAGE: 'ai_chef_language',
  THEME: 'ai_chef_theme',
  ONBOARDING: 'ai_chef_onboarding_completed',
  PANTRY: 'ai_chef_pantry_items',
  FAVORITES: 'ai_chef_favorites',
  HISTORY: 'ai_chef_history',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Language state: default 'uz' per requirement
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LANGUAGE) as Language;
      if (saved && (saved === 'uz' || saved === 'ru' || saved === 'en')) {
        return saved;
      }
    } catch {
      // fallback
    }
    return 'uz';
  });

  // 2. Theme state: default 'light'
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME) as Theme;
      if (saved && (saved === 'light' || saved === 'dark')) {
        return saved;
      }
    } catch {
      // fallback
    }
    return 'light';
  });

  // 3. Onboarding completion state
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.ONBOARDING) === 'true';
    } catch {
      return false;
    }
  });

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<'generator' | 'pantry' | 'chat' | 'favorites' | 'history' | 'settings'>('generator');

  // Pantry items
  const [pantryItems, setPantryItems] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PANTRY);
      return saved ? JSON.parse(saved) : ['Tovuq go‘shti', 'Piyoz', 'Sabzi', 'Guruch', 'Zira'];
    } catch {
      return ['Tovuq go‘shti', 'Piyoz', 'Sabzi', 'Guruch', 'Zira'];
    }
  });

  // Favorites
  const [favorites, setFavorites] = useState<Recipe[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // History
  const [history, setHistory] = useState<Recipe[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HISTORY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Active recipe modal
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  // Sync theme to DOM
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch (e) {
      console.warn('Could not save theme to localStorage', e);
    }
  }, [theme]);

  // Sync language to storage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
    } catch (e) {
      console.warn('Could not save language to localStorage', e);
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const completeOnboarding = (finalLanguage?: Language, finalTheme?: Theme) => {
    const langToSave = finalLanguage || language;
    const themeToSave = finalTheme || theme;
    
    setLanguageState(langToSave);
    setThemeState(themeToSave);
    setOnboardingCompleted(true);
    
    try {
      localStorage.setItem(STORAGE_KEYS.LANGUAGE, langToSave);
      localStorage.setItem(STORAGE_KEYS.THEME, themeToSave);
      localStorage.setItem(STORAGE_KEYS.ONBOARDING, 'true');
    } catch (e) {
      console.warn('Could not save onboarding state', e);
    }
  };

  const resetOnboarding = () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.ONBOARDING);
    } catch (e) {
      console.warn('Failed resetting onboarding', e);
    }
    setOnboardingCompleted(false);
  };

  // Pantry state persistence
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PANTRY, JSON.stringify(pantryItems));
    } catch (e) {
      console.warn('Failed saving pantry', e);
    }
  }, [pantryItems]);

  const togglePantryItem = (item: string) => {
    setPantryItems(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const clearPantry = () => {
    setPantryItems([]);
  };

  // Favorites state persistence
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    } catch (e) {
      console.warn('Failed saving favorites', e);
    }
  }, [favorites]);

  const toggleFavorite = (recipe: Recipe) => {
    setFavorites(prev => {
      const exists = prev.some(r => r.id === recipe.id);
      if (exists) {
        return prev.filter(r => r.id !== recipe.id);
      } else {
        return [{ ...recipe, isFavorite: true }, ...prev];
      }
    });
  };

  const isFavorite = (recipeId: string) => {
    return favorites.some(r => r.id === recipeId);
  };

  // History state persistence
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
    } catch (e) {
      console.warn('Failed saving history', e);
    }
  }, [history]);

  const addRecipeToHistory = (recipe: Recipe) => {
    setHistory(prev => {
      const filtered = prev.filter(r => r.id !== recipe.id);
      return [recipe, ...filtered].slice(0, 30);
    });
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const clearAllData = () => {
    try {
      localStorage.clear();
    } catch (e) {
      console.warn('Failed clearing storage', e);
    }
    setFavorites([]);
    setHistory([]);
    setPantryItems([]);
    setOnboardingCompleted(false);
    setLanguageState('uz');
    setThemeState('light');
  };

  const t = getTranslation(language);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        setTheme,
        toggleTheme,
        onboardingCompleted,
        completeOnboarding,
        resetOnboarding,
        t,
        activeTab,
        setActiveTab,
        pantryItems,
        togglePantryItem,
        setPantryItems,
        clearPantry,
        favorites,
        history,
        toggleFavorite,
        isFavorite,
        addRecipeToHistory,
        clearHistory,
        clearAllData,
        selectedRecipe,
        setSelectedRecipe,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
