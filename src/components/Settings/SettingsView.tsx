import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Globe, 
  Sun, 
  Moon, 
  RotateCcw, 
  Trash2, 
  Check, 
  Info,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Language, Theme } from '../../types';

export const SettingsView: React.FC = () => {
  const { 
    language, 
    setLanguage, 
    theme, 
    setTheme, 
    resetOnboarding, 
    clearAllData, 
    t 
  } = useApp();

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const languageOptions: { id: Language; flag: string; title: string; subtitle: string }[] = [
    { id: 'uz', flag: '🇺🇿', title: 'O‘zbekcha', subtitle: 'O‘zbek tilida davom etish' },
    { id: 'ru', flag: '🇷🇺', title: 'Русский', subtitle: 'Продолжить на русском' },
    { id: 'en', flag: '🇬🇧', title: 'English', subtitle: 'Continue in English' },
  ];

  const currentLangObj = languageOptions.find(l => l.id === language) || languageOptions[0];

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      
      {/* Toast feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <span className="text-xs sm:text-sm font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="rounded-3xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#1c1c1c] shadow-xs flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950/70 text-[#FF7A45] flex items-center justify-center shrink-0">
          <SettingsIcon className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
            {t.settings.title}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
            {t.settings.subtitle}
          </p>
        </div>
      </div>

      {/* 1. Language Section */}
      <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#1a1a1a] p-6 sm:p-8 space-y-5">
        <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-4">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-[#FF7A45]" />
            <div>
              <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
                {t.settings.languageSectionTitle}
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {t.settings.languageCurrent} <strong className="text-[#FF7A45]">{currentLangObj.flag} {currentLangObj.title}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* 3 Language options in strict order */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {languageOptions.map((opt) => {
            const isSelected = language === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setLanguage(opt.id);
                  showToast(opt.id === 'uz' ? 'Til muvaffaqiyatli o‘zgartirildi' : opt.id === 'ru' ? 'Язык успешно изменен' : 'Language updated successfully');
                }}
                className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'border-[#FF7A45] bg-orange-50/70 dark:bg-[#28211c] shadow-sm'
                    : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 dark:bg-[#202020] hover:border-orange-300'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-2xl">{opt.flag}</span>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#FF7A45] text-white flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>

                <div>
                  <div className={`text-sm font-bold ${isSelected ? 'text-[#FF7A45]' : 'text-neutral-800 dark:text-neutral-200'}`}>
                    {opt.title}
                  </div>
                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-0.5">
                    {opt.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Appearance Section */}
      <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#1a1a1a] p-6 sm:p-8 space-y-5">
        <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-4">
          <div className="flex items-center gap-3">
            <Sun className="w-5 h-5 text-[#FF7A45]" />
            <div>
              <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
                {t.settings.appearanceSectionTitle}
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {t.settings.appearanceCurrent} <strong className="text-[#FF7A45]">{theme === 'light' ? '☀️ Light Mode' : '🌙 Dark Mode'}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* 2 Theme options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Light Mode */}
          <button
            type="button"
            onClick={() => {
              setTheme('light');
              showToast(language === 'uz' ? 'Yorug‘ rejim yoqildi' : language === 'ru' ? 'Включен светлый режим' : 'Light mode enabled');
            }}
            className={`p-5 rounded-2xl border-2 text-left transition-all duration-200 flex items-start justify-between ${
              theme === 'light'
                ? 'border-[#FF7A45] bg-orange-50/70 dark:bg-[#28211c] shadow-sm'
                : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 dark:bg-[#202020] hover:border-orange-300'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-neutral-900 dark:text-white">
                  ☀️ {t.settings.lightModeName}
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  {t.settings.lightModeSubtitle}
                </div>
              </div>
            </div>

            {theme === 'light' && (
              <div className="w-5 h-5 rounded-full bg-[#FF7A45] text-white flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
            )}
          </button>

          {/* Dark Mode */}
          <button
            type="button"
            onClick={() => {
              setTheme('dark');
              showToast(language === 'uz' ? 'Qorong‘i rejim yoqildi' : language === 'ru' ? 'Включен темный режим' : 'Dark mode enabled');
            }}
            className={`p-5 rounded-2xl border-2 text-left transition-all duration-200 flex items-start justify-between ${
              theme === 'dark'
                ? 'border-[#FF7A45] bg-[#28211c] shadow-sm'
                : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 dark:bg-[#202020] hover:border-orange-300'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-orange-950/80 text-[#FF7A45] flex items-center justify-center shrink-0">
                <Moon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-neutral-900 dark:text-white">
                  🌙 {t.settings.darkModeName}
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  {t.settings.darkModeSubtitle}
                </div>
              </div>
            </div>

            {theme === 'dark' && (
              <div className="w-5 h-5 rounded-full bg-[#FF7A45] text-white flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
            )}
          </button>
        </div>
      </div>

      {/* 3. Restart Onboarding Experience */}
      <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#1a1a1a] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-[#FF7A45]" />
            <span>{t.settings.resetOnboardingTitle}</span>
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            {t.settings.resetOnboardingDesc}
          </p>
        </div>

        <button
          type="button"
          onClick={resetOnboarding}
          className="self-start sm:self-auto px-5 py-2.5 rounded-xl text-xs font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-orange-50 hover:text-[#FF7A45] transition-colors"
        >
          {t.settings.resetOnboardingButton}
        </button>
      </div>

      {/* 4. Data Management & About */}
      <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#1a1a1a] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 dark:border-neutral-800 pb-5">
          <div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-rose-500" />
              <span>{t.settings.dataManagementTitle}</span>
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              {t.settings.dataManagementDesc}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              clearAllData();
              showToast(t.settings.dataClearedMsg);
            }}
            className="self-start sm:self-auto px-4 py-2.5 rounded-xl text-xs font-bold border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
          >
            {t.settings.clearDataButton}
          </button>
        </div>

        {/* About Card */}
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-neutral-50 dark:bg-[#202020] text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
          <Info className="w-5 h-5 text-[#FF7A45] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-neutral-800 dark:text-neutral-200 block mb-0.5">{t.settings.aboutTitle}</span>
            {t.settings.aboutDesc}
          </div>
        </div>
      </div>

    </div>
  );
};
