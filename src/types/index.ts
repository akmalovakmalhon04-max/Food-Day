export type Language = 'uz' | 'ru' | 'en';
export type Theme = 'light' | 'dark';

export interface Ingredient {
  id: string;
  name: {
    uz: string;
    ru: string;
    en: string;
  };
  category: 'vegetables' | 'meats' | 'dairy' | 'grains' | 'spices' | 'pantry' | 'fruits';
  emoji: string;
}

export interface RecipeStep {
  stepNumber: number;
  instruction: string;
  timerMinutes?: number;
  chefTip?: string;
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  cuisine: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'dessert';
  difficulty: 'easy' | 'medium' | 'hard';
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  ingredients: {
    name: string;
    amount: string;
  }[];
  steps: RecipeStep[];
  nutrition: NutritionInfo;
  allergens: string[];
  dietaryTags: string[];
  chefTips: string[];
  imageUrl?: string;
  createdAt: number;
  isFavorite?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  suggestedAction?: string;
}

export interface FilterOptions {
  mealType: string;
  cuisine: string;
  maxTime: number;
  difficulty: string;
  dietary: string[];
}
