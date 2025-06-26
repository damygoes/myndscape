import OpenAI from "openai";
// @ts-ignore
import { serve } from "std/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

serve(async (req: { json: () => PromiseLike<{ content: any; }> | { content: any; }; }) => {
  const { content } = await req.json();

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: "You are an empathetic mood analyzer. For each journal entry, classify the mood (e.g., Happy, Sad, Anxious, Reflective) and summarize the tone and key themes in 1-2 sentences." },
      { role: "user", content: content },
    ],
  });

  return new Response(
    JSON.stringify({ result: completion.choices[0].message.content }),
    { headers: { "Content-Type": "application/json" } }
  );
});
