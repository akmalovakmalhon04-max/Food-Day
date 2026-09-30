import React, { useState, useEffect } from 'react';
import { 
  X, 
  Clock, 
  Users, 
  Flame, 
  Heart, 
  Share2, 
  Check, 
  Play, 
  Pause, 
  RotateCcw, 
  AlertTriangle, 
  Lightbulb, 
  ChevronLeft, 
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { Recipe } from '../../types';
import { useApp } from '../../context/AppContext';

interface RecipeDetailModalProps {
  recipe: Recipe;
  onClose: () => void;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({ recipe, onClose }) => {
  const { t, toggleFavorite, isFavorite } = useApp();
  const favorited = isFavorite(recipe.id);

  // Servings scaling
  const [servingsMultiplier, setServingsMultiplier] = useState(1);
  const baseServings = recipe.servings || 4;
  const currentServings = Math.max(1, Math.round(baseServings * servingsMultiplier));

  // Step-by-step cooking mode
  const [cookingMode, setCookingMode] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Kitchen Timer state
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerAlert, setTimerAlert] = useState(false);

  // Copied link toast state
  const [copied, setCopied] = useState(false);

  // Ingredients checklist
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);

  const activeStep = recipe.steps[activeStepIndex] || recipe.steps[0];

  // Sync step timer if present
  useEffect(() => {
    if (activeStep?.timerMinutes) {
      setTimerSeconds(activeStep.timerMinutes * 60);
      setIsTimerRunning(false);
      setTimerAlert(false);
    }
  }, [activeStepIndex]);

  // Timer countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            setTimerAlert(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  const toggleCheckIngredient = (name: string) => {
    setCheckedIngredients(prev =>
      prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
    );
  };

  const toggleStepCompleted = (stepNum: number) => {
    setCompletedSteps(prev =>
      prev.includes(stepNum) ? prev.filter(s => s !== stepNum) : [...prev, stepNum]
    );
  };

  const handleShare = () => {
    const textToShare = `${recipe.title}\n${recipe.description}\n\nAI Chef App`;
    navigator.clipboard?.writeText(textToShare);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#181818] text-neutral-900 dark:text-neutral-100 shadow-2xl flex flex-col"
      >
        {/* Top Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-4 sm:p-5 border-b border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-[#181818]/95 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-100 dark:bg-orange-950/70 text-[#FF7A45]">
              {recipe.cuisine}
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
              {recipe.prepTimeMinutes + recipe.cookTimeMinutes} {t.common.mins} {t.recipe.totalTime}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 hover:text-[#FF7A45] transition-colors"
              title={t.recipe.shareRecipe}
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={() => toggleFavorite(recipe)}
              className={`p-2 rounded-xl border border-neutral-200 dark:border-neutral-700 transition-colors ${
                favorited
                  ? 'bg-rose-500 border-rose-500 text-white'
                  : 'bg-neutral-50 dark:bg-neutral-800 hover:text-rose-500'
              }`}
              title="Favorite"
            >
              <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              aria-label={t.common.close}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hero Visual Banner */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-neutral-900 shrink-0">
          <img
            src={recipe.imageUrl || 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=1200&q=80'}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
              {recipe.title}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-200 max-w-2xl line-clamp-2">
              {recipe.description}
            </p>
          </div>
        </div>

        {/* Quick Nutritional & Timing Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 p-4 sm:p-5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/50">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-[#202020] border border-neutral-200/80 dark:border-neutral-800">
            <Clock className="w-5 h-5 text-[#FF7A45]" />
            <div>
              <div className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">{t.recipe.cookTime}</div>
              <div className="text-sm font-bold">{recipe.cookTimeMinutes} {t.common.mins}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-[#202020] border border-neutral-200/80 dark:border-neutral-800">
            <Flame className="w-5 h-5 text-amber-500" />
            <div>
              <div className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">{t.recipe.calories}</div>
              <div className="text-sm font-bold">{recipe.nutrition.calories} kcal</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-[#202020] border border-neutral-200/80 dark:border-neutral-800">
            <Users className="w-5 h-5 text-blue-500" />
            <div>
              <div className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">{t.recipe.servings}</div>
              <div className="text-sm font-bold">{currentServings}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-[#202020] border border-neutral-200/80 dark:border-neutral-800">
            <span className="text-xl">🥩</span>
            <div>
              <div className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">{t.recipe.protein}</div>
              <div className="text-sm font-bold">{recipe.nutrition.protein}g / P: {recipe.nutrition.carbs}g</div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-7 space-y-8">

          {/* Interactive Cooking Mode Switch */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200/70 dark:border-orange-800/40">
            <div className="flex items-center gap-3">
              <span className="text-2xl">👨‍🍳</span>
              <div>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                  {cookingMode ? t.recipe.exitCookingMode : t.recipe.startCookingMode}
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Step-by-step guidance with live timer for hassle-free cooking.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setCookingMode(!cookingMode)}
              className="py-2.5 px-4 rounded-xl text-xs font-bold bg-[#FF7A45] text-white hover:bg-[#e86835] transition-all shadow-sm flex items-center gap-2"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>{cookingMode ? t.recipe.exitCookingMode : t.recipe.startCookingMode}</span>
            </button>
          </div>

          {/* COOKING MODE: STEP BY STEP ACTIVE CAROUSEL */}
          {cookingMode ? (
            <div className="p-6 rounded-3xl border-2 border-orange-300 dark:border-orange-700/60 bg-orange-50/30 dark:bg-[#201c19] space-y-6">
              
              {/* Progress and step number */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#FF7A45] tracking-wider uppercase">
                  {t.recipe.step} {activeStepIndex + 1} / {recipe.steps.length}
                </span>

                <div className="flex items-center gap-1.5">
                  {recipe.steps.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveStepIndex(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === activeStepIndex
                          ? 'w-6 bg-[#FF7A45]'
                          : completedSteps.includes(recipe.steps[idx].stepNumber)
                          ? 'w-2 bg-emerald-500'
                          : 'w-2 bg-neutral-300 dark:bg-neutral-700'
                      }`}
                      aria-label={`Go to step ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Step Instruction Card */}
              <div className="space-y-4">
                <p className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white leading-relaxed">
                  {activeStep.instruction}
                </p>

                {activeStep.chefTip && (
                  <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs">
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span><strong>Tip:</strong> {activeStep.chefTip}</span>
                  </div>
                )}
              </div>

              {/* Step Timer if available */}
              {activeStep.timerMinutes && (
                <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-[#181818] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-[#FF7A45]" />
                    <div>
                      <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{t.recipe.kitchenTimer}</div>
                      <div className={`text-2xl font-black font-mono ${timerAlert ? 'text-rose-500 animate-bounce' : 'text-neutral-900 dark:text-white'}`}>
                        {formatTimer(timerSeconds)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsTimerRunning(!isTimerRunning)}
                      className="p-2.5 rounded-xl font-bold text-xs bg-[#FF7A45] text-white flex items-center gap-1.5"
                    >
                      {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      <span>{isTimerRunning ? t.recipe.pauseTimer : t.recipe.startTimer}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsTimerRunning(false);
                        setTimerSeconds((activeStep.timerMinutes || 1) * 60);
                        setTimerAlert(false);
                      }}
                      className="p-2.5 rounded-xl text-neutral-600 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      title={t.recipe.resetTimer}
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step Navigation Controls */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex(prev => Math.max(0, prev - 1))}
                  className="py-3 px-4 rounded-xl font-bold text-xs border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{t.recipe.prevStep}</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleStepCompleted(activeStep.stepNumber)}
                  className={`py-3 px-4 rounded-xl font-bold text-xs flex items-center gap-2 ${
                    completedSteps.includes(activeStep.stepNumber)
                      ? 'bg-emerald-600 text-white'
                      : 'border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>{completedSteps.includes(activeStep.stepNumber) ? 'Completed' : t.recipe.stepComplete}</span>
                </button>

                {activeStepIndex < recipe.steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setActiveStepIndex(prev => prev + 1)}
                    className="py-3 px-5 rounded-xl font-bold text-xs bg-[#FF7A45] text-white hover:bg-[#e86835] flex items-center gap-1.5"
                  >
                    <span>{t.recipe.nextStep}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setCookingMode(false)}
                    className="py-3 px-5 rounded-xl font-bold text-xs bg-emerald-600 text-white hover:bg-emerald-700"
                  >
                    {t.recipe.finishCooking}
                  </button>
                )}
              </div>
            </div>
          ) : null}

          {/* Servings Scaler and Ingredients List */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-xl font-extrabold text-neutral-900 dark:text-white">
                  {t.recipe.ingredientsTitle} ({recipe.ingredients.length})
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Tap to check off ingredients as you prepare them.
                </p>
              </div>

              {/* Servings multiplier buttons */}
              <div className="flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-2xl border border-neutral-200 dark:border-neutral-700 self-start sm:self-auto">
                <span className="text-xs font-bold px-2 text-neutral-500 dark:text-neutral-400">{t.recipe.scaleServings}</span>
                {[0.5, 1, 1.5, 2].map((mult) => (
                  <button
                    key={mult}
                    type="button"
                    onClick={() => setServingsMultiplier(mult)}
                    className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                      servingsMultiplier === mult
                        ? 'bg-[#FF7A45] text-white shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                  >
                    {mult === 0.5 ? '½x' : `${mult}x`}
                  </button>
                ))}
              </div>
            </div>

            {/* Ingredients Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {recipe.ingredients.map((item, idx) => {
                const isChecked = checkedIngredients.includes(item.name);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleCheckIngredient(item.name)}
                    className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-colors ${
                      isChecked
                        ? 'bg-neutral-100 dark:bg-neutral-900/60 border-neutral-200 dark:border-neutral-800 opacity-60 line-through'
                        : 'bg-white dark:bg-[#202020] border-neutral-200/90 dark:border-neutral-800 hover:border-orange-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-colors ${
                        isChecked ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-neutral-300 dark:border-neutral-600'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                        {item.name}
                      </span>
                    </div>

                    <span className="text-xs font-bold text-[#FF7A45] pl-2 whitespace-nowrap">
                      {item.amount}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Standard Steps Listing */}
          <div>
            <h3 className="text-xl font-extrabold text-neutral-900 dark:text-white mb-4">
              {t.recipe.stepsTitle}
            </h3>

            <div className="space-y-4">
              {recipe.steps.map((st) => (
                <div
                  key={st.stepNumber}
                  className="p-4 sm:p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#202020] flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-950 text-[#FF7A45] font-black text-sm flex items-center justify-center shrink-0">
                    {st.stepNumber}
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <p className="text-sm sm:text-base text-neutral-800 dark:text-neutral-200 leading-relaxed">
                      {st.instruction}
                    </p>
                    {st.chefTip && (
                      <p className="text-xs text-[#FF7A45] font-semibold flex items-center gap-1.5">
                        <Lightbulb className="w-3.5 h-3.5" />
                        <span>{st.chefTip}</span>
                      </p>
                    )}
                  </div>
                  {st.timerMinutes && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 shrink-0">
                      ⏱ {st.timerMinutes} {t.common.mins}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Chef's Secret Tips & Allergy Warnings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Chef tips */}
            {recipe.chefTips && recipe.chefTips.length > 0 && (
              <div className="p-5 rounded-3xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20">
                <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-400 text-sm mb-3">
                  <Lightbulb className="w-4 h-4" />
                  <span>{t.recipe.chefTipsTitle}</span>
                </div>
                <ul className="space-y-2 text-xs text-amber-900 dark:text-amber-200 leading-relaxed list-disc list-inside">
                  {recipe.chefTips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Allergens */}
            <div className="p-5 rounded-3xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/20">
              <div className="flex items-center gap-2 font-bold text-rose-800 dark:text-rose-400 text-sm mb-3">
                <AlertTriangle className="w-4 h-4" />
                <span>{t.recipe.allergensTitle}</span>
              </div>
              {recipe.allergens && recipe.allergens.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {recipe.allergens.map((alg, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-xl text-xs font-bold bg-rose-100 dark:bg-rose-900/50 text-rose-800 dark:text-rose-200">
                      ⚠️ {alg}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-rose-700 dark:text-rose-300">
                  {t.recipe.noAllergens}
                </p>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
