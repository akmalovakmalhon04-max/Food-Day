import React from 'react';
import { Clock, Users, Flame, Heart, ChefHat, ArrowRight } from 'lucide-react';
import { Recipe } from '../../types';
import { useApp } from '../../context/AppContext';

interface RecipeCardProps {
  recipe: Recipe;
  onOpen: (recipe: Recipe) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onOpen }) => {
  const { t, toggleFavorite, isFavorite } = useApp();
  const favorited = isFavorite(recipe.id);

  const getDifficultyBadge = (diff: Recipe['difficulty']) => {
    switch (diff) {
      case 'easy':
        return { text: t.generator.difficulties.easy.split(' ')[0], color: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800' };
      case 'hard':
        return { text: t.generator.difficulties.hard.split(' ')[0], color: 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800' };
      default:
        return { text: t.generator.difficulties.medium.split(' ')[0], color: 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800' };
    }
  };

  const diffBadge = getDifficultyBadge(recipe.difficulty);

  return (
    <div className="group relative flex flex-col rounded-3xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-[#202020] overflow-hidden shadow-sm hover:shadow-xl hover:border-orange-300 dark:hover:border-neutral-700 transition-all duration-300">
      
      {/* Recipe Image / Banner */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        <img
          src={recipe.imageUrl || 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80'}
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Favorite Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(recipe);
          }}
          className={`absolute top-3.5 right-3.5 p-2.5 rounded-full backdrop-blur-md transition-all duration-200 shadow-md ${
            favorited
              ? 'bg-rose-500 text-white hover:bg-rose-600 scale-105'
              : 'bg-white/80 dark:bg-neutral-900/80 text-neutral-700 dark:text-neutral-200 hover:text-rose-500 hover:scale-105'
          }`}
          aria-label={favorited ? t.recipe.removedFromFavorites : t.recipe.savedToFavorites}
        >
          <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
        </button>

        {/* Cuisine Tag */}
        <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-xs font-bold text-white bg-black/50 backdrop-blur-md border border-white/20">
          {recipe.cuisine}
        </div>

        {/* Total Time & Calories Badges */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-xs font-bold text-white">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md">
            <Clock className="w-3.5 h-3.5 text-[#FF7A45]" />
            <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} {t.common.mins}</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>{recipe.nutrition.calories} {t.recipe.calories}</span>
          </div>
        </div>
      </div>

      {/* Recipe Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Difficulty & Dietary Tags */}
          <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
            <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${diffBadge.color}`}>
              {diffBadge.text}
            </span>
            {recipe.dietaryTags.slice(0, 2).map((tag, i) => (
              <span 
                key={i} 
                className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="text-lg font-black tracking-tight text-neutral-900 dark:text-white line-clamp-1 group-hover:text-[#FF7A45] transition-colors">
            {recipe.title}
          </h3>

          {/* Description */}
          <p className="mt-1.5 text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
            {recipe.description}
          </p>
        </div>

        {/* Bottom stats and action */}
        <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
            <Users className="w-3.5 h-3.5" />
            <span>{recipe.servings} {t.recipe.servings}</span>
          </div>

          <button
            type="button"
            onClick={() => onOpen(recipe)}
            className="flex items-center gap-1 text-xs font-bold text-[#FF7A45] hover:text-[#e86835] group/btn transition-colors"
          >
            <span>{t.recipe.startCookingMode.split(' ')[0]}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};
