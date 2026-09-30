import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

// Initialize Gemini client if API key is present
const geminiApiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (geminiApiKey) {
  try {
    ai = new GoogleGenAI();
  } catch (e) {
    console.warn('Failed initializing GoogleGenAI client', e);
  }
}

// 1. API: Generate Recipe
app.post('/api/generate-recipe', async (req: Request, res: Response): Promise<void> => {
  const { language = 'uz', ingredients = [], prompt = '', filters = {} } = req.body;

  if (!ai || !geminiApiKey) {
    // Return 200 with fallback signal so client renders authentic pre-curated gourmet recipe
    res.status(200).json({ status: 'fallback', message: 'No API key, fallback to local recipe generator' });
    return;
  }

  try {
    const langInstructions = 
      language === 'uz' ? 'Return the recipe entirely in the Uzbek language (O‘zbek tili, Lotin alifbosi).' :
      language === 'ru' ? 'Return the recipe entirely in the Russian language (Русский язык).' :
      'Return the recipe entirely in the English language.';

    const systemPrompt = `You are AI Chef, an elite culinary master.
Generate a creative, delicious, authentic gourmet recipe matching the user's request.
${langInstructions}

Return strictly a valid JSON object matching this exact schema:
{
  "id": "gen-${Date.now()}",
  "title": "Recipe Title",
  "description": "2-3 enticing sentences describing the flavors and textures.",
  "cuisine": "Cuisine type (e.g. O‘zbek, Mediterranean, Italian, etc.)",
  "mealType": "breakfast" | "lunch" | "dinner" | "snack" | "dessert",
  "difficulty": "easy" | "medium" | "hard",
  "prepTimeMinutes": number,
  "cookTimeMinutes": number,
  "servings": number,
  "ingredients": [
    { "name": "ingredient name", "amount": "e.g. 200g, 1 tbsp" }
  ],
  "steps": [
    {
      "stepNumber": 1,
      "instruction": "Detailed clear instruction",
      "timerMinutes": optional number of minutes for cooking timer,
      "chefTip": "Optional pro cooking tip"
    }
  ],
  "nutrition": {
    "calories": number,
    "protein": number,
    "carbs": number,
    "fat": number
  },
  "allergens": ["list of allergens or empty array"],
  "dietaryTags": ["e.g. Halol, High-Protein, Vegetarian"],
  "chefTips": ["2-3 practical tips for best results"],
  "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
}`;

    const userPrompt = `Available ingredients: ${ingredients.join(', ') || 'Any staple items'}.
User craving / instructions: ${prompt || 'A delicious, wholesome meal'}.
Dietary requirements: ${(filters.dietary || []).join(', ') || 'None'}.
Meal type: ${filters.mealType || 'Any'}.
Max cooking time: ${filters.maxTime || 60} minutes.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `${systemPrompt}\n\nUser Request: ${userPrompt}`,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '';
    const recipe = JSON.parse(text);
    recipe.createdAt = Date.now();
    res.status(200).json({ status: 'ok', recipe });
  } catch (error) {
    console.error('Error generating recipe with Gemini:', error);
    res.status(200).json({ status: 'fallback', error: String(error) });
  }
});

// 2. API: Chef Leo Chat
app.post('/api/chat', async (req: Request, res: Response): Promise<void> => {
  const { language = 'uz', message = '', history = [] } = req.body;

  if (!ai || !geminiApiKey) {
    res.status(200).json({ status: 'fallback' });
    return;
  }

  try {
    const langNote =
      language === 'uz' ? 'Answer warmly and concisely in Uzbek (O‘zbek tili, Lotin).' :
      language === 'ru' ? 'Answer warmly and concisely in Russian.' :
      'Answer warmly and concisely in English.';

    const systemPrompt = `You are Chef Leo, an encouraging, Michelin-trained culinary expert and advisor.
${langNote}
Keep answers engaging, practical, under 3-4 paragraphs. Provide exact culinary measurements and pro techniques when asked.`;

    const chatContext = history
      .map((h: { role: string; content: string }) => `${h.role}: ${h.content}`)
      .join('\n');

    const prompt = `${systemPrompt}\n\nConversation History:\n${chatContext}\n\nUser: ${message}\nChef Leo:`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    res.status(200).json({ status: 'ok', reply: response.text });
  } catch (error) {
    console.error('Error in Chef Leo chat:', error);
    res.status(200).json({ status: 'fallback', error: String(error) });
  }
});

// Serve frontend with Vite middlewares in dev, or static files in production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve('dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`🍳 AI Chef Server running on http://0.0.0.0:${port}`);
  });
}

startServer();
