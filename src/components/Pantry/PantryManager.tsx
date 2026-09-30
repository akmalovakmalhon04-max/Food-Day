import React, { useState } from 'react';
import { Refrigerator, Plus, X, Trash2, ArrowRight, Sparkles, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { POPULAR_INGREDIENTS } from '../../data/ingredients';

export const PantryManager: React.FC = () => {
  const { language, t, pantryItems, togglePantryItem, clearPantry, setActiveTab } = useApp();
  const [customItem, setCustomItem] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (customItem.trim() && !pantryItems.includes(customItem.trim())) {
      togglePantryItem(customItem.trim());
      setCustomItem('');
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="rounded-3xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#1c1c1c] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950/70 text-[#FF7A45] flex items-center justify-center text-2xl shrink-0">
            <Refrigerator className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
              {t.pantry.title}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1 max-w-lg">
              {t.pantry.subtitle}
            </p>
          </div>
        </div>

        {pantryItems.length > 0 && (
          <button
            type="button"
            onClick={clearPantry}
            className="self-start sm:self-auto px-4 py-2 rounded-xl text-xs font-bold border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{t.pantry.clearAll}</span>
          </button>
        )}
      </div>

      {/* Main Pantry Box */}
      <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#1a1a1a] p-6 sm:p-8 space-y-6">
        
        {/* Add input form */}
        <form onSubmit={handleAdd} className="flex gap-2">
          <input
            type="text"
            value={customItem}
            onChange={(e) => setCustomItem(e.target.value)}
            placeholder={t.generator.addCustomIngredient}
            className="flex-1 px-4 py-3 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-[#202020] text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-[#FF7A45]"
          />
          <button
            type="submit"
            disabled={!customItem.trim()}
            className="px-6 py-3 rounded-2xl bg-[#FF7A45] text-white font-bold text-sm disabled:opacity-40 hover:bg-[#e86835] transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>{language === 'uz' ? 'Qo‘shish' : language === 'ru' ? 'Добавить' : 'Add'}</span>
          </button>
        </form>

        {/* Current Items Pills */}
        <div>
          <div className="flex items-center justify-between text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-3">
            <span>{t.generator.selectedIngredients}</span>
            <span>{pantryItems.length} {t.pantry.itemCount}</span>
          </div>

          {pantryItems.length === 0 ? (
            <div className="p-8 rounded-2xl border-2 border-dashed border-neutral-200 dark:border-neutral-800 text-center space-y-2">
              <span className="text-3xl">🥦</span>
              <p className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                {t.generator.noIngredientsSelected}
              </p>
              <p className="text-xs text-neutral-400">
                Pick items below to stock your digital kitchen.
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2.5">
              {pantryItems.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-orange-50 dark:bg-[#26201b] border border-orange-200 dark:border-orange-800/40 text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 shadow-2xs"
                >
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => togglePantryItem(item)}
                    className="p-1 rounded-full text-neutral-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Button: Cook with these items */}
        {pantryItems.length > 0 && (
          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
            <button
              type="button"
              onClick={() => setActiveTab('generator')}
              className="w-full py-4 px-6 rounded-2xl font-bold text-sm sm:text-base text-white shadow-lg transition-all flex items-center justify-center gap-2 hover:opacity-95"
              style={{
                backgroundColor: '#FF7A45',
                boxShadow: '0 8px 24px -4px rgba(255, 122, 69, 0.4)',
              }}
            >
              <span>{t.pantry.cookWithPantry}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Quick Add Essentials Catalog */}
      <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#1a1a1a] p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-black text-neutral-900 dark:text-white tracking-tight flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#FF7A45]" />
          <span>{t.pantry.popularIngredients}</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
          {POPULAR_INGREDIENTS.map((item) => {
            const locName = item.name[language] || item.name.en;
            const isStocked = pantryItems.includes(locName);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => togglePantryItem(locName)}
                className={`p-3 rounded-2xl border text-left flex items-center justify-between text-xs font-bold transition-all ${
                  isStocked
                    ? 'border-[#FF7A45] bg-orange-50 dark:bg-[#28211c] text-[#FF7A45]'
                    : 'border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#202020] text-neutral-700 dark:text-neutral-300 hover:border-orange-300'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="text-base">{item.emoji}</span>
                  <span className="truncate">{locName}</span>
                </div>
                {isStocked ? (
                  <Check className="w-4 h-4 text-[#FF7A45] shrink-0" />
                ) : (
                  <Plus className="w-4 h-4 text-neutral-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
