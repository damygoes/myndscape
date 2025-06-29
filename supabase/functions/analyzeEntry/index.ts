import OpenAI from "openai";
// @ts-ignore
import { serve } from "std/server";

const openai = new OpenAI({
  // @ts-expect-error
  apiKey: Deno.env.get("EXPO_OPEN_AI_KEY"),
});

serve(async (req: Request) => {
  try {
    const { content } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `
          You are a compassionate mental wellness assistant.

          For every user journal entry:

          1. Classify the mood as a single word (e.g., Happy, Sad, Anxious, Tired, Reflective, Angry, etc.)
          2. Write a short friendly summary (1-2 sentences) of their mood/tone.
          3. List key emotional themes (like stress, joy, frustration, etc.)
          4. Give one short practical self-care tip relevant to the mood.

          Respond ONLY as valid JSON. No markdown. No code blocks. No extra text.

          Format:
          {
            "mood": "",
            "summary": "",
            "themes": "",
            "tip": ""
          }
          `
        },
        { role: "user", content },
      ],
    });

    const aiResponse = completion.choices[0].message.content;
    let cleanedResponse = aiResponse?.trim() || '';

    // ✅ Clean out markdown code blocks if OpenAI still adds them
    if (cleanedResponse.startsWith('```')) {
      cleanedResponse = cleanedResponse
        .replace(/```(json)?/i, '')
        .replace(/```$/, '')
        .trim();
    }

    try {
      const parsed = JSON.parse(cleanedResponse);

      return new Response(
        JSON.stringify({ result: parsed }),
        { headers: { "Content-Type": "application/json" } }
      );
    } catch (parseError) {
      console.error('AI response not valid JSON:', aiResponse);
      return new Response(
        JSON.stringify({ error: 'AI response could not be parsed.', raw: aiResponse }),
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
