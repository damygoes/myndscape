import OpenAI from 'openai';
// @ts-ignore
import { serve } from 'std/server';

const openai = new OpenAI({
  // @ts-expect-error
  apiKey: Deno.env.get('EXPO_OPEN_AI_KEY'),
});

serve(async (req: Request) => {
  try {
    const { content, language = 'en' } = await req.json(); // ISO code

    const systemPrompt = `
      You are a compassionate, friendly mental wellness assistant. Always write as if you are talking directly to the user about their feelings. Avoid referring to "the user" or "der Benutzer". Make it personal, supportive, and human-like.

      Respond in ${language} for the user, but always keep mood, mood_score, and themes in English for storage.

      For every journal entry:

      1. Classify the mood as a single word in English for storage (Happy, Sad, Anxious, etc.).
      2. Write a short friendly summary **directly addressing the user**. For example, "It seems you are feeling excited about your trip!" instead of "The user is excited."
      3. List key emotional themes in English.
      4. Give one short practical self-care tip in English.
      5. Provide a numeric wellness score between 0–100 (0 = extremely negative, 50 = neutral, 100 = extremely positive).
      6. If the language is not "en", also provide localized translations for mood, themes, summary, and tip.

      Respond ONLY as valid JSON, no markdown, no code blocks.

      Format:
      {
        "mood": "",
        "mood_score": 0,
        "themes": [],
        "summary": "",
        "tip": "",
        "localized": {
          "${language}": {
            "mood": "",
            "themes": [],
            "summary": "",
            "tip": ""
          }
        }
      }
    `;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content },
      ],
    });

    let aiResponse = completion.choices[0].message.content?.trim() || '';

    // Remove code block formatting
    if (aiResponse.startsWith('```')) {
      aiResponse = aiResponse
        .replace(/```(json)?/i, '')
        .replace(/```$/, '')
        .trim();
    }

    try {
      const parsed = JSON.parse(aiResponse);

      return new Response(JSON.stringify({ result: parsed }), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (parseError) {
      console.error('AI response not valid JSON:', aiResponse);
      return new Response(
        JSON.stringify({
          error: 'AI response could not be parsed.',
          raw: aiResponse,
        }),
        { status: 500 }
      );
    }
  } catch (err) {
    console.error('AI Function Error:', err);
    return new Response(
      JSON.stringify({ error: 'Server error during AI analysis.' }),
      { status: 500 }
    );
  }
});
