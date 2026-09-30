import { Ingredient } from '../types';

export const POPULAR_INGREDIENTS: Ingredient[] = [
  // Meats
  { id: 'chicken', name: { uz: 'Tovuq go‘shti', ru: 'Куриное филе', en: 'Chicken Breast' }, category: 'meats', emoji: '🍗' },
  { id: 'beef', name: { uz: 'Mol go‘shti', ru: 'Говядина', en: 'Beef' }, category: 'meats', emoji: '🥩' },
  { id: 'lamb', name: { uz: 'Qo‘y go‘shti', ru: 'Баранина', en: 'Lamb' }, category: 'meats', emoji: '🍖' },
  { id: 'fish', name: { uz: 'Baliq', ru: 'Рыба', en: 'Fish / Salmon' }, category: 'meats', emoji: '🐟' },
  { id: 'minced_meat', name: { uz: 'Qiyma', ru: 'Фарш', en: 'Minced Meat' }, category: 'meats', emoji: '🍳' },

  // Vegetables
  { id: 'onion', name: { uz: 'Piyoz', ru: 'Лук', en: 'Onion' }, category: 'vegetables', emoji: '🧅' },
  { id: 'carrot', name: { uz: 'Sabzi', ru: 'Морковь', en: 'Carrot' }, category: 'vegetables', emoji: '🥕' },
  { id: 'garlic', name: { uz: 'Sarimsoq', ru: 'Чеснок', en: 'Garlic' }, category: 'vegetables', emoji: '🧄' },
  { id: 'potato', name: { uz: 'Kartoshka', ru: 'Картофель', en: 'Potato' }, category: 'vegetables', emoji: '🥔' },
  { id: 'tomato', name: { uz: 'Pomidor', ru: 'Помидоры', en: 'Tomato' }, category: 'vegetables', emoji: '🍅' },
  { id: 'cucumber', name: { uz: 'Bodring', ru: 'Огурец', en: 'Cucumber' }, category: 'vegetables', emoji: '🥒' },
  { id: 'bell_pepper', name: { uz: 'Bulg‘or qalampiri', ru: 'Болгарский перец', en: 'Bell Pepper' }, category: 'vegetables', emoji: '🫑' },
  { id: 'mushrooms', name: { uz: 'Qo‘ziqorin', ru: 'Грибы', en: 'Mushrooms' }, category: 'vegetables', emoji: '🍄' },
  { id: 'spinach', name: { uz: 'Ismaloq', ru: 'Шпинат', en: 'Spinach' }, category: 'vegetables', emoji: '🥬' },
  { id: 'broccoli', name: { uz: 'Brokkoli', ru: 'Брокколи', en: 'Broccoli' }, category: 'vegetables', emoji: '🥦' },

  // Grains & Pasta
  { id: 'rice', name: { uz: 'Guruch', ru: 'Рис', en: 'Rice' }, category: 'grains', emoji: '🍚' },
  { id: 'pasta', name: { uz: 'Makaron', ru: 'Макароны / Паста', en: 'Pasta' }, category: 'grains', emoji: '🍝' },
  { id: 'flour', name: { uz: 'Un', ru: 'Мука', en: 'Flour' }, category: 'grains', emoji: '🌾' },
  { id: 'oats', name: { uz: 'Suli yormasi', ru: 'Овсянка', en: 'Oats' }, category: 'grains', emoji: '🥣' },

  // Dairy & Eggs
  { id: 'eggs', name: { uz: 'Tuxum', ru: 'Яйца', en: 'Eggs' }, category: 'dairy', emoji: '🥚' },
  { id: 'milk', name: { uz: 'Sut', ru: 'Молоко', en: 'Milk' }, category: 'dairy', emoji: '🥛' },
  { id: 'butter', name: { uz: 'Sariyog‘', ru: 'Сливочное масло', en: 'Butter' }, category: 'dairy', emoji: '🧈' },
  { id: 'cheese', name: { uz: 'Pishloq', ru: 'Сыр', en: 'Cheese' }, category: 'dairy', emoji: '🧀' },
  { id: 'sour_cream', name: { uz: 'Smetana / Qaymoq', ru: 'Сметана / Сливки', en: 'Cream / Sour Cream' }, category: 'dairy', emoji: '🍶' },

  // Spices & Herbs
  { id: 'cumin', name: { uz: 'Zira', ru: 'Зира (Кумин)', en: 'Cumin (Zira)' }, category: 'spices', emoji: '🌿' },
  { id: 'black_pepper', name: { uz: 'Murch (Qora murch)', ru: 'Черный перец', en: 'Black Pepper' }, category: 'spices', emoji: '🧂' },
  { id: 'coriander', name: { uz: 'Kashnich urug‘i', ru: 'Кориандр', en: 'Coriander' }, category: 'spices', emoji: '🌱' },
  { id: 'paprika', name: { uz: 'Qizil qalampir / Paprika', ru: 'Паприка', en: 'Paprika' }, category: 'spices', emoji: '🌶️' },
  { id: 'basil', name: { uz: 'Rayhon / Bazilik', ru: 'Базилик', en: 'Basil' }, category: 'spices', emoji: '🍃' },

  // Pantry Staples
  { id: 'oil', name: { uz: 'O‘simlik yog‘i', ru: 'Растительное масло', en: 'Vegetable / Olive Oil' }, category: 'pantry', emoji: '🫒' },
  { id: 'salt', name: { uz: 'Tuz', ru: 'Соль', en: 'Salt' }, category: 'pantry', emoji: '🧂' },
  { id: 'sugar', name: { uz: 'Shakar', ru: 'Сахар', en: 'Sugar' }, category: 'pantry', emoji: '🍬' },
  { id: 'soy_sauce', name: { uz: 'Soya sousi', ru: 'Соевый соус', en: 'Soy Sauce' }, category: 'pantry', emoji: '🥢' },
  { id: 'tomato_paste', name: { uz: 'Tomat pastasi', ru: 'Томатная паста', en: 'Tomato Paste' }, category: 'pantry', emoji: '🥫' },

  // Fruits
  { id: 'lemon', name: { uz: 'Limon', ru: 'Лимон', en: 'Lemon' }, category: 'fruits', emoji: '🍋' },
  { id: 'apple', name: { uz: 'Olma', ru: 'Яблоки', en: 'Apples' }, category: 'fruits', emoji: '🍎' },
];
