import React from 'react';
import { History as HistoryIcon, Trash2, Sparkles, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RecipeCard } from '../Recipe/RecipeCard';

export const HistoryView: React.FC = () => {
  const { t, history, clearHistory, setSelectedRecipe, setActiveTab } = useApp();

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="rounded-3xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#1c1c1c] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950/70 text-[#FF7A45] flex items-center justify-center shrink-0">
            <HistoryIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
              {t.saved.historyTitle}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
              {t.saved.historySubtitle} ({history.length})
            </p>
          </div>
        </div>

        {history.length > 0 && (
          <button
            type="button"
            onClick={clearHistory}
            className="self-start sm:self-auto px-4 py-2 rounded-xl text-xs font-bold border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:text-rose-500 hover:border-rose-300 transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{t.saved.clearHistory}</span>
          </button>
        )}
      </div>

      {/* Grid or Empty state */}
      {history.length === 0 ? (
        <div className="p-12 rounded-3xl border border-dashed border-neutral-300 dark:border-neutral-800 text-center space-y-4 max-w-lg mx-auto bg-white/50 dark:bg-[#1a1a1a]/50">
          <div className="w-16 h-16 rounded-3xl bg-orange-50 dark:bg-orange-950/40 text-[#FF7A45] flex items-center justify-center mx-auto text-2xl">
            <HistoryIcon className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200">
            {t.saved.noHistory}
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
          {history.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} onOpen={(r) => setSelectedRecipe(r)} />
          ))}
        </div>
      )}
    </div>
  );
};
