import React, { useState } from 'react';
import { Check, Sun, Moon, ArrowRight, ChefHat, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Language, Theme } from '../../types';
import { getTranslation } from '../../locales';

export const OnboardingModal: React.FC = () => {
  const { language, setLanguage, theme, setTheme, completeOnboarding } = useApp();
  
  // Step 1: Language selection, Step 2: Appearance selection
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedLang, setSelectedLang] = useState<Language>(language || 'uz');
  const [selectedTheme, setSelectedTheme] = useState<Theme>(theme || 'light');

  // Translations corresponding to the currently selected language
  const stepT = getTranslation(selectedLang);

  // Exact 3 language options in strict order
  const languageOptions: { id: Language; flag: string; title: string; subtitle: string }[] = [
    {
      id: 'uz',
      flag: '🇺🇿',
      title: 'O‘zbekcha',
      subtitle: 'O‘zbek tilida davom etish',
    },
    {
      id: 'ru',
      flag: '🇷🇺',
      title: 'Русский',
      subtitle: 'Продолжить на русском',
    },
    {
      id: 'en',
      flag: '🇬🇧',
      title: 'English',
      subtitle: 'Continue in English',
    },
  ];

  const handleLanguageSelect = (lang: Language) => {
    setSelectedLang(lang);
    setLanguage(lang);
  };

  const handleThemeSelect = (t: Theme) => {
    setSelectedTheme(t);
    setTheme(t);
  };

  const handleStep1Continue = () => {
    setLanguage(selectedLang);
    setStep(2);
  };

  const handleStep2Finish = () => {
    completeOnboarding(selectedLang, selectedTheme);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      style={{
        backgroundColor: selectedTheme === 'dark' ? '#111111' : '#FFF9F4',
        color: selectedTheme === 'dark' ? '#FFFFFF' : '#171717',
      }}
    >
      {/* Decorative Food & Culinary Background Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(#FF7A45 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Ambient warm glow behind card */}
      <div
        className="absolute w-96 h-96 rounded-full blur-3xl pointer-events-none transition-all duration-700 opacity-20 dark:opacity-10"
        style={{
          backgroundColor: '#FF7A45',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />

      {/* Main Container Card */}
      <div
        className="relative w-full max-w-xl rounded-3xl shadow-2xl p-6 sm:p-10 border transition-all duration-300"
        style={{
          backgroundColor: selectedTheme === 'dark' ? '#202020' : '#FFFFFF',
          borderColor: selectedTheme === 'dark' ? '#333333' : '#EADFD5',
        }}
      >
        {/* Top Header & Brand */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-50 dark:bg-neutral-800 border border-orange-200 dark:border-neutral-700 shadow-sm mb-3">
            <span className="text-3xl" role="img" aria-label="Chef pan">🍳</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-orange-100/70 dark:bg-orange-950/50 text-[#FF7A45] mb-2">
            <ChefHat className="w-3.5 h-3.5" />
            AI Chef
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center gap-2 mb-4" aria-label="Setup progress">
            <span
              className={`h-2 rounded-full transition-all duration-300 ${
                step === 1 ? 'w-8 bg-[#FF7A45]' : 'w-2 bg-neutral-300 dark:bg-neutral-600'
              }`}
            />
            <span
              className={`h-2 rounded-full transition-all duration-300 ${
                step === 2 ? 'w-8 bg-[#FF7A45]' : 'w-2 bg-neutral-300 dark:bg-neutral-600'
              }`}
            />
          </div>

          {/* STEP 1: LANGUAGE SELECTION */}
          {step === 1 && (
            <>
              <h1
                id="onboarding-title"
                className="text-2xl sm:text-3xl font-extrabold tracking-tight"
                style={{ color: selectedTheme === 'dark' ? '#FFFFFF' : '#171717' }}
              >
                Welcome to AI Chef 👨🍳
              </h1>
              <p
                className="text-sm sm:text-base mt-2 max-w-md font-medium"
                style={{ color: selectedTheme === 'dark' ? '#B8B8B8' : '#6B6B6B' }}
              >
                Choose your language to get started.
              </p>
            </>
          )}

          {/* STEP 2: APPEARANCE SELECTION */}
          {step === 2 && (
            <>
              <h1
                id="onboarding-title"
                className="text-2xl sm:text-3xl font-extrabold tracking-tight"
                style={{ color: selectedTheme === 'dark' ? '#FFFFFF' : '#171717' }}
              >
                {stepT.onboarding.chooseStyleHeadline}
              </h1>
              <p
                className="text-sm sm:text-base mt-2 max-w-md font-medium"
                style={{ color: selectedTheme === 'dark' ? '#B8B8B8' : '#6B6B6B' }}
              >
                {stepT.onboarding.chooseStyleSubtitle}
              </p>
            </>
          )}
        </div>

        {/* STEP 1 CONTENT: 3 LANGUAGES IN STRICT ORDER */}
        {step === 1 && (
          <div className="space-y-3.5" role="radiogroup" aria-label="Language selection">
            {languageOptions.map((opt) => {
              const isSelected = selectedLang === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => handleLanguageSelect(opt.id)}
                  className={`w-full group text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A45] focus-visible:ring-offset-2 ${
                    isSelected
                      ? 'border-[#FF7A45] shadow-lg shadow-orange-500/15'
                      : selectedTheme === 'dark'
                      ? 'border-neutral-800 bg-[#181818] hover:border-neutral-700 hover:bg-[#1f1f1f]'
                      : 'border-orange-100 bg-[#FFFDFB] hover:border-orange-200 hover:bg-orange-50/50'
                  }`}
                  style={{
                    backgroundColor: isSelected
                      ? selectedTheme === 'dark'
                        ? '#26201B'
                        : '#FFF6F0'
                      : undefined,
                  }}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl sm:text-4xl filter drop-shadow-sm transition-transform duration-200 group-hover:scale-110">
                      {opt.flag}
                    </span>
                    <div>
                      <div
                        className="text-lg font-bold tracking-tight transition-colors"
                        style={{
                          color: isSelected
                            ? '#FF7A45'
                            : selectedTheme === 'dark'
                            ? '#FFFFFF'
                            : '#171717',
                        }}
                      >
                        {opt.title}
                      </div>
                      <div
                        className="text-sm font-medium transition-colors"
                        style={{
                          color: selectedTheme === 'dark' ? '#B8B8B8' : '#6B6B6B',
                        }}
                      >
                        {opt.subtitle}
                      </div>
                    </div>
                  </div>

                  {/* Checkmark Badge */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                      isSelected
                        ? 'bg-[#FF7A45] text-white scale-100 shadow-md shadow-orange-500/30'
                        : selectedTheme === 'dark'
                        ? 'border border-neutral-700 bg-neutral-800/80 text-transparent scale-90'
                        : 'border border-neutral-200 bg-neutral-100 text-transparent scale-90'
                    }`}
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                </button>
              );
            })}

            {/* Continue Button */}
            <div className="pt-6">
              <button
                type="button"
                onClick={handleStep1Continue}
                className="w-full py-4 px-6 rounded-2xl font-bold text-base text-white shadow-lg transition-all duration-200 flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A45] focus-visible:ring-offset-2"
                style={{
                  backgroundColor: '#FF7A45',
                  boxShadow: '0 8px 20px -4px rgba(255, 122, 69, 0.45)',
                }}
              >
                <span>{stepT.onboarding.continue}</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 CONTENT: APPEARANCE (LIGHT MODE & DARK MODE) */}
        {step === 2 && (
          <div className="space-y-4" role="radiogroup" aria-label="Theme selection">
            {/* 1. LIGHT MODE */}
            <button
              type="button"
              role="radio"
              aria-checked={selectedTheme === 'light'}
              onClick={() => handleThemeSelect('light')}
              className={`w-full group text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A45] focus-visible:ring-offset-2 ${
                selectedTheme === 'light'
                  ? 'border-[#FF7A45] bg-[#FFF6F0] shadow-lg shadow-orange-500/15'
                  : selectedTheme === 'dark'
                  ? 'border-neutral-800 bg-[#181818] hover:border-neutral-700'
                  : 'border-neutral-200 bg-white hover:border-neutral-300'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                    selectedTheme === 'light'
                      ? 'bg-amber-100 text-amber-600'
                      : 'bg-neutral-800 text-neutral-400'
                  }`}
                >
                  <Sun className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-lg font-bold tracking-tight"
                      style={{
                        color: selectedTheme === 'light' ? '#FF7A45' : selectedTheme === 'dark' ? '#FFFFFF' : '#171717',
                      }}
                    >
                      ☀️ Light Mode
                    </span>
                  </div>
                  <div
                    className="text-sm font-medium mt-0.5"
                    style={{
                      color: selectedTheme === 'dark' ? '#B8B8B8' : '#6B6B6B',
                    }}
                  >
                    {stepT.onboarding.lightModeDesc}
                  </div>
                  {/* Visual Preview Swatch */}
                  <div className="mt-3 flex items-center gap-1.5 py-1 px-2.5 rounded-lg border border-orange-200/60 bg-[#FFF9F4] text-xs font-semibold text-neutral-800 max-w-fit shadow-xs">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#FF7A45]" />
                    <span className="font-mono text-[11px] text-[#FF7A45]">#FFF9F4</span>
                    <span className="text-neutral-400">·</span>
                    <span className="text-[11px]">Warm & Fresh</span>
                  </div>
                </div>
              </div>

              {/* Checkmark */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                  selectedTheme === 'light'
                    ? 'bg-[#FF7A45] text-white scale-100 shadow-md shadow-orange-500/30'
                    : selectedTheme === 'dark'
                    ? 'border border-neutral-700 bg-neutral-800 text-transparent scale-90'
                    : 'border border-neutral-200 bg-neutral-100 text-transparent scale-90'
                }`}
              >
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
            </button>

            {/* 2. DARK MODE */}
            <button
              type="button"
              role="radio"
              aria-checked={selectedTheme === 'dark'}
              onClick={() => handleThemeSelect('dark')}
              className={`w-full group text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A45] focus-visible:ring-offset-2 ${
                selectedTheme === 'dark'
                  ? 'border-[#FF7A45] bg-[#26201B] shadow-lg shadow-orange-500/15'
                  : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#181818] hover:border-neutral-300 dark:hover:border-neutral-700'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                    selectedTheme === 'dark'
                      ? 'bg-orange-950/70 text-[#FF7A45]'
                      : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  <Moon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-lg font-bold tracking-tight"
                      style={{
                        color: selectedTheme === 'dark' ? '#FF7A45' : '#171717',
                      }}
                    >
                      🌙 Dark Mode
                    </span>
                  </div>
                  <div
                    className="text-sm font-medium mt-0.5"
                    style={{
                      color: selectedTheme === 'dark' ? '#B8B8B8' : '#6B6B6B',
                    }}
                  >
                    {stepT.onboarding.darkModeDesc}
                  </div>
                  {/* Visual Preview Swatch */}
                  <div className="mt-3 flex items-center gap-1.5 py-1 px-2.5 rounded-lg border border-neutral-700 bg-[#111111] text-xs font-semibold text-white max-w-fit shadow-xs">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#FF7A45]" />
                    <span className="font-mono text-[11px] text-[#FF7A45]">#111111</span>
                    <span className="text-neutral-500">·</span>
                    <span className="text-[11px]">Night Comfort</span>
                  </div>
                </div>
              </div>

              {/* Checkmark */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                  selectedTheme === 'dark'
                    ? 'bg-[#FF7A45] text-white scale-100 shadow-md shadow-orange-500/30'
                    : 'border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-transparent scale-90'
                }`}
              >
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
            </button>

            {/* Action buttons */}
            <div className="pt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="py-4 px-5 rounded-2xl font-bold text-sm border transition-all duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                style={{
                  borderColor: selectedTheme === 'dark' ? '#333333' : '#EADFD5',
                  color: selectedTheme === 'dark' ? '#B8B8B8' : '#6B6B6B',
                }}
              >
                ← {selectedLang === 'uz' ? 'Orqaga' : selectedLang === 'ru' ? 'Назад' : 'Back'}
              </button>

              <button
                type="button"
                onClick={handleStep2Finish}
                className="flex-1 py-4 px-6 rounded-2xl font-bold text-base text-white shadow-lg transition-all duration-200 flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A45] focus-visible:ring-offset-2"
                style={{
                  backgroundColor: '#FF7A45',
                  boxShadow: '0 8px 20px -4px rgba(255, 122, 69, 0.45)',
                }}
              >
                <span>{stepT.onboarding.continue}</span>
              </button>
            </div>
          </div>
        )}

        {/* Accessibility & note */}
        <div className="mt-8 text-center text-xs text-neutral-400 dark:text-neutral-500 font-medium">
          {step === 1 ? (
            <span>
              {selectedLang === 'uz'
                ? 'Til va mavzuni keyinroq istalgan vaqt Sozlamalardan o‘zgartirishingiz mumkin.'
                : selectedLang === 'ru'
                ? 'Вы всегда сможете изменить язык и тему позже в Настройках.'
                : 'You can change your language and theme anytime later in Settings.'}
            </span>
          ) : (
            <span>
              {selectedLang === 'uz'
                ? 'Tanlovingiz saqlanadi va qayta so‘ralmaydi.'
                : selectedLang === 'ru'
                ? 'Ваш выбор сохранится и не будет запрашиваться снова.'
                : 'Your selection will be saved and not asked again.'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
