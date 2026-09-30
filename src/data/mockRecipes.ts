import { Recipe, Language } from '../types';

export function getSampleRecipes(lang: Language): Recipe[] {
  if (lang === 'uz') {
    return [
      {
        id: 'uz-plov-1',
        title: 'Toshkentcha To‘y Oshi (Palov)',
        description: 'Mayin go‘sht, sariq sabzi, sarimsoq va no‘xat bilan qozonda pishirilgan haqiqiy shohona o‘zbek palovi.',
        cuisine: 'O‘zbek milliy oshxonasi',
        mealType: 'lunch',
        difficulty: 'medium',
        prepTimeMinutes: 25,
        cookTimeMinutes: 50,
        servings: 4,
        ingredients: [
          { name: 'Mol yoki qo‘y go‘shti', amount: '500 g' },
          { name: 'Lazer yoki Alanga guruchi', amount: '500 g' },
          { name: 'Sariq va qizil sabzi', amount: '500 g' },
          { name: 'Piyoz', amount: '2 dona' },
          { name: 'O‘simlik yog‘i / dumba', amount: '150 ml' },
          { name: 'Zira (butun)', amount: '1 osh qoshiq' },
          { name: 'Sarimsoq boshi', amount: '2 dona' },
          { name: 'Ivitilgan no‘xat va mayiz', amount: '50 g' },
          { name: 'Tuz va murch', amount: 'ta‘bga ko‘ra' }
        ],
        steps: [
          {
            stepNumber: 1,
            instruction: 'Qozonni qizdirib, yog‘ni dog‘lang. Bo‘laklangan go‘shtni solib, qarsildoq qizil tusga kirguncha baland olovda qovuring.',
            timerMinutes: 10,
            chefTip: 'Go‘sht seli chiqib ketmasligi uchun qozon juda qizigan bo‘lishi lozim.'
          },
          {
            stepNumber: 2,
            instruction: 'Yarim halqa to‘g‘ralgan piyozni qo‘shib, tillarang bo‘lguncha qovuring. So‘ng somoncha to‘g‘ralgan sabzini soling.',
            timerMinutes: 8
          },
          {
            stepNumber: 3,
            instruction: 'Zirvak uchun qaynagan suv soling, sarimsoq, zira va ivitilgan no‘xatni solib, past olovda qaynating.',
            timerMinutes: 25,
            chefTip: 'Sabzi ezilib ketmasligi uchun olovni o‘rtacha tuting.'
          },
          {
            stepNumber: 4,
            instruction: 'Guruchni yaxshilab iliq suvda yuvib, zirvak ustiga tekis yoying. Suv guruch yuzasidan 1 sm baland turishi kerak.',
            timerMinutes: 12
          },
          {
            stepNumber: 5,
            instruction: 'Suv tortilgach, guruchni o‘rtaga gumbaz qilib to‘plang, ustini teshikchalar ochib zira seping va qopqog‘ini yopib 20 daqiqa damlang.',
            timerMinutes: 20
          }
        ],
        nutrition: { calories: 680, protein: 32, carbs: 74, fat: 28 },
        allergens: [],
        dietaryTags: ['Halol', 'Yuqori oqsilli'],
        chefTips: [
          'Zirani kaft orasida ishqalab solsangiz, xushbo‘y hidi ikki baravar kuchayadi.',
          'Dam yedirishdan oldin guruch sathi quruq bo‘lishiga ishonch hosil qiling.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=800&q=80',
        createdAt: Date.now() - 1000 * 60 * 60 * 2,
        isFavorite: true
      },
      {
        id: 'uz-lemon-chicken-2',
        title: 'Limon va Zaytunli Qovurilgan Tovuq',
        description: 'Tilla rang qarsildoq teri, xushbo‘y rayhon va limon sharbati bilan tayyorlangan tezkor va sog‘lom kechki ovqat.',
        cuisine: 'O‘rtayer dengizi',
        mealType: 'dinner',
        difficulty: 'easy',
        prepTimeMinutes: 10,
        cookTimeMinutes: 20,
        servings: 2,
        ingredients: [
          { name: 'Tovuq ko‘krak qismi', amount: '400 g' },
          { name: 'Yangi siqilgan limon sharbati', amount: '2 osh qoshiq' },
          { name: 'Sarimsoqpiyoz', amount: '3 bo‘lak' },
          { name: 'Zaytun moyi', amount: '2 osh qoshiq' },
          { name: 'Quritilgan oregano va rayhon', amount: '1 choy qoshiq' },
          { name: 'Cherry pomidorlari', amount: '150 g' }
        ],
        steps: [
          { stepNumber: 1, instruction: 'Tovuq filesini yupqaroq bo‘laklarga bo‘lib, tuz, murch va zaytun moyi bilan marinadlang.', timerMinutes: 5 },
          { stepNumber: 2, instruction: 'Tovada har bir tarafini 4-5 daqiqadan oltin tusga kirguncha qovuring.', timerMinutes: 10 },
          { stepNumber: 3, instruction: 'Oxirida ezilgan sarimsoq, cherry pomidor va limon sharbatini qo‘shib, 3 daqiqa dimlang.', timerMinutes: 3 }
        ],
        nutrition: { calories: 340, protein: 42, carbs: 8, fat: 14 },
        allergens: [],
        dietaryTags: ['Halol', 'Kam uglevodli (Keto)', 'Glyutensiz'],
        chefTips: ['Tovuq go‘shtini qovurishdan oldin oshxona qog‘ozi bilan quritsangiz, tilla rang qobiq hosil bo‘ladi.'],
        imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80',
        createdAt: Date.now() - 1000 * 60 * 60 * 24
      }
    ];
  }

  if (lang === 'ru') {
    return [
      {
        id: 'ru-plov-1',
        title: 'Праздничный Узбекский Плов',
        description: 'Нежное мясо, сладкая морковь, чеснок, зира и нут, томленые в казане до идеального рассыпчатого состояния.',
        cuisine: 'Узбекская кухня',
        mealType: 'lunch',
        difficulty: 'medium',
        prepTimeMinutes: 25,
        cookTimeMinutes: 50,
        servings: 4,
        ingredients: [
          { name: 'Мясо (говядина или баранина)', amount: '500 г' },
          { name: 'Рис для плова (Лазер/Аланга)', amount: '500 г' },
          { name: 'Желтая и красная морковь', amount: '500 г' },
          { name: 'Репчатый лук', amount: '2 шт' },
          { name: 'Растительное масло', amount: '150 мл' },
          { name: 'Зира цельная', amount: '1 ст. ложка' },
          { name: 'Головка чеснока', amount: '2 шт' },
          { name: 'Замоченный нут и изюм', amount: '50 г' },
          { name: 'Соль и черный перец', amount: 'по вкусу' }
        ],
        steps: [
          {
            stepNumber: 1,
            instruction: 'Раскалите казан с маслом. Обжарьте мясо крупными кусочками на сильном огне до румяной аппетитной корочки.',
            timerMinutes: 10,
            chefTip: 'Сильный огонь запечатает все соки внутри мяса.'
          },
          {
            stepNumber: 2,
            instruction: 'Добавьте полукольца лука, обжарьте до золотистости. Затем добавьте соломку моркови и тушите до мягкости.',
            timerMinutes: 8
          },
          {
            stepNumber: 3,
            instruction: 'Влейте кипяток для зирвака, опустите головки чеснока, зиру и нут. Томите на медленном огне.',
            timerMinutes: 25
          },
          {
            stepNumber: 4,
            instruction: 'Промойте рис в теплой воде до прозрачности, ровным слоем выложите поверх зирвака. Жидкость должна быть на 1 см выше риса.',
            timerMinutes: 12
          },
          {
            stepNumber: 5,
            instruction: 'Когда вода впитается, соберите рис горкой, сделайте проколы до дна, накройте крышкой и томите 20 минут.',
            timerMinutes: 20
          }
        ],
        nutrition: { calories: 680, protein: 32, carbs: 74, fat: 28 },
        allergens: [],
        dietaryTags: ['Халяль', 'Высокобелковое'],
        chefTips: [
          'Разотрите зиру между ладонями прямо перед добавлением — эфирные масла раскроются сильнее.',
          'Не перемешивайте слои до полной готовности плова.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=800&q=80',
        createdAt: Date.now() - 1000 * 60 * 60 * 2,
        isFavorite: true
      },
      {
        id: 'ru-lemon-chicken-2',
        title: 'Куриная Грудка с Лимоном и Травами',
        description: 'Сочное филе с золотистой корочкой, свежим розмарином, соком лимона и сочными томатами черри.',
        cuisine: 'Средиземноморская',
        mealType: 'dinner',
        difficulty: 'easy',
        prepTimeMinutes: 10,
        cookTimeMinutes: 20,
        servings: 2,
        ingredients: [
          { name: 'Куриное филе', amount: '400 г' },
          { name: 'Свежевыжатый сок лимона', amount: '2 ст. л.' },
          { name: 'Чеснок', amount: '3 зубчика' },
          { name: 'Оливковое масло', amount: '2 ст. л.' },
          { name: 'Итальянские травы', amount: '1 ч. л.' },
          { name: 'Томаты черри', amount: '150 г' }
        ],
        steps: [
          { stepNumber: 1, instruction: 'Нарежьте филе на медальоны, приправьте солью, перцем, оливковым маслом и травами.', timerMinutes: 5 },
          { stepNumber: 2, instruction: 'Обжарьте на сковороде по 4-5 минут с каждой стороны до золотистого цвета.', timerMinutes: 10 },
          { stepNumber: 3, instruction: 'Добавьте измельченный чеснок, томаты черри и сок лимона, потомите 3 минуты.', timerMinutes: 3 }
        ],
        nutrition: { calories: 340, protein: 42, carbs: 8, fat: 14 },
        allergens: [],
        dietaryTags: ['Халяль', 'Низкоуглеводное (Кето)', 'Без глютена'],
        chefTips: ['Просушите мясо бумажным полотенцем перед жаркой для идеальной корочки.'],
        imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80',
        createdAt: Date.now() - 1000 * 60 * 60 * 24
      }
    ];
  }

  // English fallback
  return [
    {
      id: 'en-plov-1',
      title: 'Traditional Festive Uzbek Plov',
      description: 'Tender meat, sweet yellow carrots, whole garlic heads, cumin and chickpeas slowly simmered in a cast-iron kazan.',
      cuisine: 'Uzbek National Cuisine',
      mealType: 'lunch',
      difficulty: 'medium',
      prepTimeMinutes: 25,
      cookTimeMinutes: 50,
      servings: 4,
      ingredients: [
        { name: 'Beef or Lamb cuts', amount: '500 g' },
        { name: 'Plov Rice (Lazer or Basmati)', amount: '500 g' },
        { name: 'Yellow and Orange Carrots (julienned)', amount: '500 g' },
        { name: 'Yellow Onions', amount: '2 medium' },
        { name: 'Vegetable / Olive oil', amount: '150 ml' },
        { name: 'Whole Cumin (Zira)', amount: '1 tbsp' },
        { name: 'Whole Garlic Heads', amount: '2 heads' },
        { name: 'Soaked Chickpeas & Golden Raisins', amount: '50 g' },
        { name: 'Sea salt and cracked pepper', amount: 'to taste' }
      ],
      steps: [
        {
          stepNumber: 1,
          instruction: 'Heat oil in a heavy pot or kazan until hot. Sear meat chunks over high heat until rich caramelized crust forms.',
          timerMinutes: 10,
          chefTip: 'Do not crowd the pan so the meat sears rather than steams.'
        },
        {
          stepNumber: 2,
          instruction: 'Add sliced onions and brown to golden bronze. Add carrots and gently toss until soft and aromatic.',
          timerMinutes: 8
        },
        {
          stepNumber: 3,
          instruction: 'Pour in hot water to create the zirvak broth. Add garlic heads, crushed cumin, and chickpeas. Simmer on low heat.',
          timerMinutes: 25
        },
        {
          stepNumber: 4,
          instruction: 'Gently rinse rice until water runs crystal clear. Spread in an even layer over the broth. Liquid should sit 1cm above rice.',
          timerMinutes: 12
        },
        {
          stepNumber: 5,
          instruction: 'Once liquid absorbs, mound the rice into a dome, poke steam vents, cover tight, and let steam rest on minimal heat.',
          timerMinutes: 20
        }
      ],
      nutrition: { calories: 680, protein: 32, carbs: 74, fat: 28 },
      allergens: [],
      dietaryTags: ['Halal', 'High-Protein'],
      chefTips: [
        'Rub the cumin seeds firmly between your palms before dropping them into the broth to release aromatic oils.',
        'Never stir the layers until the rice is fully steamed and rested.'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=800&q=80',
      createdAt: Date.now() - 1000 * 60 * 60 * 2,
      isFavorite: true
    },
    {
      id: 'en-lemon-chicken-2',
      title: 'Pan-Seared Lemon Herb Chicken',
      description: 'Crisp golden exterior, tender juicy chicken breast infused with fresh rosemary, garlic, and citrus pan reduction.',
      cuisine: 'Mediterranean',
      mealType: 'dinner',
      difficulty: 'easy',
      prepTimeMinutes: 10,
      cookTimeMinutes: 20,
      servings: 2,
      ingredients: [
        { name: 'Chicken breast cutlets', amount: '400 g' },
        { name: 'Fresh lemon juice & zest', amount: '2 tbsp' },
        { name: 'Garlic cloves (crushed)', amount: '3 cloves' },
        { name: 'Extra virgin olive oil', amount: '2 tbsp' },
        { name: 'Italian herbs & oregano', amount: '1 tsp' },
        { name: 'Cherry tomatoes', amount: '150 g' }
      ],
      steps: [
        { stepNumber: 1, instruction: 'Slice breasts into cutlets, pat dry with towels, and season with sea salt, pepper, and herbs.', timerMinutes: 5 },
        { stepNumber: 2, instruction: 'Sear in hot skillet with olive oil for 4-5 minutes per side until deep golden.', timerMinutes: 10 },
        { stepNumber: 3, instruction: 'Toss in cherry tomatoes, crushed garlic, and fresh lemon juice. Simmer 3 minutes until sauce glosses.', timerMinutes: 3 }
      ],
      nutrition: { calories: 340, protein: 42, carbs: 8, fat: 14 },
      allergens: [],
      dietaryTags: ['Halal', 'Low-Carb / Keto', 'Gluten-Free'],
      chefTips: ['Drying the meat surface before hitting the hot pan ensures a golden restaurant-grade crust.'],
      imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80',
      createdAt: Date.now() - 1000 * 60 * 60 * 24
    }
  ];
}
