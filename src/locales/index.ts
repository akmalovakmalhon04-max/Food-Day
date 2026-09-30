import { en } from './en';
import { ru } from './ru';
import { uz } from './uz';
import { Language } from '../types';

export const translations = {
  uz,
  ru,
  en,
};

export type Translations = typeof en;

export function getTranslation(lang: Language): Translations {
  return translations[lang] || translations.uz;
}
