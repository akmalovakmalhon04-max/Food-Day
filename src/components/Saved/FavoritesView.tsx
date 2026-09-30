import React, { useState } from 'react';
import { Bookmark, Search, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RecipeCard } from '../Recipe/RecipeCard';

export const FavoritesView: React.FC = () => {
  const { t, favorites, setSelectedRecipe, setActiveTab } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFavorites = favorites.filter(r => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="rounded-3xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#1c1c1c] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-500 flex items-center justify-center shrink-0">
            <Bookmark className="w-6 h-6 fill-current" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
              {t.saved.favoritesTitle}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
              {t.saved.favoritesSubtitle} ({favorites.length})
            </p>
          </div>
        </div>

        {favorites.length > 0 && (
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.saved.searchSaved}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-[#202020] text-xs sm:text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-[#FF7A45]"
            />
          </div>
        )}
      </div>

      {/* Grid or Empty state */}
      {filteredFavorites.length === 0 ? (
        <div className="p-12 rounded-3xl border border-dashed border-neutral-300 dark:border-neutral-800 text-center space-y-4 max-w-lg mx-auto bg-white/50 dark:bg-[#1a1a1a]/50">
          <div className="w-16 h-16 rounded-3xl bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center mx-auto text-2xl">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200">
            {t.saved.noFavorites}
          </h3>
          <div>
            <button
              type="button"
              onClick={() => setActiveTab('generator')}
              className="py-3 px-6 rounded-2xl bg-[#FF7A45] text-white font-bold text-xs hover:bg-[#e86835] transition-colors inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.nav.recipes}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFavorites.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} onOpen={(r) => setSelectedRecipe(r)} />
          ))}
        </div>
      )}
    </div>
  );
};
